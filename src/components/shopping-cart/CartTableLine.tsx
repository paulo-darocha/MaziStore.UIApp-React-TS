import { FC, useEffect, useState } from "react";
import {
   T_CartItemVm,
   T_ProductVariationOption,
} from "../../types/ShoppingCartTypes";
import { getImage } from "../../webApis/CoreWebApi";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { T_Update } from "./CartList";

type T_Props = {
   item: T_CartItemVm;
   update: (id: number, qtde: number, action: T_Update) => void;
};

const CartTableLine: FC<T_Props> = ({ item, update }) => {
   const [image, setImage] = useState<Blob | null>(null);

   useEffect(() => {
      getImage(item.productImage).then((res) => setImage(res));
   }, [item]);

   return (
      <tr>
         <td>
            {image && (
               <img
                  src={URL.createObjectURL(image)}
                  style={{ maxWidth: "25vh" }}
               />
            )}
         </td>
         <td>
            <h4>{item.productName}</h4>
            <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
               {item.variationOptions.map((opt: T_ProductVariationOption) => (
                  <li key={opt.value}>
                     <strong>{opt.optionName}</strong>: {opt.value}
                  </li>
               ))}
            </ul>
            {!item.isProductAvailabeToOrder && (
               <div className="text-warning h6">Not available anymore</div>
            )}
            {item.productStockTrackingIsEnabled &&
               item.productStockQuantity < item.quantity && (
                  <div className="text-warning h6">
                     Not enough stock available
                  </div>
               )}
         </td>
         <td>
            <div style={{ marginTop: "20px" }}>
               <strong>{item.productPriceString}</strong>
            </div>
         </td>
         <td>
            <ButtonGroup size="sm" className="mt-3">
               <Button
                  variant="outline-dark"
                  onClick={() => update(item.id, item.quantity, "sub")}
               >
                  -
               </Button>
               <Button variant="outline-dark" disabled>
                  <strong>{item.quantity}</strong>
               </Button>
               <Button
                  variant="outline-dark"
                  onClick={() => update(item.id, item.quantity, "add")}
               >
                  +
               </Button>
            </ButtonGroup>
         </td>
         <td>
            <Button
               variant="outline-danger"
               className="py-1 mt-3"
               onClick={() => update(item.id, item.quantity, "del")}
            >
               <FontAwesomeIcon icon={faTrashCan} />
            </Button>
         </td>
      </tr>
   );
};

export default CartTableLine;
