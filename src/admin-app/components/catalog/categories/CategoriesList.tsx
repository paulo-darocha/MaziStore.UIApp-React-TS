import { useEffect, useState } from "react";
import useCategoriesApi from "../../../admin-hooks/useCategoriesApi";
import { T_CategoryListItem } from "../../../admin-types/CategoryAdmTypes";
import { Button, Modal } from "react-bootstrap";
import CategoriesTable from "./CategoriesTable";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
   const [dev, setDev] = useState(false);
   const [categories, setCategories] = useState<
      T_CategoryListItem[] | undefined
   >();
   const navigate = useNavigate();
   const { getCategoriesListRepo } = useCategoriesApi();

   useEffect(() => {
      getCategoriesListRepo().then((res) => setCategories(res));
   }, []);

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: CategoriesList.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <div>
            CategoriesList
            <Button className="float-end" onClick={() => navigate("edit/0")}>
               Create Category
            </Button>
         </div>

         <div>{categories && <CategoriesTable categories={categories} />}</div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CategoriesList.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(categories, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CategoriesList;
