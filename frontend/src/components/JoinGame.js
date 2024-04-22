import React from 'react';
import socket from '../socketConfig';

const JoinGame = props =>{
    const [userInput,setuserInput] = React.useState({gameID : "",nickName : ""});
    
    const onChange = e=>{
        setuserInput({...userInput,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(userInput);
        socket.emit('join-game', userInput);
    }

    return(
        <div className="row montserrat-font d-flex justify-content-center align-items-center text-center vh-88 mw-100 ms-0 bg-warning">
            <div class="card w-50 p-0 shadow">
                <div class="card-header">
                    Unirse a una Sala
                </div>
                <form onSubmit={onSubmit} className="p-3">
                    <div className="form-group">
                        <h5 class="card-title">Código de la Sala</h5>
                        <input type="text" name="gameID" 
                                        value={userInput.gameID}
                                        onChange={onChange}
                                        placeholder="Código"
                                        className="form-control"/>
                        <h5 class="card-title m-2">Nombre de usuario</h5>
                        <input type="text" name="nickName" 
                                        value={userInput.nickName}
                                        onChange={onChange}
                                        placeholder="Nick"
                                        className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-warning mt-3">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default JoinGame;