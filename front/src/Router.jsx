import { Routes,Route } from "react-router-dom"
import Chat from "./pages/chat"
import Home from "./pages/LobbyPage"

const Router = ({setLoading}) =>{

    

    return (
        <Routes>
            <Route path="/" element={<Home setLoading={setLoading}/>}/>
            <Route path="/chat" element={<Chat/>}/>
        </Routes>
    )
    
}
export default Router