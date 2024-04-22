import React from "react";
import { Navigate } from "react-router-dom";
import CountDown from "./CountDown";
import StartButton from "./StartButton";
import socket from "../socketConfig";
import DisplayWords from "./DisplayWords";
import Form from "./Form";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import DisplayGameCode from "./DisplayGameCode";

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const { _id, gameCode, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);
  if (_id === "") return <Navigate to="/" />;
  return (
    <div className="d-flex row montserrat-font justify-content-center align-items-center text-center vh-100 mw-100 container bg-secondary-subtle">
      <div className="px-5">
        <div class="card">
          <div class="card-body">
            <DisplayWords words={words} player={player} />
            <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
          </div>
        </div>
        <hr/>
        <h2 className="mb-3">Jugadores</h2>
        <div class="card">
          <div class="card-body">
            <ProgressBar
            players={players}
            player={player}
            wordsLength={words.length}
            className=""
            />
          </div>
        </div>
        <hr/>
        <div>
          <CountDown />
          <StartButton player={player} gameID={_id} />
          {isOpen ? <DisplayGameCode gameCode={gameCode} /> : null}
          <ScoreBoard players={players} />
        </div>
      </div>
    </div>
  );
};

export default TypeRacer;
