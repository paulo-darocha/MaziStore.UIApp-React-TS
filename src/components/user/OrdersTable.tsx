import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { T_OrderHistoryListItem } from "../../types/AuthTypes";
import { FC } from "react";

type T_Props = { orders: T_OrderHistoryListItem[]; images: Blob[] };

const OrdersTable: FC<T_Props> = ({ orders, images }) => {
   const navigate = useNavigate();
   let i = 0;

   return (
      <table className="table">
         <thead>
            <tr>
               <th>Order Id</th>
               <th>Date</th>
               <th>Products</th>
               <th>SubTotal</th>
               <th>Status</th>
            </tr>
         </thead>
         <tbody>
            {orders &&
               orders.map((order) => (
                  <tr key={order.id}>
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
                     <td>
                        {order.orderItems.map((item) => (
                           <div
                              className="row"
                              key={`${order.id}-${item.productId}`}
                           >
                              <div className="col-3 p-1">
                                 {images && images.length > 0 && (
                                    <img
                                       src={URL.createObjectURL(images[i++])}
                                       style={{ maxWidth: "13vh" }}
                                    />
                                 )}
                              </div>
                              <div className="col-9">
                                 <div>{item.productName}</div>
                                 <div>
                                    <small>Quantity:</small> {item.quantity}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </td>
                     <td>{order.subTotalString}</td>
                     <td>{order.orderStatus}</td>
                  </tr>
               ))}
         </tbody>
      </table>
   );
};

export default OrdersTable;
