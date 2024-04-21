import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu = (props) => {
  let navigate = useNavigate();
  return (
    <div className="text-center">
      <h1>Welcome to Type Racer Clone</h1>
      <button
        type="button"
        onClick={() => navigate("/game/create")}
        className="btn btn-primary btn-lg mr-3"
        style={{ cursor: "pointer" }}
      >
        Create Game
      </button>
      <button
        type="button"
        onClick={() => navigate("/game/join")}
        className="btn btn-primary btn-lg"
      >
        Join Game
      </button>
    </div>
  );
};

export default GameMenu;
