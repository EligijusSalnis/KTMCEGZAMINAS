const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
const secretKey = '12345Slaptas';

// Sukuriame ir sukonfigūruojame Sequelize
const sequelize = new Sequelize('egzaminas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Vartotojai
const Vartotojai = sequelize.define('Vartotojai', {
    vardas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    elPastas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slaptažodis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

// Renginiai
const Renginiai = sequelize.define('Renginiai', {
    pavadinimas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kategorija: {
        type: DataTypes.STRING,
        allowNull: false
    },
    laikas: {
        type: DataTypes.DATE,
        allowNull: false
    },
    vieta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nuotrauka: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Kategorijos
const Kategorijos = sequelize.define('Kategorijos', {
    pavadinimas: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Įvertinimai
const Ivertinimai = sequelize.define('Ivertinimai', {
    ivertinimas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Ryšiai tarp lentelių
Vartotojai.hasMany(Renginiai);
Renginiai.belongsTo(Vartotojai);

Vartotojai.hasMany(Ivertinimai);
Ivertinimai.belongsTo(Vartotojai);

Renginiai.hasMany(Ivertinimai);
Ivertinimai.belongsTo(Renginiai);

sequelize.sync();

app.use(bodyParser.json(), cors());

//Registracija
app.post('/api/register', async (req, res) => {
    const { vardas, elPastas, slaptažodis, isAdmin } = req.body;

    // Patikrinimas ar vartotojas jau egzistuoja
    const existingUser = await Vartotojai.findOne({ where: { elPastas } });
    if (existingUser) {
        return res.status(400).send({ message: 'Vartotojas su tokiu el. pašto adresu jau egzistuoja.' });
    }

    // Slaptažodžio užšifravimas
    const hashedPassword = bcrypt.hashSync(slaptažodis, 8);

    try {
        // Naujo vartotojo sukūrimas
        const user = await Vartotojai.create({ vardas, elPastas, slaptažodis: hashedPassword, isAdmin });

        // Sukuriamas JWT tokenas
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey', { expiresIn: '1h' });

        res.status(201).send({ message: 'Vartotojas sėkmingai sukurtas.', token });
    } catch (error) {
        res.status(400).send({ message: 'Klaida kuriant vartotoją.', error });
    }
});
//Prisijungimas
app.post('/api/login', async (req, res) => {
    const { elPastas, slaptažodis } = req.body;
    const vartotojas = await Vartotojai.findOne({ where: { elPastas } });
    if (!vartotojas) {
      return res.status(401).json({ message: 'Vartotojas nerastas' });
    }
  
    const validPassword = await bcrypt.compare(slaptažodis, vartotojas.slaptažodis);
    if (!validPassword) {
      return res.status(401).json({ message: 'Neteisingas slaptažodis' });
    }
  
    const token = jwt.sign({ id: vartotojas.id, isAdmin: vartotojas.isAdmin }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
});
  
//Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Autentifikacija nepavyko' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Autentifikacija nepavyko' });
    }
};
// Gauti visus renginius
app.get('/api/renginiai', authenticateJWT, async (req, res) => {
    try {
      const renginiai = await Renginiai.findAll();
      res.json(renginiai);
    } catch (error) {
      res.status(500).json({ message: 'Klaida gaunant renginius', error });
    }
});

app.put('/api/renginiai/:id', authenticateJWT, async (req, res) => {
    try {
      const renginys = await Renginiai.findByPk(req.params.id);
      if (!renginys) {
        return res.status(404).json({ message: 'Renginys nerastas' });
      }

      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Jūs neturite teisių redaguoti šio renginio' });
      }

      await renginys.update(req.body);
      res.json(renginys);
    } catch (error) {
      res.status(500).json({ message: 'Klaida atnaujinant renginį', error });
    }
});  

app.delete('/api/renginiai/:id', authenticateJWT, async (req, res) => {
    try {
      const renginys = await Renginiai.findByPk(req.params.id);
      if (!renginys) {
        return res.status(404).json({ message: 'Renginys nerastas' });
      }

      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Jūs neturite teisių ištrinti šio renginio' });
      }

      await renginys.destroy();
      res.json({ message: 'Renginys ištrintas' });
    } catch (error) {
      res.status(500).json({ message: 'Klaida trinant renginį', error });
    }
});


// Gauti visas kategorijas
app.get('/api/kategorijos', authenticateJWT, async (req, res) => {
    try {
      const kategorijos = await Kategorijos.findAll();
      res.json(kategorijos);
    } catch (error) {
      res.status(500).json({ message: 'Klaida gaunant kategorijas', error });
    }
 
});

// Pridėti naują kategoriją
app.post('/api/kategorijos', authenticateJWT, async (req, res) => {
    try {
      const kategorija = await Kategorijos.create(req.body);
      res.status(201).json(kategorija);
    } catch (error) {
      res.status(500).json({ message: 'Klaida pridedant kategoriją', error });
    }
});


// Atnaujinti kategoriją
app.put('/api/kategorijos/:id', authenticateJWT, async (req, res) => {
    try {
      const kategorija = await Kategorijos.findByPk(req.params.id);
      if (!kategorija) {
        return res.status(404).json({ message: 'Kategorija nerasta' });
      }
      await kategorija.update(req.body);
      res.json(kategorija);
    } catch (error) {
      res.status(500).json({ message: 'Klaida atnaujinant kategoriją', error });
    }
});

// Ištrinti kategoriją
app.delete('/api/kategorijos/:id', authenticateJWT, async (req, res) => {
    try {
      const kategorija = await Kategorijos.findByPk(req.params.id);
      if (!kategorija) {
        return res.status(404).json({ message: 'Kategorija nerasta' });
      }
      await kategorija.destroy();
      res.json({ message: 'Kategorija ištrinta' });
    } catch (error) {
      res.status(500).json({ message: 'Klaida trinant kategoriją', error });
    }
});

// Pridėti įvertinimą
app.post('/api/ivertinimai', authenticateJWT, async (req, res) => {
    try {
      const ivertinimas = await Įvertinimai.create({
        ivertinimas: req.body.ivertinimas,
        VartotojaiId: req.user.id,
        RenginiaiId: req.body.RenginiaiId
      });
      res.status(201).json(ivertinimas);
    } catch (error) {
      res.status(500).json({ message: 'Klaida pridedant įvertinimą', error });
    }
});

// Pridėti naują renginį
app.post('/api/renginiai', authenticateJWT, async (req, res, next) => {
    try {
        const { pavadinimas, kategorija, laikas, vieta, imageURL } = req.body;
        const event = await Renginiai.create({
            pavadinimas,
            kategorija,
            laikas,
            vieta,
            nuotrauka,
            VartotojaiId: req.user.id 
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Klaida pridedant renginį', error });
    }
});



  
app.get('/protected', authenticateJWT, (req, res) => {
    res.send({ message: 'Ši informacija prieinama tik prisijungusiems vartotojams.' });
});

app.listen(3000, () => {
    console.log('Serverio port: 3000');
});