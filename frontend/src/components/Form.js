import React from 'react';
import socket from '../socketConfig';

const Form = ({isOpen,isOver,gameID})=>{
    const [userInput,setUserInput] = React.useState("");
    const textInput = React.useRef(null);

    React.useEffect(()=>{
        if(!isOpen){
            textInput.current.focus();
        }
    },[isOpen])

    const resetForm = ()=>{
        setUserInput("");
    }

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (userInput.trim() !== "") {
          socket.emit("userInput", { userInput, gameID });
          resetForm();
        }
    };

    const onChange = e =>{
        let value = e.target.value;
        let lastChar = value.charAt(value.length - 1);
        if(lastChar === " "){
            socket.emit('userInput',{userInput,gameID});
            resetForm();
        }
        else
            setUserInput(e.target.value);
    }

    return (
        <div className="row my-3">
            <div className="col-sm"></div>
            <div className="col-sm-4">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" readOnly={isOpen || isOver}
                                           onChange={onChange}
                                           value={userInput}
                                           className="form-control"
                                           ref={textInput}/>
                    </div>
                </form>
            </div>
            <div className="col-sm"></div>
        </div>
    )
}

export default Form;