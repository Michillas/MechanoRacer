import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SinglePlayer = () => {
  const [userInput, setUserInput] = React.useState("");
  const [timer, setTimer] = React.useState({ countDown: 60, msg: "Pulsa el botón para comenzar" });
  const [game, setGame] = React.useState({
    words: ["Bienvenido", "a", "una", "partida", "de", "prueba", "de", "mecanografía."],
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
    setPlayer((prev) => ({ ...prev, nickName: cookies.usuario || "Jugador:" }));
  }, [cookies]);

  React.useEffect(() => {
    if (!game.isOpen && textInput.current) {
      textInput.current.focus();
    }
  }, [game.isOpen]);

  React.useEffect(() => {
    const endGame = () => {
      const WPM = calculateWPM();
      setGame((prev) => ({ ...prev, isOver: true }));
      setTimer((prev) => ({ ...prev, msg: "Game Over!" }));
      navigate(`/game/singleplayer/end`, { state: { WPM } });
    };

    if (timer.countDown > 0 && !game.isOver && !game.isOpen) {
      const interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          countDown: prev.countDown - 1,
          msg: "Juego en curso...",
        }));
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer.countDown === 0 && !game.isOver) {
      endGame();
    }
  }, [timer.countDown, game.isOver, game.isOpen, navigate]);

  React.useEffect(() => {
    if (calculatePercentage() === 100) {
      const WPM = calculateWPM();
      setGame((prev) => ({ ...prev, isOver: true }));
      setTimer((prev) => ({ ...prev, msg: "Game Over!" }));
      navigate(`/game/singleplayer/end`, { state: { WPM } });
    }
  }, [player.currentWordIndex, game.words.length, navigate]);

  const calculateWPM = () => {
    const numOfWords = player.currentWordIndex;
    const timeInMinutes = (60 - timer.countDown) / 60;
    return Math.floor(numOfWords / timeInMinutes);
  };

  const calculatePercentage = () => {
    const percentage = (player.currentWordIndex / game.words.length) * 100;
    return game.words.length > 0 ? percentage : 0;
  };

  const startGame = () => {
    setGame((prev) => ({ ...prev, isOpen: false }));
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

  const onChange = (e) => {
    let value = e.target.value;
    let lastChar = value.charAt(value.length - 1);
    if (lastChar === " ") {
      onSubmit(e);
    } else {
      setUserInput(value);
    }
  };

  const typedWords = game.words.slice(0, player.currentWordIndex).join(" ");
  const currentWord = game.words[player.currentWordIndex] || "";
  const wordsToBeTyped = game.words.slice(player.currentWordIndex + 1).join(" ");

  return (
    <div className="px-5 bg-warning progress-bar-striped">
      <div className="card border-0 bg-warning">
        <div className="card-body p-0">
          <div className="m-0 vh-88 d-flex flex-column justify-content-center align-items-center text-center bg-secondary-subtle">
            <h2 className="mb-2 main-font fst-italic">MechanoRacer</h2>
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
              Empezar Partida
            </button>
            <div className="progress w-75">
              <div
                className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                style={{ width: `${calculatePercentage()}%` }}
              >
                {`${calculatePercentage().toFixed(2)}%`}
              </div>
            </div>
            <h5 className="mt-3 d-flex align-items-center justify-content-center">
              <p className="me-2 mb-1">Jugador:</p>
              <span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill justify-content-center" style={{ width: 'max-content' }}>
                <img className="rounded-circle me-1" width="24" height="24" src={`https://github.com/${player.nickName}.png`} alt=""/>{player.nickName}
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;