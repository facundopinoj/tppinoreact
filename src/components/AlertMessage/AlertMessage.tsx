import { useState } from "react"
import AlertGenerator from "../AlertGenerator/AlertGenerator";

const AlertMessage = () => {


    //Guarda el valor del campo de texto
    const [inputValue, setInputValue] = useState (' ');

    //Guarda el mensaje
    const [message, setMessage] = useState (' ');

    //Muestra el componente hijo segun el estado
    const [showAlert, setshowAlert] = useState(false);

    //Si el campo de texto no esta vacio, se guarda el texto que escribio el usuario en "message"
    //y se renderiza el componente hijo
    const handleClick = () => {
        if(inputValue.trim() !== '') {
            setshowAlert(true);
            setMessage(inputValue);
        } else {
            setshowAlert(false);
        }
    }

  return (
    <div className="m-3">

      <h2> Ejemplo 2 </h2>

      {/* Componente padre */}

      <input type="text" value={inputValue} onChange={(e) =>
       setInputValue(e.target.value)}/>

       <button onClick={handleClick}> Enviar </button>

       {/* Componente hijo */}

       {showAlert && <AlertGenerator message={message}/>}

    </div>
  )
}

export default AlertMessage