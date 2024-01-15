import {
   faBriefcase,
   faHomeAlt,
   faInfoCircle,
   faPencil,
   faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Badge,
   Button,
   Container,
   Nav,
   NavDropdown,
   Navbar,
   Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { setItemsCount } from "../../redux-store/cartItemsReducer";

const Navigation = () => {
   const [show, setShow] = useState(false);
   const [maxWidth, setMaxWidth] = useState<object>();
   const navigate = useNavigate();

   const cartCount = useAppSelector((x) => x.items);
   const token = useAppSelector((x) => x.token);
   const username = useAppSelector((x) => x.username);
   const id = useAppSelector((x) => x.id);
   const dispatch = useAppDispatch();

   useEffect(() => {
      getCartItemsCount(id).then((res) => dispatch(setItemsCount(res)));
   }, [dispatch, id]);

   useEffect(() => {
      setTimeout(() => {
         show ? setMaxWidth({ maxWidth: "250px" }) : setMaxWidth({});
      }, 150);
   }, [show]);

   return (
      <Navbar
         expand="md"
         className=""
         style={{ backgroundColor: "aliceblue" }}
         sticky="top"
      >
         <Container fluid>
            <Navbar.Brand className="" onClick={() => navigate("/")}>
               <FontAwesomeIcon icon={faHomeAlt} />
               <strong className="ps-2">MaziStore</strong>
            </Navbar.Brand>

            <Navbar.Toggle onClick={() => setShow(true)} />

            <Navbar.Offcanvas
               show={show}
               style={maxWidth}
               onHide={() => setShow(false)}
            >
               <Offcanvas.Header closeButton onClick={() => setShow(false)}>
                  <Offcanvas.Title>Mazi Store</Offcanvas.Title>
               </Offcanvas.Header>

               <Offcanvas.Body className="text-end">
                  <Nav.Link
                     onClick={() => navigate("/about")}
                     className="m-2 d-grid"
                  >
                     <Button
                        variant="outline-primary"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon
                           icon={faInfoCircle}
                           size="lg"
                           className="me-1"
                        />
                        About
                     </Button>
                  </Nav.Link>

                  <Nav.Link
                     onClick={() => navigate("/comment")}
                     className="m-2 d-grid"
                  >
                     <Button
                        variant="outline-primary"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon icon={faPencil} className="me-1" />
                        Leave a Comment
                     </Button>
                  </Nav.Link>

                  <Nav.Link
                     onClick={() => navigate("/admin")}
                     className="m-2  d-grid"
                  >
                     <Button
                        variant="outline-primary"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon icon={faBriefcase} className="me-1" />
                        Administration
                     </Button>
                  </Nav.Link>

                  <Nav.Link
                     onClick={() => navigate("/cart")}
                     className="my-2 me-2 d-grid"
                     style={
                        !show ? { marginLeft: "auto" } : { marginLeft: "8px" }
                     }
                  >
                     <span
                        className="btn btn-outline-primary"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon
                           icon={faShoppingCart}
                           size="lg"
                           className="me-1"
                        />
                        <small>
                           <Badge pill bg="info">
                              {cartCount ?? 0}
                           </Badge>
                        </small>
                     </span>
                  </Nav.Link>

                  {token === "x" ? (
                     <>
                        <Nav.Link
                           onClick={() => navigate("/login")}
                           className="m-2 d-grid"
                        >
                           <Button
                              variant="outline-primary"
                              onClick={() => setShow(false)}
                           >
                              Login
                           </Button>
                        </Nav.Link>

                        <Nav.Link
                           onClick={() => navigate("/register")}
                           className="m-2 d-grid"
                        >
                           <Button
                              variant="outline-primary"
                              onClick={() => setShow(false)}
                           >
                              Register
                           </Button>
                        </Nav.Link>
                     </>
                  ) : (
                     <NavDropdown
                        title={`${id}.${username}`}
                        className="btn btn-outline-primary m-2 d-grid"
                     >
                        <NavDropdown.Item
                           onClick={() => navigate("/logout")}
                           className="text-center d-grid"
                        >
                           <Button
                              onClick={() => setShow(false)}
                              variant="outline-dark"
                           >
                              Logout
                           </Button>
                        </NavDropdown.Item>

                        <NavDropdown.Item
                           onClick={() => navigate("/profile")}
                           className="d-grid"
                        >
                           <Button
                              onClick={() => setShow(false)}
                              variant="outline-dark"
                           >
                              My Profile
                           </Button>
                        </NavDropdown.Item>

                        <NavDropdown.Item
                           onClick={() => navigate("profile/orders")}
                           className="d-grid"
                        >
                           <Button
                              variant="outline-dark"
                              onClick={() => setShow(false)}
                           >
                              My Orders
                           </Button>
                        </NavDropdown.Item>

                        <NavDropdown.Item
                           onClick={() => navigate("profile/address")}
                           className="d-grid"
                        >
                           <Button
                              variant="outline-dark"
                              onClick={() => setShow(false)}
                           >
                              My Addresses
                           </Button>
                        </NavDropdown.Item>
                        <hr className="m-1" />
                     </NavDropdown>
                  )}
               </Offcanvas.Body>
            </Navbar.Offcanvas>
         </Container>
      </Navbar>
   );
};

export default Navigation;
