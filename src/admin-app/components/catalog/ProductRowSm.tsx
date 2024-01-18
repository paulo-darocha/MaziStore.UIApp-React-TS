import { FC, Fragment, useState } from "react";
import { T_ProductListItem } from "../../types/CatalogAdmTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPause, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewProduct from "./ViewProduct";

type T_Props = { item: T_ProductListItem };

const ProductRowSm: FC<T_Props> = ({ item }) => {
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

   return (
      <Fragment>
         <Modal show={show} onHide={() => setShow(false)}>
            <ViewProduct item={item} />
         </Modal>
         <tr>
            <td className="text-start">{item.name}</td>
            <td className="d-none d-sm-block">{item.stockQuantity}</td>
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
            <td className="d-none d-sm-block">
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

export default ProductRowSm;
