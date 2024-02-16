import { useEffect, useState } from "react";
import useCategoriesApi from "../../../admin-hooks/useCategoriesApi";
import { T_CategoryListItem } from "../../../admin-types/CategoryAdmTypes";
import { useAppSelector } from "../../../../redux-store/reduxStore";
import { Button, Modal } from "react-bootstrap";
import useProductsHook from "../../../admin-hooks/useProductsHook";
import {
   T_ProductForm,
   T_ProductVm,
} from "../../../admin-types/CatalogAdmTypes";

const ProductCategory = () => {
   const [dev, setDev] = useState(false);
   const [categories, setCategories] = useState<
      T_CategoryListItem[] | undefined
   >();
   const [category, setCategory] = useState<number | undefined>();
   const editingProduct = useAppSelector((x) => x.editingProduct);
   const { updateProductRepo } = useProductsHook();

   useEffect(() => {
      if (
         editingProduct &&
         editingProduct.categoryIds &&
         editingProduct.categoryIds.length > 0
      ) {
         const length = editingProduct.categoryIds.length;
         setCategory(editingProduct.categoryIds[length - 1]);
      }
   }, [editingProduct]);

   const { getCategoriesListRepo } = useCategoriesApi();

   useEffect(() => {
      getCategoriesListRepo().then((res) => setCategories(res));
   }, []);

   const isChecked = (i: number): boolean => {
      if (categories && categories.length > 0) {
         return categories[i].id == category;
      } else return false;
   };

   const saveProduct = () => {
      if (categories) {
         const index = categories?.findIndex((x) => x.id == category);
         const product: T_ProductVm = { ...editingProduct, categoryIds: [] };
         product.categoryIds.push(category!);
         if (categories[index!].parentId != null) {
            product.categoryIds.push(categories[index].parentId!);
         }
         const data: T_ProductForm = { product: product };
         updateProductRepo(data).then(() => {});
      }
   };

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: ProductCategory.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>

         <div className="row">
            <div className="col-4">
               {categories &&
                  categories.length > 0 &&
                  categories.map((x, i) => (
                     <div className="form-check m-3">
                        <input
                           className="form-check-input checked"
                           type="checkbox"
                           value={x.id}
                           id="flexCheckChecked"
                           style={{ transform: "scale(1.3)" }}
                           onChange={(e) => setCategory(Number(e.target.value))}
                           checked={isChecked(i)}
                        />
                        <label
                           className="ms-2 form-check-label"
                           htmlFor="flexCheckChecked"
                        >
                           {x.name}
                        </label>
                     </div>
                  ))}
            </div>
            <div className="col-2 mt-3">
               <div className="d-grid gap-2">
                  <Button variant="outline-primary" onClick={saveProduct}>
                     Save
                  </Button>
                  <Button variant="outline-secondary">Cancel</Button>
               </div>
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductCategory.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(categories, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductCategory;
