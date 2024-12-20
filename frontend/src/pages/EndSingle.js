import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EndSingle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { WPM } = location.state || { WPM: 0 };

  const volverAlMenu = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="row montserrat-font d-flex justify-content-center align-items-center text-center vh-88 mw-100 ms-0 bg-warning progress-bar-striped px-5">
      <div className="card border-0">
        <div className="card-body p-3">
          <h1>Partida Terminada</h1>
          <hr/>
          <h3>Velocidad: {WPM} WPM</h3>
          <form onSubmit={volverAlMenu} className="">
            <button type="submit" className="btn btn-warning mt-3">Volver al Menu</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EndSingle;