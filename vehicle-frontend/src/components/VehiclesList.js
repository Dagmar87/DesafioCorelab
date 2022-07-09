import React, { useState, useEffect, useMemo, useRef } from "react";
import VehicleDataService from "../services/VehicleService";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const VehiclesList = (props) => {
  const [vehicles, setVehicles] = useState([]);

  const [searchName, setSearchName] = useState("");

  const vehiclesRef = useRef();

  vehiclesRef.current = vehicles;

  useEffect(() => {
    retrieveVehicles();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveVehicles = () => {
    VehicleDataService.getAll()
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVehicles();
  };

  const removeAllVehicles = () => {
    VehicleDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    VehicleDataService.findByName(searchName)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openVehicle = (rowIndex) => {
    const id = vehiclesRef.current[rowIndex].id;
    props.history.push("/vehicles/" + id);
  };

  const deleteVehicle = (rowIndex) => {
    const id = vehiclesRef.current[rowIndex].id;
    VehicleDataService.remove(id)
      .then((response) => {
        props.history.push("/vehicles");
        let newVehicles = [...vehiclesRef.current];
        newVehicles.splice(rowIndex, 1);
        setVehicles(newVehicles);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Descrição",
        accessor: "description",
      },
      {
        Header: "Placa",
        accessor: "plate",
      },
      {
        Header: "Favorito",
        accessor: "isFavorite",
        Cell: (props) => {
          return props.value ? "Sim" : "Não";
        },
      },
      {
        Header: "Ano",
        accessor: "year",
      },
      {
        Header: "Cor",
        accessor: "color",
      },
      {
        Header: "Preço",
        accessor: "price",
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openVehicle(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              <span onClick={() => deleteVehicle(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: vehicles,
    });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-8">
        <Link to="/add">
          <button className="btn btn-sm btn-primary">Adicionar</button>
        </Link>
        <button className="btn btn-sm btn-danger" onClick={removeAllVehicles}>
          Excluir tudo
        </button>
      </div>
    </div>
  );
};

export default VehiclesList;
