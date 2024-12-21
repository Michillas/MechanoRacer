import React from "react";

const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
  }
  return 0;
};

const ProgressBar = ({ player, players, wordsLength }) => {
  const percentage = calculatePercentage(player, wordsLength);
  return (
    <div>
      {
        <>
          <h5 className="text-start">
            <span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill justify-content-center" style={{ width: 'max-content' }}>
              <img className="rounded-circle me-1" width="24" height="24" src={`https://github.com/${player.nickName}.png`} alt=""/>{player.nickName}
            </span>
          </h5>
          <div className="progress my-1" key={player._id}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
              role="progressbar"
              style={{ width: percentage }}
            >
              {percentage}
            </div>
          </div>
        </>
      }
      {players.map((playerObj) => {
        const percentage = calculatePercentage(playerObj, wordsLength);
        return playerObj._id !== player._id ? (
          <>
            <h5 className="text-start">
              <span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill justify-content-center" style={{ width: 'max-content' }}>
                <img className="rounded-circle me-2" width="24" height="24" src={`https://github.com/${playerObj.nickName}.png`} alt=""/>{playerObj.nickName}
              </span>
            </h5>
            <div className="progress my-1" key={playerObj._id}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: percentage }}
              >
                {percentage}
              </div>
            </div>
          </>
        ) : null;
      })}
    </div>
  );
};

export default ProgressBar;
