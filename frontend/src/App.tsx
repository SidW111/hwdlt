import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/verify" element={<Verify />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
      
      );
};

export default App;
