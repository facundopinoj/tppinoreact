import { Alert } from "react-bootstrap"

type AlertGeneratorProps = {
    message : string;
}

//El componente hijo tiene "argumentos" del tipo "AlertGeneratorProps"
const AlertGenerator = ({message} : AlertGeneratorProps) => {
  return (
   <Alert variant="success" className="mt-2 w-25">
        <Alert.Heading> Mesaje recibido </Alert.Heading>
        <p>
            {message}
        </p>
   </Alert>
  )
}

export default AlertGenerator