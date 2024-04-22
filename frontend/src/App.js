import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import socket from "./socketConfig";

import GameMenu from "./components/GameMenu";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import TypeRacer from "./components/TypeRacer";
import Footer from "./components/Footer";

function App() {
  const [gameState, setGameState] = React.useState({
    _id: "",
    gameCode: "",
    isOpen: false,
    players: [],
    words: [],
  });

  React.useEffect(() => {
    socket.on("updateGame", (game) => {
      setGameState(game);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (gameState._id !== "") {
      navigate(`/game/${gameState.gameCode}`);
    }
  }, [gameState._id, gameState.gameCode, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" Component={GameMenu} />
        <Route path="/game/create" Component={CreateGame} />
        <Route path="/game/join" Component={JoinGame} />
        <Route
          path="/game/:gameID"
          element={<TypeRacer gameState={gameState} />}
        />
      </Routes>
    </>
  );
}

export default App;
