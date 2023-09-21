import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";


function AppRoutes() { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
 }

 export default AppRoutes