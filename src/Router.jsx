import { Routes,Route } from "react-router-dom"
import Chat from "./pages/chat"
const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<Chat/>}/>
            <Route path="/" element={<Chat/>}/>
        </Routes>
    )
    
}
export default Router