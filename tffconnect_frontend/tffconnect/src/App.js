import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInSide from './user/SignInSide';
import SignUp from './user/SignUp';
import Home from './components/Home';
import Feed from './components/Feed';
import Settings from './user/Settings';

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<SignInSide />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route exact path="/profile" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
