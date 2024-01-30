import {
   faBriefcase,
   faHomeAlt,
   faInfoCircle,
   faPencil,
   faSearch,
   faSearchPlus,
   faShoppingCart,
   faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Badge,
   Button,
   Container,
   InputGroup,
   Nav,
   NavDropdown,
   Navbar,
   Offcanvas,
   OverlayTrigger,
   Popover,
   Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { setItemsCount } from "../../redux-store/cartItemsReducer";

const Navigation = () => {
   const [show, setShow] = useState(false);
   const [showSearch, setShowSearch] = useState(false);
   const [maxWidth, setMaxWidth] = useState<object>();
   const [search, setSearch] = useState("");
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

   const searchover = (
      <Popover className="bg-secondary" style={{ minWidth: "400px" }}>
         <Popover.Header className="bg-secondary text-white" as="h5">
            Search
            <FontAwesomeIcon
               className="float-end"
               icon={faX}
               onClick={() => setShowSearch(!showSearch)}
            />
         </Popover.Header>
         <Popover.Body>
            <InputGroup>
               <Form.Control
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               ></Form.Control>
               <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
               </InputGroup.Text>
            </InputGroup>
         </Popover.Body>
      </Popover>
   );

   return (
      <Navbar
         expand="md"
         className="p-0"
         style={{ backgroundColor: "aliceblue" }}
         // sticky="top"
      >
         <Container fluid>
            <Navbar.Brand className="">
               <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
               >
                  <FontAwesomeIcon icon={faHomeAlt} />
                  <strong className="ps-2">MaziStore</strong>
               </span>
               <OverlayTrigger
                  show={showSearch}
                  placement="bottom"
                  overlay={searchover}
               >
                  <Button
                     variant="outline-dark"
                     className="my-1 ms-2"
                     onClick={() => setShowSearch(!showSearch)}
                  >
                     <FontAwesomeIcon icon={faSearchPlus} />
                  </Button>
               </OverlayTrigger>
               
               <span className="d-md-none">
                  <Button
                     variant="outline-danger"
                     style={{ cursor: "pointer" }}
                     onClick={() => navigate("/admin")}
                     className="ms-1"
                  >
                     <FontAwesomeIcon icon={faBriefcase} />
                  </Button>
               </span>
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
                     className="m-1 d-grid"
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
                     className="m-1 d-grid"
                  >
                     <Button
                        variant="outline-primary"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon icon={faPencil} className="me-1" />
                        Comment
                     </Button>
                  </Nav.Link>

                  <Nav.Link
                     onClick={() => navigate("/admin")}
                     className="m-1  d-grid"
                  >
                     <Button
                        variant="outline-danger"
                        onClick={() => setShow(false)}
                     >
                        <FontAwesomeIcon icon={faBriefcase} className="me-1" />
                        Admin
                     </Button>
                  </Nav.Link>

                  <Nav.Link
                     onClick={() => navigate("/cart")}
                     className="my-1 me-1 d-grid"
                     style={
                        !show ? { marginLeft: "auto" } : { marginLeft: "4px" }
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
                           className="m-1 d-grid"
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
                           className="m-1 d-grid"
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
                        className="btn btn-outline-primary m-1 d-grid"
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
                           onClick={() => navigate("profile/addresses")}
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
