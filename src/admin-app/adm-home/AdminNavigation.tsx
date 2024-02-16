import {
   Alert,
   Button,
   Container,
   InputGroup,
   Navbar,
   OverlayTrigger,
   Popover,
   Form,
   Offcanvas,
   NavDropdown,
   ToastContainer,
   Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { setItemsCount } from "../../redux-store/cartItemsReducer";
import { logoutFromServer } from "../../webApis/AuthWebApi";
import { setToken } from "../../redux-store/tokenReducer";
import { setUsername } from "../../redux-store/userNameReducer";
import { setId } from "../../redux-store/idReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faArrowLeftRotate,
   faSearch,
   faSearchPlus,
   faX,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavigation = () => {
   const [showToast, setShowToast] = useState(true);
   const [show, setShow] = useState(false);
   const [showSearch, setShowSearch] = useState(false);
   const [search, setSearch] = useState("");
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
         navigate("/");
      });
   };

   const search_admin = (
      <Popover className="bg-secondary" style={{ minWidth: "400px" }}>
         <Popover.Header className="bg-secondary text-white" as="h5">
            Search In Admin
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
      <>
         <ToastContainer
            className="p-3"
            position="top-center"
            style={{ zIndex: 1 }}
         >
            <Toast
               bg="warning"
               onClose={() => setShowToast(false)}
               show={showToast}
               delay={3000}
               autohide
               className="text-center"
            >
               <Toast.Header>
                  <strong className="me-auto">MaziStore Administration</strong>
               </Toast.Header>
               <Toast.Body>
                  You are logged in as "guest-admin".
                  <br /> Only mocked data available
               </Toast.Body>
            </Toast>
         </ToastContainer>

         <Navbar expand="md" className="p-0">
            <Container fluid>
               <Navbar.Text>
                  <Button onClick={() => navigate("")} className="mx-2">
                     Adm Home
                  </Button>
                  <Button variant="outline-dark" onClick={onClickStoreName}>
                     <FontAwesomeIcon icon={faArrowLeftRotate} />
                     <strong className="ms-1">Exit</strong>
                  </Button>
                  <OverlayTrigger
                     show={showSearch}
                     placement="bottom"
                     overlay={search_admin}
                  >
                     <Button
                        variant="outline-dark"
                        className="my-1 ms-2"
                        onClick={() => setShowSearch(!showSearch)}
                     >
                        <FontAwesomeIcon icon={faSearchPlus} />
                     </Button>
                  </OverlayTrigger>
               </Navbar.Text>

               {/* <Navbar.Toggle onClick={() => setShow(true)} />

               <Navbar.Offcanvas show={show} onHide={() => setShow(false)}>
                  <Offcanvas.Header closeButton onClick={() => setShow(false)}>
                     <Offcanvas.Title>MaziStore Administration</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                     <NavDropdown title="Catalog Menu" className="h5">
                        <NavDropdown.Item onClick={() => navigate("products")}>
                           <span onClick={() => setShow(false)}>Products</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                           onClick={() => navigate("categories")}
                        >
                           <span onClick={() => setShow(false)}>
                              Categories
                           </span>
                        </NavDropdown.Item>
                     </NavDropdown>
                  </Offcanvas.Body>
               </Navbar.Offcanvas> */}
            </Container>
         </Navbar>
      </>
   );
};

export default AdminNavigation;
