import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import LoginWindow from "./pages/login";


function AppRoutes() { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="login" element={<LoginWindow/>}></Route>
            </Routes>
        </BrowserRouter>
    )
 }

 export default AppRoutes