import React, { useState, useEffect } from "react";
import VehicleDataService from "../services/VehicleService";

const Vehicle = (props) => {
  const initialVehicleState = {
    id: null,
    name: "",
    description: "",
    plate: "",
    isFavorite: false,
    year: null,
    color: "",
    price: null,
  };

  const [currentVehicle, setCurrentVehicle] = useState(initialVehicleState);

  const [message, setMessage] = useState("");

  const getVehicle = (id) => {
    VehicleDataService.get(id)
      .then((response) => {
        setCurrentVehicle(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getVehicle(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentVehicle({ ...currentVehicle, [name]: value });
  };

  const updateIsFavorite = (status) => {
    var data = {
      id: currentVehicle.id,
      name: currentVehicle.name,
      description: currentVehicle.description,
      plate: currentVehicle.plate,
      isFavorite: status,
      year: currentVehicle.year,
      color: currentVehicle.color,
      price: currentVehicle.price,
    };
    VehicleDataService.update(currentVehicle.id, data)
      .then((response) => {
        setCurrentVehicle({ ...currentVehicle, published: status });
        console.log(response.data);
        setMessage("O status de favorito foi atualizado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateVehicle = () => {
    VehicleDataService.update(currentVehicle.id, currentVehicle)
      .then((response) => {
        console.log(response.data);
        setMessage("O veículo foi atualizado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteVehicle = () => {
    VehicleDataService.remove(currentVehicle.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/vehicles");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentVehicle ? (
        <div className="edit-form">
          <h4>Veiculo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentVehicle.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={currentVehicle.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="plate">Placa</label>
              <input
                type="text"
                className="form-control"
                id="plate"
                required
                value={currentVehicle.plate}
                onChange={handleInputChange}
                name="plate"
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Favorito:</strong>
              </label>
              {currentVehicle.isFavorite ? "Sim" : "Não"}
            </div>
            {currentVehicle.isFavorite ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateIsFavorite(false)}
              >
                Não
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateIsFavorite(true)}
              >
                Sim
              </button>
            )}
            <button className="badge badge-danger mr-2" onClick={deleteVehicle}>
              Excluir
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateVehicle}
            >
              Atualizar
            </button>
            <p>{message}</p>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor, clique em um veículo...</p>
        </div>
      )}
    </div>
  );
};

export default Vehicle;
