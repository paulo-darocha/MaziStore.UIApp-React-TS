import { useEffect, useState } from "react";
import {
   NavLink,
   Route,
   Routes,
   useNavigate,
   useParams,
} from "react-router-dom";
import { T_CategoryForm } from "../../../admin-types/CategoryAdmTypes";
import useCategoriesApi from "../../../admin-hooks/useCategoriesApi";
import { Modal } from "react-bootstrap";
import CategoryEditGeneral from "./CategoryEditGeneral";
import ProductsInCategory from "./ProductsInCategory";

const CategoryEditor = () => {
   const [dev, setDev] = useState(false);
   const [category, setCategory] = useState<T_CategoryForm | undefined>();
   const params = useParams();
   const navigate = useNavigate();
   const { getCategoryByIdRepo } = useCategoriesApi();

   useEffect(() => {
      const id = Number(params.id);
      if (id && id > 0) {
         getCategoryByIdRepo(id).then((res) => {
            setCategory(res);
         });
      } else {
         navigate("1");
      }
   }, []);

   useEffect(() => {
      if (category) navigate("1", { state: { category: category } });
      // else navigate("1");
   }, [category]);

   const getStyles = (active: boolean) => {
      return `nav-link border border-primary border-2 border-bottom-0 mx-2 h6 ${
         active && "active bg-primary text-white"
      }`;
   };

   return (
      <div className="container">
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: EditCategory.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <div>Edit Category {params.id}</div>

         <div className="nav nav-tabs">
            <NavLink
               to="1"
               style={{ textDecoration: "none", fontSize: "1.1em" }}
               className={({ isActive }) => getStyles(isActive)}
            >
               General Information
            </NavLink>
            <NavLink
               to="2"
               style={{ textDecoration: "none", fontSize: "1.1em" }}
               className={({ isActive }) => getStyles(isActive)}
            >
               Products In Category
            </NavLink>
         </div>

         <div className="border-top border-primary border-1">
            <Routes>
               <Route
                  path="1"
                  element={<CategoryEditGeneral category={category} />}
               />
               <Route
                  path="2"
                  element={
                     <ProductsInCategory categoryId={category?.id ?? 0} />
                  }
               />
            </Routes>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CategoryEditor.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(category, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CategoryEditor;
