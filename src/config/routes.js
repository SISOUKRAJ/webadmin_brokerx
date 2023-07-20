import { Routes, Route } from "react-router-dom";
// === Start Routes ===
import Home from "../home";
import About from "../about";
import User from "../user";
import Cities from "../cities"
// === End Routes ===

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/about" exact element={<About />}></Route>
        <Route path="/user" exact element={<User />}></Route>
        <Route path="/cities" exact element={<Cities />}></Route>
      </Routes>
    </>
  );
};

export default App;
