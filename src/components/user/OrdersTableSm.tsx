import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { T_OrderHistoryListItem } from "../../types/AuthTypes";
import { FC, Fragment } from "react";

type T_Props = { orders: T_OrderHistoryListItem[]; images: Blob[] };

const OrdersTableSm: FC<T_Props> = ({ orders, images }) => {
   const navigate = useNavigate();
   let i = 0;

   return (
      <table className="table table-sm">
         <thead>
            <tr>
               <th>Order Id</th>
               <th>Date</th>
               <th>Status</th>
            </tr>
         </thead>
         <tbody>
            {orders &&
               orders.map((order) => (
                  <Fragment key={order.id}>
                     <tr>
                        <td>
                           <Button
                              variant="outline-primary"
                              onClick={() =>
                                 navigate(`/profile/order/${order.id}`)
                              }
                           >
                              <small>ORDER #{order.id}</small>
                           </Button>
                        </td>
                        <td>{new Date(order.createdOn).toLocaleString()}</td>
                        <td>{order.orderStatus}</td>
                     </tr>

                     <tr>
                        <th colSpan={3}>Products</th>
                     </tr>

                     {order.orderItems.map((item) => (
                        <tr key={`${order.id}-${item.productId}`}>
                           <td>
                              {images && images.length > 0 && (
                                 <img
                                    src={URL.createObjectURL(images[i++])}
                                    style={{ maxWidth: "13vh" }}
                                 />
                              )}
                           </td>
                           <td>{item.productName}</td>
                           <td>
                              <small>qtde:</small> {item.quantity}
                           </td>
                        </tr>
                     ))}

                     <tr
                        className="text-end"
                        style={{
                           borderBottom: "3px solid #bbb",
                           marginBottom: "50px",
                        }}
                     >
                        <td>
                           <strong>Total:</strong>
                        </td>
                        <td colSpan={2}>{order.subTotalString}</td>
                     </tr>
                  </Fragment>
               ))}
         </tbody>
      </table>
   );
};

export default OrdersTableSm;
