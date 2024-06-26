import React, { useState } from "react";
import socket from "../socketConfig";

const CreateGame = (props) => {
  const [nickName, setNickName] = useState("");

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-game", nickName);
  };

  return (
    <div className="row montserrat-font d-flex justify-content-center align-items-center text-center vh-88 mw-100 ms-0 bg-warning progress-bar-striped">
        <div className="card w-50 p-0 shadow">
          <div className="card-header">
            Crear Sala
          </div>
          <div className="card-body">
            <h5 className="card-title">Nombre de usuario:</h5>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nickName"
                  value={nickName}
                  onChange={onChange}
                  placeholder="Nick"
                  className="form-control"
                />
              </div>
              <button
                style={{ cursor: "pointer" }}
                type="submit"
                className="btn btn-warning btn-lg mt-3"
              >
                Jugar
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default CreateGame;
