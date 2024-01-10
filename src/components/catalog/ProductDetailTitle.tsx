import { FC, useState } from "react";
import { T_ProductDetail } from "../../types/CatalogTypes";
import { Link } from "react-router-dom";
import StarRating from "react-star-ratings";
import ProductVariationAttrs from "./ProductVariationAttrs";
import ProductPrices from "./ProductPrices";
import { Modal } from "react-bootstrap";

type T_Props = { product: T_ProductDetail };

const ProductDetailTitle: FC<T_Props> = ({ product }) => {
   const [dev, setDev] = useState(false);

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            DEV: ProductDetailTitle.tsx [JSON]
         </div>
         <h2>{product?.name}</h2>
         {product?.brand && (
            <Link to={`/brand/${product.brand.slug}`} className="h4">
               {product.brand.name}
            </Link>
         )}
         <hr />

         <div className="row align-items-start">
            <div className="col-auto">
               <StarRating
                  starDimension="20px"
                  starSpacing="3px"
                  rating={product.ratingAverage ?? 0}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
               />
            </div>
            {product.reviewsCount > 0 && (
               <div className="col-auto h5">
                  {product.reviewsCount}
                  {"  "} review
                  {product.reviewsCount > 1 && "s"}
               </div>
            )}
            <div className="col h5">
               <Link to={`/addreview/${product.id}`}>Add a Review</Link>
            </div>
         </div>

         <br />

         <div
            dangerouslySetInnerHTML={{
               __html: product.shortDescription,
            }}
         />

         <div>
            {product.hasVariation ? (
               <ProductVariationAttrs
                  availableOptions={product.availableOptions}
                  variations={product.variations}
               />
            ) : (
               <div>
                  product has no variations
                  <ProductPrices pending={false} product={product} />
               </div>
            )}
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetailTitle.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(product, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default ProductDetailTitle;
