import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../webApis/CatalogWebApi";
import { T_MediaViewModel, T_ProductDetail } from "../../types/CatalogTypes";
import { getImage } from "../../webApis/CoreWebApi";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";
import ProductDetailTitle from "./ProductDetailTitle";
import RecentlyViewedProducts from "../recently-viewed/RecentlyViewedProducts";
import { Modal } from "react-bootstrap";

const ProductDetails = () => {
   const [details, setDetails] = useState<T_ProductDetail | null>(null);
   const [images, setImages] = useState<Blob[] | null>(null);
   const [dev, setDev] = useState(false);

   const param = useParams();

   useEffect(() => {
      const id = Number(param.id);
      if (id > 0) {
         getProductDetails(id).then((res) => setDetails(res));
      }
   }, [param]);

   useEffect(() => {
      if (details) {
         const getDetailImages = async () => {
            const images = details.images.map((image: T_MediaViewModel) =>
               getImage(image.thumbnailUrl)
            );
            return Promise.all(images);
         };
         getDetailImages().then((res) => setImages(res));
      }
   }, [details]);

   return (
      <div>
         {details && (
            <div>
               <div
                  style={{ fontSize: "9px", cursor: "pointer" }}
                  onClick={() => setDev(true)}
               >
                  [ProductDetails - JSON]
               </div>
               <div className="row">
                  <div className="col-sm-6">
                     {images && (
                        <img
                           src={URL.createObjectURL(images[0])}
                           className="w-100"
                        />
                     )}
                  </div>

                  <div className="col-sm-6">
                     <ProductDetailTitle product={details} />
                  </div>
               </div>

               <div className="row text-start">
                  <ProductDescription product={details} />
               </div>

               <div className="h5 text-secondary">
                  <RelatedProducts />
               </div>

               <div>
                  <RecentlyViewedProducts productId={details.id} />
               </div>
            </div>
         )}

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetails.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(details, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductDetails;
