import React, { useState } from "react";
import VehicleDataService from "../services/VehicleService";

const AddVehicle = () => {
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

  const [vehicle, setVehicle] = useState(initialVehicleState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const saveVehicle = () => {
    var data = {
      name: vehicle.name,
      description: vehicle.description,
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      price: vehicle.price,
    };
    VehicleDataService.create(data)
      .then((response) => {
        setVehicle({
          id: response.data.id,
          name: response.data.title,
          description: response.data.description,
          plate: response.data.plate,
          isFavorite: response.data.isFavorite,
          year: response.data.year,
          color: response.data.color,
          price: response.data.price,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newVehicle = () => {
    setVehicle(initialVehicleState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Você enviou com sucesso!</h4>
          <button className="btn btn-success" onClick={newVehicle}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={vehicle.name}
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
              value={vehicle.description}
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
              value={vehicle.plate}
              onChange={handleInputChange}
              name="plate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Ano</label>
            <input
              type="text"
              className="form-control"
              id="year"
              required
              value={vehicle.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Cor</label>
            <input
              type="text"
              className="form-control"
              id="color"
              required
              value={vehicle.color}
              onChange={handleInputChange}
              name="color"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={vehicle.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          <button onClick={saveVehicle} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddVehicle;
