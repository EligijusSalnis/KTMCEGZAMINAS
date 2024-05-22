import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {
  getRenginiai,
  createIvertinimas,
  deleteRenginys,
  getIvertinimas,
} from "../services/api";
import Filtras from "./Filtras";
import RedagavimoForma from "./RedagavimoForma";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RenginiaiList() {
  const [renginiai, setRenginiai] = useState([]);
  const [filteredRenginiai, setFilteredRenginiai] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.isAdmin);
    }
    fetchRenginiai();
  }, []);

  const fetchRenginiai = async () => {
    try {
      const response = await getRenginiai();
      const renginiaiData = await Promise.all(
        response.data.map(async (renginys) => {
          const ivertinimaiResponse = await getIvertinimas(renginys.id);
          const averageRating = ivertinimaiResponse.data[0];
          let formattedAverageRating;
          formattedAverageRating = parseInt(averageRating);
          return {
            ...renginys,
            averageRating: formattedAverageRating,
          };
        })
      );
      setRenginiai(renginiaiData);
      setFilteredRenginiai(renginiaiData);
    } catch (error) {
      console.error("Klaida gaunant duomenis:", error);
    }
  };

  const handleFilter = (filter) => {
    const { kategorija, data } = filter;
    const filtered = renginiai.filter((renginys) => {
      const matchesCategory = kategorija
        ? renginys.kategorija === kategorija
        : true;
      const matchesDate = data
        ? new Date(renginys.laikas).toISOString().split("T")[0] === data
        : true;
      return matchesCategory && matchesDate;
    });
    setFilteredRenginiai(filtered);
  };

  const handleRate = async (renginysId, ivertinimas) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const VartotojaiId = decodedToken.id;

      await createIvertinimas({
        RenginiaiId: renginysId,
        ivertinimas,
        VartotojaiId,
      });
      fetchRenginiai();
    } catch (error) {
      console.error("Klaida pridedant įvertinimą:", error);
    }
  };

  const handleEdit = (renginysId) => {
    setEditingEventId(renginysId);
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
  };

  const handleUpdate = () => {
    fetchRenginiai();
    setEditingEventId(null);
  };

  const handleDelete = async (renginysId) => {
    try {
      await deleteRenginys(renginysId);
      fetchRenginiai();
    } catch (error) {
      console.error("Klaida trinant renginį:", error);
    }
  };

  const kategorijos = [
    ...new Set(renginiai.map((renginys) => renginys.kategorija)),
  ];

  return (
    <div>
      <Filtras kategorijos={kategorijos} onFilter={handleFilter} />
      {filteredRenginiai.map((renginys) => (
        <Card key={renginys.id} className="m-3">
          <Card.Body
            style={{ backgroundColor: "#f8f9fa" }}
            className="renginys-card"
          >
            {editingEventId === renginys.id ? (
              <RedagavimoForma
                event={renginys}
                onUpdate={handleUpdate}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <Card.Title>{renginys.pavadinimas}</Card.Title>
                <Card.Text>
                  Kategorija: {renginys.kategorija}
                  <br />
                  Data: {new Date(renginys.laikas).toLocaleString()}
                  <br />
                  Vieta: {renginys.vieta}
                  <br />
                  {renginys.nuotrauka && (
                    <img
                      src={renginys.nuotrauka}
                      alt="Renginio nuotrauka"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
                </Card.Text>
                <Card.Text>
                  Vidutinis įvertinimas:{" "}
                  {renginys.averageRating !== undefined
                    ? renginys.averageRating
                    : "Nėra įvertinimų"}
                </Card.Text>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      onClick={() => handleRate(renginys.id, star)}
                    >
                      &#9733;
                    </Button>
                  ))}
                </div>
                {isAdmin && (
                  <>
                    <Button
                      onClick={() => handleEdit(renginys.id)}
                      className="m-3"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(renginys.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default RenginiaiList;
