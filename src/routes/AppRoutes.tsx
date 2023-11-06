import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import Administracion from "../pages/Administracion"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Componentes" element={<Componentes/>}/>
        <Route path="/Administracion" element={<Administracion/>}/>
    </Routes>
  )
}

export default AppRoutes