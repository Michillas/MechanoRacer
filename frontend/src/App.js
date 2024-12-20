import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CookiesProvider } from 'react-cookie'

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


import socket from "./socketConfig";

import GameMenu from "./pages/GameMenu";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import TypeRacer from "./pages/TypeRacer";
import CreateSingle from "./pages/CreateSingle";
import SinglePlayer from "./pages/SinglePlayer";
import EndSingle from "./pages/EndSingle";
import EndGame from "./pages/EndGame";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
    if (gameState._id !== "" && !gameState.isOver) {
      navigate(`/game/${gameState.gameCode}`);
    }
  }, [gameState._id, gameState.gameCode, navigate, gameState.isOver]);

  return (
    <div className="vh-100">
      <CookiesProvider>
        <Header/>
        <Routes>
          <Route path="/" Component={GameMenu} />
          <Route path="/game/create" Component={CreateGame} />
          <Route path="/game/singleplayer" Component={CreateSingle} />
          <Route path="/game/singleplayer/play" Component={SinglePlayer} />
          <Route path="/game/singleplayer/end" Component={EndSingle} />
          <Route path="/game/join" Component={JoinGame} />
          <Route
            path="/game/:gameID"
            element={<TypeRacer gameState={gameState} />}
          />
          <Route
            path="/game/:gameID/results"
            element={<EndGame gameState={gameState} />}
          />
        </Routes>
        <Footer/>
      </CookiesProvider>
    </div>
  );
}

export default App;
