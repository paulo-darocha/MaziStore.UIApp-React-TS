import { faHomeAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Nav, NavItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkIfLogged } from "../../webApis/AuthWebApi";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { loginRedux } from "../../redux-store/loggedReducer";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { setItemsCount } from "../../redux-store/cartItemsReducer";
import { setUsername } from "../../redux-store/userNameReducer";

const Navigation = () => {
   const navigate = useNavigate();
   const count = useAppSelector((x) => x.items);
   const loggedInRedux = useAppSelector((x) => x.logged);
   const username = useAppSelector((x) => x.username);
   const dispatch = useAppDispatch();

   useEffect(() => {
      checkIfLogged().then((res) => {
         if (res.logged) {
            dispatch(loginRedux(res));
            dispatch(setUsername(res.user.fullName));
         } else {
            dispatch(setUsername(""));
         }
      });
      getCartItemsCount().then((res) => dispatch(setItemsCount(res)));
   }, [dispatch]);

   useEffect(() => {}, [loggedInRedux]);

   return (
      <div>
         <div style={{ backgroundColor: "aliceblue" }}>
            <Nav>
               <Nav.Item className="p-3">
                  <Button onClick={() => navigate("/")}>
                     <FontAwesomeIcon icon={faHomeAlt} />
                     <strong className="ps-2">MaziStore</strong>
                  </Button>
               </Nav.Item>

               <Nav.Item className="py-3">
                  <Button
                     variant="outline-primary"
                     onClick={() => navigate("/about")}
                  >
                     About
                  </Button>
               </Nav.Item>

               <Nav.Item className="p-3">
                  <Button
                     variant="outline-primary"
                     onClick={() => navigate("/comment")}
                  >
                     Leave a comment
                  </Button>
               </Nav.Item>

               <Nav.Item className="p-3" style={{ marginLeft: "auto" }}>
                  <Button
                     variant="outline-primary"
                     className="position-relative"
                     onClick={() => navigate("/cart")}
                  >
                     <FontAwesomeIcon icon={faShoppingCart} />
                     {count > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                           {count}
                        </span>
                     )}
                  </Button>
               </Nav.Item>

               {!loggedInRedux ? (
                  <>
                     <Nav.Item className="py-3">
                        <Button
                           variant="outline-primary"
                           onClick={() => navigate("/login")}
                        >
                           Login
                        </Button>
                     </Nav.Item>
                     <Nav.Item className="p-3">
                        <Button
                           variant="outline-primary"
                           onClick={() => navigate("/register")}
                        >
                           Register
                        </Button>
                     </Nav.Item>
                  </>
               ) : (
                  <Dropdown as={NavItem} className="ps-0 p-3">
                     <Dropdown.Toggle variant="outline-primary">
                        <span className="h6 px-3">{username}</span>
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <Dropdown.Item
                           onClick={() => navigate("/logout")}
                           className="text-center"
                        >
                           Logout
                           <hr className="my-1" />
                        </Dropdown.Item>
                        <Dropdown.Item
                           onClick={() => navigate("/profile")}
                           className="text-center"
                        >
                           MyProfile
                           <hr className="my-1" />
                        </Dropdown.Item>
                        <Dropdown.Item
                           onClick={() => navigate("profile/orders")}
                           className="text-center"
                        >
                           MyOrders
                           <hr className="my-1" />
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               )}
            </Nav>
         </div>
      </div>
   );
};

export default Navigation;
