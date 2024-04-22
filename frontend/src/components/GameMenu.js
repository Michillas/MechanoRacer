import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu = (props) => {
  let navigate = useNavigate();
  return (
    <div className="montserrat-font d-flex justify-content-center align-items-center text-center vh-100">
      <div className="d-flex justify-content-center align-items-center text-center row gy-3">
        <h1 className="main-font display-1 m-0" >MechanoRacer</h1>
        <button
          type="button"
          onClick={() => navigate("/game/create")}
          className="btn btn-primary btn-lg"
          style={{ cursor: "pointer" }}
        >
          Crear partida
        </button>

        <button
          type="button"
          onClick={() => navigate("/game/join")}
          className="btn btn-primary btn-lg"
        >
          Unirse con código
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
