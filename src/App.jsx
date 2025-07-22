import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 p-3 bg-light">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
