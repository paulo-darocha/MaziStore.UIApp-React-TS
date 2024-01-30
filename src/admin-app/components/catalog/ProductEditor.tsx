import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { Modal, Nav } from "react-bootstrap";
import ProdEditGeneral from "./ProdEditGeneral";
import ProdEditVariations from "./ProdEditVariations";
import ProdEditAttr from "./ProdAttributes";
import { useAppDispatch } from "../../../redux-store/reduxStore";
import useProductsHook from "../../admin-hooks/useProductsHook";
import { addEditingProduct } from "../../reducers/editingProductReducer";
import { T_ProductVm } from "../../admin-types/CatalogAdmTypes";

const ProductEditor = () => {
   const [dev, setDev] = useState(false);
   const params = useParams();
   const dispatch = useAppDispatch();
   const { getProductByIdRepo } = useProductsHook();

   useEffect(() => {
      console.log(params);
      const id = Number(params.id);
      if (id && id > 0) {
         getProductByIdRepo(id).then((res) => {
            if (res) dispatch(addEditingProduct(res));
         });
      }

      return () => {
         dispatch(addEditingProduct({} as T_ProductVm));
      };
   }, [params]);

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: ProductEditor.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>
         <div>ProductEditor</div>

         <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
               <Nav.Link eventKey="link-1">
                  <NavLink
                     to="part1"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                     className={({ isActive }) =>
                        `nav-link ${
                           isActive ? "active bg-primary text-white" : ""
                        }`
                     }
                  >
                     General Informations
                  </NavLink>
               </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link eventKey="link-2">
                  <NavLink
                     to="part2"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                     className={({ isActive }) =>
                        `nav-link ${
                           isActive ? "active bg-primary text-white" : ""
                        }`
                     }
                  >
                     Product Variations
                  </NavLink>
               </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link eventKey="link-3">
                  <NavLink
                     to="part3"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                     className={({ isActive }) =>
                        `nav-link ${
                           isActive ? "active bg-primary text-white" : ""
                        }`
                     }
                  >
                     Product Attributess
                  </NavLink>
               </Nav.Link>
            </Nav.Item>
         </Nav>

         <Routes>
            <Route path="part1" element={<ProdEditGeneral />} />
            <Route path="part2" element={<ProdEditVariations />} />
            <Route path="part3" element={<ProdEditAttr />} />
            <Route path="*" element={<ProdEditGeneral />} />
         </Routes>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductEditor.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify({ id: params.id }, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductEditor;
