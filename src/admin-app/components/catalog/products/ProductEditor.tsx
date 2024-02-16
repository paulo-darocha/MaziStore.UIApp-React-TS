import { useEffect, useState } from "react";
import {
   NavLink,
   Route,
   Routes,
   useNavigate,
   useParams,
} from "react-router-dom";
import { Modal } from "react-bootstrap";
import ProdEditGeneral from "./ProdEditGeneral";
import ProdEditVariations from "./ProdEditVariations";
import ProdEditAttr from "./ProdAttributes";
import { useAppDispatch } from "../../../../redux-store/reduxStore";
import useProductsHook from "../../../admin-hooks/useProductsHook";
import { addEditingProduct } from "../../../reducers/editingProductReducer";
import { T_ProductVm } from "../../../admin-types/CatalogAdmTypes";
import ProductCategory from "./ProductCategory";

const ProductEditor = () => {
   const [dev, setDev] = useState(false);
   const params = useParams();
   const navigate = useNavigate();
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

   useEffect(() => {
      navigate("1");
   }, []);

   const getStyles = (active: boolean) => {
      return `nav-link border border-primary border-2 border-bottom-0 mx-1 h6 ${
         active && "active bg-primary text-white"
      }`;
   };

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: ProductEditor.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>
         <div>ProductEditor</div>

         <div className="nav nav-tabs">
            <NavLink to="1" className={({ isActive }) => getStyles(isActive)}>
               General Informations
            </NavLink>

            <NavLink to="2" className={({ isActive }) => getStyles(isActive)}>
               Product Variations
            </NavLink>

            <NavLink to="3" className={({ isActive }) => getStyles(isActive)}>
               Product Attributes
            </NavLink>

            <NavLink to="4" className={({ isActive }) => getStyles(isActive)}>
               Product Category
            </NavLink>
         </div>

         {/* ******************************************************************* */}

         <div className="border-top border-primary border-1">
            <Routes>
               <Route path="1" element={<ProdEditGeneral />} />
               <Route path="2" element={<ProdEditVariations />} />
               <Route path="3" element={<ProdEditAttr />} />
               <Route path="4" element={<ProductCategory />} />
            </Routes>
         </div>

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
