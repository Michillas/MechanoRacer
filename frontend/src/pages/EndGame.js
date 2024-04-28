import React from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";

const EndGame = ({ gameState }) => {
    const { players, isOver } = gameState;

    const navigate = useNavigate();

    const volverAlMenu = e =>{
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="row montserrat-font d-flex justify-content-center align-items-center text-center vh-88 mw-100 ms-0 bg-warning px-5">
        <div className="card border-0">
            <div className="card-body p-3">
                {isOver ? 
                    <>
                        <h1>Partida Terminada</h1>
                        <hr/>
                        <h3>Resultados</h3>
                        <ScoreBoard players={players} />
                        <form onSubmit={volverAlMenu} className="">
                            <button type="submit" className="btn btn-warning mt-3">Volver al Menu</button>
                        </form>
                    </> : 
                    <>
                        <h1>Esta partida aún no ha terminado</h1>
                        <hr/>
                        <form onSubmit={volverAlMenu} className="">
                            <button type="submit" className="btn btn-warning mt-3">Volver al Menu</button>
                        </form>
                    </>
                }
            </div>
        </div>
        </div>
    );
};

export default EndGame;
