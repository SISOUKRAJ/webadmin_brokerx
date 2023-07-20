import { Routes, Route } from "react-router-dom";
// === Start Routes ===
import Home from "../home";
import About from "../about";
import User from "../user";
// === End Routes ===

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/about" exact element={<About />}></Route>
        <Route path="/user" exact element={<User />}></Route>
      </Routes>
    </>
  );
};

export default App;
