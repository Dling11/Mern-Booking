import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/a - home/Home";
import List from "./pages/b - list/List";
import Hotel from "./pages/c - singleHotel/Hotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
