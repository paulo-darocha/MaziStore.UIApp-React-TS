import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import UserProfile from "./UserProfile";
import CheckAuth from "../auth/CheckAuth";
import UserOrders from "./UserOrders";
import OrderDetails from "../orders/OrderDetails";
import UserAddresses from "./UserAddresses";
import NewAddressForm from "../orders/NewAddressForm";
import { useAppSelector } from "../../redux-store/reduxStore";

const UserNav = () => {
   const navigate = useNavigate();
   const user = useAppSelector((x) => x.username);

   return (
      <div className="container-fluid">
         <div className="row border">
            <Navbar data-bs-theme="light" className="py-0 float-start">
               <Container>
                  <Nav>
                     <Button
                        size="sm"
                        className="me-1"
                        variant="outline-dark"
                        onClick={() => navigate("/profile")}
                     >
                        MyProfile
                     </Button>
                     <Button
                        size="sm"
                        className="mx-1"
                        variant="outline-dark"
                        onClick={() => navigate("orders")}
                     >
                        MyOrders
                     </Button>
                     <Button
                        size="sm"
                        className="mx-1"
                        variant="outline-dark"
                        onClick={() => navigate("addresses")}
                     >
                        MyAddresses
                     </Button>
                  </Nav>
               </Container>
            </Navbar>
            <strong>{user}</strong>
         </div>

         <div className="row">
            <div>
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
   );
};

export default UserNav;
