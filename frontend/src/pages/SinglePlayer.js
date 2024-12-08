import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SinglePlayer = () => {
  const [userInput, setUserInput] = React.useState("");
  const [timer, setTimer] = React.useState({ countDown: 60, msg: "Game starting soon..." });
  const [game, setGame] = React.useState({
    words: ["Welcome", "to", "the", "typing", "game!"],
    isOpen: true,
    isOver: false,
  });
  const [player, setPlayer] = React.useState({
    currentWordIndex: 0,
    WPM: 0,
    nickName: "",
  });

  const textInput = React.useRef(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["usuario"]);

  React.useEffect(() => {
    setPlayer((prev) => ({ ...prev, nickName: cookies.usuario || "Player" }));
  }, [cookies]);

  React.useEffect(() => {
    if (!game.isOpen && textInput.current) {
      textInput.current.focus();
    }
  }, [game.isOpen]);

  React.useEffect(() => {
    if (timer.countDown > 0 && !game.isOver) {
      const interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          countDown: prev.countDown - 1,
          msg: "Game in progress...",
        }));
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer.countDown === 0 && !game.isOver) {
      endGame();
    }
  }, [timer.countDown, game.isOver]);

  const startGame = () => {
    setGame((prev) => ({ ...prev, isOpen: false }));
    setTimer({ countDown: 60, msg: "Game in progress..." });
  };

  const endGame = () => {
    setGame((prev) => ({ ...prev, isOver: true }));
    setTimer((prev) => ({ ...prev, msg: "Game Over!" }));
    navigate(`/game/singleplayer/results`);
  };

  const resetForm = () => setUserInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    const currentWord = game.words[player.currentWordIndex];
    if (userInput.trim() === currentWord) {
      setPlayer((prev) => ({
        ...prev,
        currentWordIndex: prev.currentWordIndex + 1,
      }));
      resetForm();
    }
  };

  const onChange = (e) => setUserInput(e.target.value);

  const calculatePercentage = () => {
    const percentage = ((player.currentWordIndex / game.words.length) * 100).toFixed(2);
    return game.words.length > 0 ? `${percentage}%` : "0%";
  };

  const typedWords = game.words.slice(0, player.currentWordIndex).join(" ");
  const currentWord = game.words[player.currentWordIndex] || "";
  const wordsToBeTyped = game.words.slice(player.currentWordIndex + 1).join(" ");

  return (
    <div className="px-5 bg-warning progress-bar-striped">
      <div className="card border-0 bg-warning">
        <div className="card-body p-0">
          <div className="m-0 vh-88 d-flex flex-column justify-content-center align-items-center text-center bg-secondary-subtle">
            <h2 className="mb-3">Typing Game</h2>
            <div className="card mt-2 w-75">
              <div className="card-body">
                <div className="text-start">
                  <span style={{ backgroundColor: "#00c448" }}>{typedWords} </span>
                  <span style={{ textDecoration: "underline" }}>{currentWord}</span>
                  <span> {wordsToBeTyped}</span>
                </div>
                <form onSubmit={onSubmit} className="my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type the word here..."
                    value={userInput}
                    onChange={onChange}
                    disabled={game.isOpen || game.isOver}
                    ref={textInput}
                  />
                </form>
                <h4>{timer.msg}</h4>
                <h2>{timer.countDown}s</h2>
              </div>
            </div>
            <button
              onClick={startGame}
              disabled={!game.isOpen || game.isOver}
              className="btn btn-warning my-3"
            >
              Start Game
            </button>
            <div className="progress w-75">
              <div
                className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                style={{ width: calculatePercentage() }}
              >
                {calculatePercentage()}
              </div>
            </div>
            <h5 className="mt-3">Player: {player.nickName}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
