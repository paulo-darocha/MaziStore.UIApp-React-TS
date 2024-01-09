import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import UserProfile from "./UserProfile";
import CheckAuth from "../auth/CheckAuth";
import UserOrders from "./UserOrders";
import OrderDetails from "../orders/OrderDetails";
import UserAddresses from "./UserAddresses";
import NewAddressForm from "../orders/NewAddressForm";

const UserNav = () => {
   const navigate = useNavigate();

   return (
      <>
         <div>
            <div className="row">
               <div className="col-2 mt-5">
                  <ButtonGroup vertical>
                     <Button variant="outline-secondary">
                        <h4>Navigation</h4>
                     </Button>

                     <Button
                        variant="outline-secondary"
                        onClick={() => navigate("/profile")}
                     >
                        MyProfile
                     </Button>

                     <Button
                        variant="outline-secondary"
                        onClick={() => navigate("orders")}
                     >
                        My Orders
                     </Button>

                     <Button
                        variant="outline-secondary"
                        onClick={() => navigate("addresses")}
                     >
                        My Addresses
                     </Button>
                  </ButtonGroup>
               </div>

               <div className="col-10">
                  <Routes>
                     <Route path="/" element={<UserProfile />} />
                     <Route
                        path="orders"
                        element={
                           <CheckAuth returnUrl="/profile/orders">
                              <UserOrders />
                           </CheckAuth>
                        }
                     />
                     <Route
                        path="order/:id"
                        element={
                           <CheckAuth returnUrl="/profile/orders">
                              <OrderDetails />
                           </CheckAuth>
                        }
                     />
                     <Route
                        path="addresses"
                        element={
                           <CheckAuth returnUrl="/profile/addresses">
                              <UserAddresses />
                           </CheckAuth>
                        }
                     />

                     <Route path="add-address" element={<NewAddressForm />} />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserNav;
