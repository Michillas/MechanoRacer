import React from "react";

const getScoreboard = (players) => {
  const scoreBoard = players.filter((player) => player.WPM !== -1);
  return scoreBoard.sort((a, b) =>
    a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0
  );
};

const ScoreBoard = ({ players }) => {
  const scoreBoard = getScoreboard(players);
  if (scoreBoard.length === 0) return null;
  return (
    <table className="table table-striped my-3">
      <thead>
        <tr>
          <th scope="col">Posición</th>
          <th scope="col">Jugador</th>
          <th scope="col">Velocidad/WPM</th>
        </tr>
      </thead>
      <tbody>
        {scoreBoard.map((player, index) => {
            return (
            <tr key={player.nickName}>
              <th scope="row">{index + 1}</th>
              <td class="d-flex justify-content-center">
              <span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill justify-content-center" style={{ width: 'max-content' }}>
              <img className="rounded-circle me-1" width="24" height="24" src={`https://github.com/${player.nickName}.png`} alt=""/>{player.nickName}
              </span>
              </td>
              <td>{player.WPM}</td>
            </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
