import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../webApis/CatalogWebApi";
import {
   T_MediaViewModel,
   T_ProductDetail,
   T_ProductDetailOption,
} from "../../types/CatalogTypes";
import { getImage } from "../../webApis/CoreWebApi";
import StarRating from "react-star-ratings";
import ProductVariationAttrs from "./ProductVariationAttrs";

const ProductDetails = () => {
   const [details, setDetails] = useState<T_ProductDetail | null>(null);
   const [images, setImages] = useState<Blob[] | null>(null);

   const param = useParams();
   const navigate = useNavigate();

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
               <h4>ProductDetails {param.id}</h4>
               <div className="row">
                  <div className="col-6">
                     {images && (
                        <img
                           src={URL.createObjectURL(images[0])}
                           className="w-100"
                        />
                     )}
                  </div>

                  <div className="col-6">
                     <h2>{details?.name}</h2>
                     {details?.brand && (
                        <Link
                           to={`/brand/${details.brand.slug}`}
                           className="h4"
                        >
                           {details.brand.name}
                        </Link>
                     )}
                     <hr />

                     {details.ratingAverage && details.ratingAverage > 0 && (
                        <div className="row align-items-start">
                           <div className="col-auto">
                              <StarRating
                                 starDimension="20px"
                                 starSpacing="3px"
                                 rating={details.ratingAverage}
                                 starRatedColor="green"
                                 numberOfStars={5}
                                 name="rating"
                              />
                           </div>
                           <div className="col-auto h5">
                              {details.reviewsCount}
                              {"  "} review
                              {details.reviewsCount > 1 && "s"}
                           </div>{" "}
                           <div className="col h5">
                              <Link to={`/addreview/${details.id}`}>
                                 Add a Review
                              </Link>
                           </div>
                        </div>
                     )}
                     <br />

                     <div
                        dangerouslySetInnerHTML={{
                           __html: details.shortDescription,
                        }}
                     />

                     <br />
                     <div>
                        {details.hasVariation && (
                           <ProductVariationAttrs
                              variations={details.availableOptions}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
         <div className="small">
            <pre>{JSON.stringify(details, null, 3)}</pre>
         </div>
      </div>
   );
};

export default ProductDetails;
