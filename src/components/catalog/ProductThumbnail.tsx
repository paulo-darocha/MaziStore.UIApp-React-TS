import { FC, useEffect, useState } from "react";
import { T_ProductThumbnail } from "../../types/CatalogTypes";
import { Button, Card } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import StarRating from "react-star-ratings";
import { useNavigate } from "react-router-dom";

type T_Props = { product: T_ProductThumbnail };

const ProductThumbnail: FC<T_Props> = ({ product }) => {
   const [image, setImage] = useState<Blob | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      getImage(product.thumbnailUrl).then((res) => setImage(res));
   }, [product]);

   return (
      <div className="d-flex h-100">
         <Card
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
         >
            {image && <Card.Img src={URL.createObjectURL(image)} />}
            <Card.Body>
               <Card.Title>
                  <span className="h5">{product.name}</span>
               </Card.Title>
               <Card.Subtitle>
                  <br />
                  <span className="m-2">
                     {" "}
                     {product.calculatedProductPrice.priceString}
                  </span>
                  {product.calculatedProductPrice.percentOfSaving > 0 && (
                     <>
                        <Button
                           disabled
                           variant="outline-success"
                           className="mx-2 text-success py-1"
                        >
                           <strong>
                              save{" "}
                              {product.calculatedProductPrice.percentOfSaving}%
                           </strong>
                        </Button>
                        <div>
                           <span
                              style={{
                                 textDecoration: "line-through",
                                 color: "red",
                                 fontSize: ".7em",
                                 marginLeft: "10px",
                              }}
                           >
                              {product.calculatedProductPrice.oldPriceString}
                           </span>
                        </div>
                     </>
                  )}
                  <div className="row">
                     {product.reviewsCount > 0 && (
                        <div className="mt-2">
                           <span className="col-auto">
                              <StarRating
                                 starDimension="18px"
                                 starSpacing="2px"
                                 starRatedColor="green"
                                 rating={product.ratingAverage}
                                 numberOfStars={5}
                                 name="rating"
                              />
                           </span>
                           <span className="col-auto m-3">
                              {product.reviewsCount} review
                              {product.reviewsCount > 1 && "s"}
                           </span>
                        </div>
                     )}
                  </div>
               </Card.Subtitle>
            </Card.Body>
         </Card>
      </div>
   );
};

export default ProductThumbnail;
