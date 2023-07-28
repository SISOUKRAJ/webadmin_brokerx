import { Routes, Route } from "react-router-dom";
// === Start Routes ===
import Home from "../home";
import About from "../about";
import User from "../user";
import Cities from "../cities"
import PropertyType from "../proptype"
import Properties from "../properties"
// === End Routes ===

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/about" exact element={<About />}></Route>
        <Route path="/user" exact element={<User />}></Route>
        <Route path="/cities" exact element={<Cities />}></Route>
        <Route path="/property_type" exact element={<PropertyType />}></Route>
        <Route path="/properties" exact element={<Properties />}></Route>
      </Routes>
    </>
  );
};

export default App;
