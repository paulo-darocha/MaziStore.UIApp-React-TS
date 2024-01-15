import {
   Alert,
   Button,
   Container,
   Nav,
   NavDropdown,
   Navbar,
   Offcanvas,
   Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-store/reduxStore";
import { getCartItemsCount } from "../webApis/ShoppingCartWebApi";
import { setItemsCount } from "../redux-store/cartItemsReducer";
import { logoutFromServer } from "../webApis/AuthWebApi";
import { setToken } from "../redux-store/tokenReducer";
import { setUsername } from "../redux-store/userNameReducer";
import { setId } from "../redux-store/idReducer";

const AdminNavigation = () => {
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

   const id = useAppSelector((x) => x.id);
   const dispatch = useAppDispatch();

   useEffect(() => {
      getCartItemsCount(id).then((res) => dispatch(setItemsCount(res)));
   }, [dispatch, id]);

   // If exit admin area => automatic logout
   const onClickStoreName = () => {
      logoutFromServer().then(() => {
         dispatch(setToken("x"));
         dispatch(setUsername(""));
         dispatch(setId(0));
      });
   };

   return (
      <>
         <Alert
            variant="warning"
            onClose={() => setShow(false)}
            dismissible
            className="text-center"
         >
            You are logged in as "guest-admin" <br /> Only mocked data available
         </Alert>

         <Navbar
            expand={"md"}
            className="bg-body-tertiary mb-3"
            style={{ fontSize: "1.05em" }}
         >
            <Container fluid>
               <Navbar.Brand onClick={() => navigate("/")}>
                  <Button variant="outline-dark" onClick={onClickStoreName}>
                     MaziStore
                  </Button>
               </Navbar.Brand>

               <Navbar.Toggle />
               <Navbar.Offcanvas id="controle">
                  <Offcanvas.Header closeButton>
                     <Offcanvas.Title id="controle-title">
                        MaziStore Adminstration
                     </Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                     <Nav>
                        <NavDropdown title="Users" className="mx-2">
                           <Navbar.Toggle>
                              <NavDropdown.Item
                                 onClick={() => navigate("users")}
                              >
                                 Users
                              </NavDropdown.Item>
                           </Navbar.Toggle>
                        </NavDropdown>

                        <NavDropdown title="Products" className="mx-2">
                           <Navbar.Toggle>Products</Navbar.Toggle>
                        </NavDropdown>
                     </Nav>
                  </Offcanvas.Body>
               </Navbar.Offcanvas>
            </Container>
         </Navbar>
      </>
   );
};

export default AdminNavigation;
