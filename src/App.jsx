import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Users from "./Components/Pages/Users";
import Edit from "./Components/Pages/Edit";
import Create from "./Components/Pages/Create";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Main App component serving as the root of the application
const App = () => {
  // State to track a selected user ID, passed to Users component
  const [id, setId] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users setId={setId} />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

// Exports App for use as the main entry point
export default App;
