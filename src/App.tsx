import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navigation from "./components/home/Navigations";
import ProductDetails from "./components/catalog/ProductDetail";

function App() {
   return (
      <>
         <div className="container-xxl">
            <div className="row">
               <div>
                  <Navigation />
               </div>
            </div>
            <div className="row">
               <div>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/product/:id" element={<ProductDetails />} />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
