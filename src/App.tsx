import React, { useEffect } from "react";
import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Page from "./components/Page";
import IntroPage from "./pages/IntroPage";
import ScoreBoardPage from "./pages/ScoreBoardPage";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="appContainer">
          <Page>
            <Routes>
              <Route path="/prepare" element={<IntroPage />} />
              <Route path="/" element={<IntroPage />} />
              <Route path="/play" element={<GamePage />} />
              <Route path="/scoreboard" element={<ScoreBoardPage />} />
            </Routes>
          </Page>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
