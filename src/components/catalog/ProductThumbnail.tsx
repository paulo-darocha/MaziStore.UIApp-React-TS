import { FC, Fragment, useEffect, useState } from "react";
import { T_ProductThumbnail } from "../../types/CatalogTypes";
import { Button, Card, Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import StarRating from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

type T_Props = { product: T_ProductThumbnail };

const ProductThumbnail: FC<T_Props> = ({ product }) => {
   const [image, setImage] = useState<Blob | null>(null);
   const [dev, setDev] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      getImage(product.thumbnailUrl).then((res) => setImage(res));
   }, [product]);

   return (
      <>
         <div className="d-flex h-100 my-1">
            <Card
               onClick={() => navigate(`/product/${product.id}`)}
               style={{ cursor: "pointer" }}
            >
               {image && (
                  <Fragment>
                     <Card.Img src={URL.createObjectURL(image)} />
                     <Card.ImgOverlay className="text-end">
                        <Button variant="outline-secondary" size="lg">
                           <FontAwesomeIcon icon={faAdd} />
                           <FontAwesomeIcon icon={faShoppingCart} />
                        </Button>
                     </Card.ImgOverlay>
                  </Fragment>
               )}
               <Card.Body>
                  <Card.Title>
                     <span className="h5">{product.name}</span>
                  </Card.Title>
                  <Card.Subtitle>
                     <div className="row pt-2">
                        <div className="col-auto">
                           {product.calculatedProductPrice.priceString}
                        </div>
                        <div className="col-5 text-danger text-decoration-line-through small">
                           {product.calculatedProductPrice.oldPriceString}
                        </div>
                        <div className="mt-2 mx-1 text-center row">
                           {product.calculatedProductPrice.percentOfSaving >
                              0 && (
                              <strong className="border border-success border-2 p-1 text-success">
                                 save{" "}
                                 {
                                    product.calculatedProductPrice
                                       .percentOfSaving
                                 }
                                 %
                              </strong>
                           )}
                        </div>
                     </div>

                     <div className="row mt-2">
                        <span className="col-auto">
                           <StarRating
                              starDimension="15px"
                              starSpacing="2px"
                              starRatedColor="green"
                              rating={product.ratingAverage ?? 0}
                              numberOfStars={5}
                              name="rating"
                           />
                        </span>
                        {product.reviewsCount > 0 && (
                           <div className="col-auto mt-1">
                              {product.reviewsCount} review
                              {product.reviewsCount > 1 && "s"}
                           </div>
                        )}
                     </div>
                  </Card.Subtitle>
               </Card.Body>
            </Card>
         </div>

         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [DEV: ProductThumbnail - JSON]
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductThumbnail.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(product, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ProductThumbnail;
