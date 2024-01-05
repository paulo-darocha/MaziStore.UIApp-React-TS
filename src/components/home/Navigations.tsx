import { faHomeAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
   const navigate = useNavigate();

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
                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                     </span>
                  </Button>
               </Nav.Item>
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
            </Nav>
         </div>
      </div>
   );
};

export default Navigation;
