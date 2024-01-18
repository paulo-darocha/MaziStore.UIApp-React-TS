import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { T_ProductVm } from "../../types/CatalogAdmTypes";
import useProducts from "../../hooks/useProducts";
import { Modal, Nav } from "react-bootstrap";
import ProdEditGeneral from "./ProdEditGeneral";
import ProdEditVariations from "./ProdEditVariations";
import ProdEditAttr from "./ProdEditAttr";

const ProductEditor = () => {
   const [dev, setDev] = useState(false);
   const [product, setProduct] = useState<T_ProductVm | undefined>();
   const { getProductByIdRepo } = useProducts();
   const params = useParams();

   useEffect(() => {
      const id = Number(params.id);
      if (id > 0) getProductByIdRepo(id).then((res) => setProduct(res));
   }, [params]);

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: ProductEditor.tsx [JSON]
         </div>
         <div>ProductEditor</div>

         <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
               <Nav.Link eventKey="link-1">
                  <Link
                     to="part1"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                  >
                     General Informations
                  </Link>
               </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link eventKey="link-2">
                  <Link
                     to="part2"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                  >
                     Product Variations
                  </Link>
               </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link eventKey="link-3">
                  <Link
                     to="part3"
                     style={{ textDecoration: "none", fontSize: "1.1em" }}
                  >
                     Product Attributess
                  </Link>
               </Nav.Link>
            </Nav.Item>
         </Nav>

         {product && (
            <Routes>
               <Route
                  path="part1"
                  element={<ProdEditGeneral product={product} />}
               />
               <Route path="part2" element={<ProdEditVariations />} />
               <Route path="part3" element={<ProdEditAttr />} />
               <Route path="*" element={<ProdEditAttr />} />
            </Routes>
         )}

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetailPricing.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(product, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductEditor;
