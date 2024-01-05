import { useEffect, useState } from "react";
import { T_CategoryMenuItem } from "../../types/CategoriesTypes";
import { getCategoriesForMenu } from "../../webApis/CategoriesWebApi";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const CategoriesMenu = () => {
   const [categories, setCategories] = useState<T_CategoryMenuItem[] | null>(
      null
   );
   const [dev, setDev] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      getCategoriesForMenu().then((res) => setCategories(res));
   }, []);

   return (
      <div className="container-fluid">
         <div
            className="row"
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [ CategoriesMenu - JSON ]
         </div>
         <div className="row">
            <Nav>
               <Nav.Item>
                  <Nav.Link>All</Nav.Link>
               </Nav.Item>
               {categories &&
                  categories.map((category: T_CategoryMenuItem) => (
                     <>
                        {category.childItems.length > 0 ? (
                           <NavDropdown title={`${category.name}`}>
                              {category.childItems.map(
                                 (child: T_CategoryMenuItem) => (
                                    <NavDropdown.Item
                                       key={`${child.name}`}
                                       onClick={() =>
                                          navigate(`/category/${category.id}`)
                                       }
                                    >
                                       {child.name}
                                    </NavDropdown.Item>
                                 )
                              )}{" "}
                           </NavDropdown>
                        ) : (
                           <Nav.Item
                              key={`${category.name}`}
                              onClick={() =>
                                 navigate(`/category/${category.id}`)
                              }
                           >
                              <Nav.Link>{category.name}</Nav.Link>
                           </Nav.Item>
                        )}
                     </>
                  ))}
            </Nav>
         </div>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CategoriesMenu.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(categories, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CategoriesMenu;
