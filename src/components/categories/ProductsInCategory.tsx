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
import CategoriesMenu from "./CategoriesMenu";

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
      <div className="container-xxl">
         <CategoriesMenu />
         <div
            className="row"
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [ ProductsInCategory - JSON ]
         </div>

         <div>
            <span className="h4">
               Products in '{category?.categoryName}' category:
            </span>
         </div>

         <div className="row">
            <div className="col-sm-3 mt-2">
               <span className="badge bg-success">
                  <span className="h6">{category?.totalProduct} results</span>
               </span>
               {category && <CategoriesOptions category={category} />}
            </div>

            <div className="col-sm-9">
               <div>
                  <div className="row text-center">
                     {category?.products.map((product: T_ProductThumbnail) => (
                        <div
                           className="col-lg-3 col-md-4 col-6 my-3"
                           key={product.id}
                        >
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
