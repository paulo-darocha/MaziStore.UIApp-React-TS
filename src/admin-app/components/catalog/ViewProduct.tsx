import { FC } from "react";
import { T_ProductListItem } from "../../types/CatalogAdmTypes";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCheck,
   faEdit,
   faPause,
   faTrash,
   faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type T_Props = { item: T_ProductListItem };

const ViewProduct: FC<T_Props> = ({ item }) => {
   const navigate = useNavigate();

   const getIcon = (state: boolean) => {
      if (state) return <FontAwesomeIcon icon={faCheck} color="green" />;
      else return <FontAwesomeIcon icon={faX} size="xs" color="red" />;
   };

   return (
      <Modal.Body>
         <Modal.Header closeButton>
            <span className="h5">{item.name}</span>{" "}
            <Button variant="outline-primary" className="ms-auto px-3 me-1">
               <FontAwesomeIcon icon={faPause} />
            </Button>
            <Button
               variant="outline-success"
               className="mx-1"
               onClick={() => navigate(`edit/${item.id}`)}
            >
               <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button variant="outline-danger" className="mx-1">
               <FontAwesomeIcon icon={faTrash} />
            </Button>
         </Modal.Header>
         <br />
         <div>
            <dl className="row">
               <dt className="offset-2 col-6">Has Options</dt>
               <dd className="col-auto">{getIcon(item.hasOptions)}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Is Visible Individually</dt>
               <dd className="col-auto">
                  {getIcon(item.isVisibleIndividually)}
               </dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Is Featured</dt>
               <dd className="col-auto">{getIcon(item.isFeatured)}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Is Allow To Order</dt>
               <dd className="col-auto">{getIcon(item.isAllowToOrder)}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Is Call For Pricing</dt>
               <dd className="col-auto">{getIcon(item.isCallForPricing)}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Stock Quantity</dt>
               <dd className="col-auto">{item.stockQuantity}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Is Publishedy</dt>
               <dd className="col-auto">{getIcon(item.isPublished)}</dd>
            </dl>

            <dl className="row">
               <dt className="offset-2 col-6">Created On</dt>
               <dd className="col-auto">
                  {new Date(item.createdOn).toLocaleDateString()}
                  <br />
                  {new Date(item.createdOn).toLocaleTimeString()}
               </dd>
            </dl>
         </div>
      </Modal.Body>
   );
};

export default ViewProduct;
