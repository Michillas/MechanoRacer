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
    <div className="row montserrat-font d-flex justify-content-center align-items-center text-center vh-100">
        <div class="card w-50 p-0">
          <div class="card-header">
            Crear Sala
          </div>
          <div class="card-body">
            <h5 class="card-title">Nombre de usuario:</h5>
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
                className="btn btn-primary btn-lg mt-3"
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
