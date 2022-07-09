import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import AddVehicle from "./components/AddVehicle";
import Vehicle from "./components/Vehicle";
import VehicleList from "./components/VehiclesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/vehicles" className="navbar-brand">
          Cadastro de Veiculos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/vehicles"} className="nav-link">
              Veiculos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Adicionar
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/vehicles"]} component={VehicleList} />
          <Route exact path="/add" component={AddVehicle} />
          <Route path="/vehicles/:id" component={Vehicle} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
