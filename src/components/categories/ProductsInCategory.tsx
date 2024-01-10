import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../webApis/CategoriesWebApi";
import {
   T_ProductsByCategory,
   T_SearchOption,
} from "../../types/CategoriesTypes";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ProductThumbnail from "../catalog/ProductThumbnail";
import { T_ProductThumbnail } from "../../types/CatalogTypes";
import CategoriesOptions from "./CategoriesOptions";

const ProductsInCategory = () => {
   const [dev, setDev] = useState(false);
   const [category, setCategory] = useState<T_ProductsByCategory | null>(null);
   const param = useParams();

   useEffect(() => {
      const id = Number(param.id);

      if (id) {
         const data: T_SearchOption = { page: 0, pageSize: 0 };
         getProductsByCategory(data, id).then((res) => setCategory(res));
      }
   }, [param]);

   return (
      <div>
         <div
            className="row"
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [ ProductsInCategory - JSON ]
         </div>

         <div className="row">
            <div className="col-3">
               {category && <CategoriesOptions category={category} />}
            </div>
            <div className="col-9">
               <div>
                  <span className="h2">{category?.categoryName}</span>
                  <span className="badge bg-success ms-5">
                     <span className="h6">
                        {category?.totalProduct} results
                     </span>
                  </span>
               </div>
               <div>
                  <div className="row">
                     {category?.products.map((product: T_ProductThumbnail) => (
                        <div className="col-4 my-3" key={product.id}>
                           <ProductThumbnail product={product} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div>ProductsInCategory</div>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductsInCategory.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(category, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductsInCategory;
