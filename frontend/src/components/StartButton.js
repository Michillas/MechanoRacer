import React from 'react';
import socket from '../socketConfig';

const StartButton = ({player,gameID})=>{
    const [showBtn,setShowBtn] = React.useState(true);
    const {isPartyLeader} = player;

    const onClickHandler = e =>{
        socket.emit('timer',{playerID : player._id,gameID});
        setShowBtn(false);
    }

    return(
        isPartyLeader && showBtn ? (
            <>
                <button type="button" onClick={onClickHandler} className="btn btn-primary" style={{cursor:'pointer'}}>Empezar Partida</button>
                <hr/>   
            </>                              
        ) : null
    )
}

export default StartButton;