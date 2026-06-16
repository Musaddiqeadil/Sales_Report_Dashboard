import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import AddVisit from "./pages/AddVisit";
import ReportList from "./pages/ReportList";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import Payments from "./pages/Payments";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-visit" element={<AddVisit />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/team" element={<Team />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
