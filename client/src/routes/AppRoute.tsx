import { Routes, Route } from "react-router-dom";
import RegisterPage from "../modules/auth/Register";
import LoginPage from "../modules/auth/UserLogin";
import Dashboard from "../modules/pages/Dashboard";
import PartiesPage from "../modules/pages/PartyPage";
import VotingPageList from "../modules/pages/VotePage";
import LandingPage from "../modules/pages/LandingPage";
import ElectionPage from "../modules/pages/Election";


export const AppRouter = ()=>{

    return (
        <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/parties" element={<PartiesPage/>}></Route>
        <Route path="/votes/:electionid" element={<VotingPageList/>}></Route>
        <Route path="/elections" element={<ElectionPage/>}></Route>
        </Routes>


    )


}