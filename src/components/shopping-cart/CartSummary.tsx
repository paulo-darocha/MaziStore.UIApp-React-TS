import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { T_CartVm } from "../../types/ShoppingCartTypes";
import { useNavigate } from "react-router-dom";

type T_Props = { summary: T_CartVm };

const CartSummary: FC<T_Props> = ({ summary }) => {
   const [dev, setDev] = useState(false);
   const navigate = useNavigate();

   return (
      <div className="mt-5 ms-lg-5">
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [CartSummary - JSON]
         </div>

         <div>
            <h4>Cart Summary</h4>
            <table className="table text-center">
               <tbody>
                  <tr className="py-2">
                     <td className="text-start">Subtotal</td>
                     <td className="text-end">{summary.subTotalString}</td>
                  </tr>
                  <tr>
                     <td className="text-start">Discount</td>
                     <td className="text-end">{summary.discountString}</td>
                  </tr>
                  <tr>
                     <td className="text-start">Order Total</td>
                     <td className="text-end">{summary.orderTotalString}</td>
                  </tr>
               </tbody>
            </table>

            <div className="d-grid pt-2">
               <button
                  className="btn btn-primary"
                  onClick={() => navigate("/checkout")}
               >
                  Process to Checkout
               </button>
            </div>
            <br />
            <div className="row pt-1 pb-3">
               <label htmlFor="coupon" className="col-form-label">
                  Insert coupon code:
               </label>
               <div className="row p-0 m-0">
                  <div className="col-8 p-0">
                     <input
                        type="text"
                        id="coupon"
                        className="form-control"
                        placeholder="Coupon"
                     />
                  </div>
                  <div className="col-4 ps-1">
                     <button className="btn btn-outline-secondary">
                        Check
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>ProductDetails.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(summary, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CartSummary;
