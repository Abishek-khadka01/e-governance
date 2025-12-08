import { Route, Routes } from "react-router-dom";
import AdminLogin from "../auth/Login";
import AdminDashboard from "../pages/dashboard";
import { UserPage } from "../pages/users";
import { PartiesPage } from "../pages/parties";
import CandidateDashboard from "../pages/candidates-dashboard";
import ElectionsPage from "../pages/election-dashboard";
import CandidateByParty from "../pages/candiate-party";
import CandidateByElection from "../pages/candidate-election";
export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<UserPage/>}></Route>
      <Route path="/parties" element={<PartiesPage/>}></Route>
      <Route path="/elections" element={<ElectionsPage/>}></Route>
      <Route path="/candidates" element={<CandidateDashboard/>}></Route>
      <Route path="/candidates/:party_id" element={<CandidateByParty/>}> </Route>
      <Route path="/candidates/year" element={<CandidateByElection/>}></Route>
    </Routes>
  );
};
