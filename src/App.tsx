import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navigation from "./components/home/Navigations";
import ProductDetails from "./components/catalog/ProductDetails";
import CartList from "./components/shopping-cart/CartList";
import ProductsInCategory from "./components/categories/ProductsInCategory";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

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
                     <Route path="/cart" element={<CartList />} />
                     <Route
                        path="/category/:id"
                        element={<ProductsInCategory />}
                     />
                     <Route path="/login/:url?" element={<Login />} />
                     <Route path="/register" element={<Registration />} />
                     <Route path="*" element={<Home notFound={true} />} />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
