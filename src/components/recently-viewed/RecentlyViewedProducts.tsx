import { FC, useEffect, useState } from "react";
import { T_ProductThumbnail } from "../../types/CatalogTypes";
import { getRecentlyViewedProducts } from "../../webApis/RecentlyViewedWebApi";
import { T_ProductsRecentlyViewedVm } from "../../types/RecentlyViewedTypes";
import ProductThumbnail from "../catalog/ProductThumbnail";
import { Modal } from "react-bootstrap";

type T_Props = { productId: number };

const RecentlyViewedProducts: FC<T_Props> = ({ productId }) => {
   const [products, setProduct] = useState<T_ProductThumbnail[] | null>(null);
   const [dev, setDev] = useState(false);

   useEffect(() => {
      const data: T_ProductsRecentlyViewedVm = {
         productId: productId,
         itemCount: 4,
      };
      getRecentlyViewedProducts(data).then((res) => setProduct(res));
   }, [productId]);

   return (
      <div>
         <h3 className="my-3">Recently Viewed Products</h3>
         <div
            style={{ fontSize: "10px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: RecentlyViewedProducts [JSON]
         </div>
         <div className="row">
            {products?.map((product: T_ProductThumbnail) => (
               <div className="col-3" key={product.id}>
                  <ProductThumbnail product={product} />
               </div>
            ))}
         </div>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>
                  RecentlyViewedProducts.tsx
               </Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(products, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default RecentlyViewedProducts;
