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

               <Nav.Item className="p-3">
                  <Button>About</Button>
               </Nav.Item>

               <Nav.Item className="p-3" style={{ marginLeft: "auto" }}>
                  <Button className="position-relative">
                     <FontAwesomeIcon icon={faShoppingCart} />
                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                     </span>
                  </Button>
               </Nav.Item>
            </Nav>
         </div>
      </div>
   );
};

export default Navigation;
