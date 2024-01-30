import { FC, Fragment, useState } from "react";
import { T_ProductListItem } from "../../admin-types/CatalogAdmTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCheck,
   faEdit,
   faPause,
   faTrash,
   faX,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewProduct from "./ViewProduct";

type T_Props = { item: T_ProductListItem };

const ProductRow: FC<T_Props> = ({ item }) => {
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

   const getIcon = (state: boolean) => {
      if (state) return <FontAwesomeIcon icon={faCheck} color="green" />;
      else return <FontAwesomeIcon icon={faX} size="xs" color="red" />;
   };

   return (
      <Fragment>
         <Modal show={show} onHide={() => setShow(false)}>
            <ViewProduct item={item} />
         </Modal>
         <tr>
            <td className="text-start">{item.name}</td>
            <td>{getIcon(item.hasOptions)}</td>
            <td>{item.stockQuantity}</td>
            <td>{new Date(item.createdOn).toLocaleString()}</td>
            <td>
               <Button
                  size="sm"
                  variant="outline-dark"
                  className="mx-1"
                  onClick={() => setShow(true)}
               >
                  View
               </Button>
            </td>
            <td>
               <Button variant="outline-primary" size="sm" className="mx-1">
                  <FontAwesomeIcon icon={faPause} />
               </Button>
               <Button
                  variant="outline-success"
                  size="sm"
                  className="mx-1"
                  onClick={() => navigate(`edit/${item.id}`)}
               >
                  <FontAwesomeIcon icon={faEdit} />
               </Button>
               <Button variant="outline-danger" size="sm" className="mx-1">
                  <FontAwesomeIcon icon={faTrash} />
               </Button>
            </td>
         </tr>
      </Fragment>
   );
};

export default ProductRow;
