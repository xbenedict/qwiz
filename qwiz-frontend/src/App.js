import React from "react";
import LandingPage from "./Components/LandingPage/LandingPage";
import GameRoom from "./Components/GameRoom/GameRoom";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId" element={<GameRoom />} />
      </Routes>
    </div>
  );
}

export default App;
