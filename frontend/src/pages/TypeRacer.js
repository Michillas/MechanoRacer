import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";
import StartButton from "../components/StartButton";
import socket from "../socketConfig";
import DisplayWords from "../components/DisplayWords";
import Form from "../components/Form";
import ProgressBar from "../components/ProgressBar";
import ScoreBoard from "../components/ScoreBoard";
import DisplayGameCode from "../components/DisplayGameCode";

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const { _id, gameCode, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);

  const navigate = useNavigate();

  React.useEffect(() => {
    const handleEndGame = () => {
      navigate(`/game/${gameCode}/results`);
    };

    socket.on("endgame", handleEndGame);

    return () => {
      socket.off("endgame", handleEndGame);
    };
  }, [gameCode, navigate]);

  if (_id === "") return <Navigate to="/" />;
  
  return (
    <div className="px-5 bg-warning progress-bar-striped">
      <div className="card border-0 bg-warning">
        <div className="card-body p-0">
          <div className="m-0 vh-88 d-flex row montserrat-font justify-content-center align-items-center text-center mw-100 container bg-secondary-subtle">
            <div className="px-5">
              <div className="card">
                <div className="card-body">
                  <DisplayWords words={words} player={player} />
                  <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
                </div>
              </div>
              <hr/>
              <CountDown />
              <hr/>
              <h2 className="mb-3">Jugadores</h2>
              <div className="card">
                <div className="card-body">
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
                <StartButton player={player} gameID={_id} />
                {isOpen ? <DisplayGameCode gameCode={gameCode} /> : null}
                <ScoreBoard players={players} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeRacer;
