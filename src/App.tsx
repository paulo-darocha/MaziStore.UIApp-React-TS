import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navigation from "./components/home/Navigations";
import ProductDetails from "./components/catalog/ProductDetails";
import CartList from "./components/shopping-cart/CartList";
import ProductsInCategory from "./components/categories/ProductsInCategory";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Logout from "./components/auth/Logout";
import Checkout from "./components/orders/Checkout";
import Payment from "./components/payments/Payment";
import Thanks from "./components/orders/Thanks";
import UserNav from "./components/user/UserNav";
import CheckAuth from "./components/auth/CheckAuth";
import About from "./components/user/About";
import Comment from "./components/user/Comment";

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
                     <Route path="/home" element={<Home />} />
                     <Route path="/product/:id" element={<ProductDetails />} />
                     <Route path="/cart" element={<CartList />} />
                     <Route
                        path="/category/:id"
                        element={<ProductsInCategory />}
                     />
                     <Route path="/login/:id?" element={<Login />} />
                     <Route path="/register" element={<Registration />} />
                     <Route path="/logout" element={<Logout />} />

                     <Route
                        path="/checkout"
                        element={
                           <CheckAuth returnUrl="/checkout">
                              <Checkout />
                           </CheckAuth>
                        }
                     />

                     <Route
                        path="/payment"
                        element={
                           <CheckAuth returnUrl="/payment">
                              <Payment />
                           </CheckAuth>
                        }
                     />

                     <Route path="/thanks/:orderId" element={<Thanks />} />
                     <Route path="/about" element={<About />} />

                     <Route
                        path="/profile/*"
                        element={
                           <CheckAuth returnUrl="/profile/*">
                              <UserNav />
                           </CheckAuth>
                        }
                     />

                     <Route path="/comment" element={<Comment />} />

                     <Route path="*" element={<Home notFound={true} />} />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
