import { FC, Fragment, useEffect, useState } from "react";
import { T_ProductThumbnail } from "../../types/CatalogTypes";
import { Button, Card, Modal } from "react-bootstrap";
import { getImage } from "../../webApis/CoreWebApi";
import StarRating from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faAdd, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons/faArrowTrendDown";

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
                     <h4>{product.name}</h4>
                  </Card.Title>
                  <div className="row mt-3">
                     <div className="col-auto">
                        <div
                           style={{
                              fontSize: "10px",
                              textDecoration: "line-through",
                              color: "#999",
                           }}
                        >
                           {product.calculatedProductPrice.oldPriceString}
                        </div>
                        <h5 className="text-primary">
                           {product.calculatedProductPrice.priceString}
                        </h5>
                     </div>

                     <div className="col-auto mt-2 mx-1 text-center">
                        {product.calculatedProductPrice.percentOfSaving > 0 && (
                           <strong className="border border-success border-2 p-1 text-success">
                              {product.calculatedProductPrice.percentOfSaving}
                              %
                              <FontAwesomeIcon
                                 icon={faArrowDown}
                                 className="ps-2"
                              />
                              <br />
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
