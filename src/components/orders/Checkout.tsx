import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import NewAddressForm from "./NewAddressForm";
import {
   T_DeliveryInformationVm,
   T_OrderTaxAndShippingPriceVm,
} from "../../types/OrderTypes";
import {
   CompleteCheckout,
   getShippingInformation,
} from "../../webApis/OrdersWebApi";
import { Button, Modal } from "react-bootstrap";
import Addresses from "./Addresses";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux-store/reduxStore";

const Checkout = () => {
   const [message, setMessage] = useState("");
   const [shipInfo, setShipInfo] = useState<
      T_DeliveryInformationVm | undefined
   >();
   const [dev, setDev] = useState(false);
   const [addressId, setAddressId] = useState(0);
   const [shippingData, setShippingData] =
      useState<T_OrderTaxAndShippingPriceVm | null>(null);

   const navigate = useNavigate();
   const token = useAppSelector((x) => x.token);

   useEffect(() => {
      getShippingInformation(token).then((res) => setShipInfo(res));
   }, [addressId]);

   const onClickCompleteCheckout = () => {
      if (shipInfo && shippingData && shippingData.shippingAddressId) {
         const data: T_DeliveryInformationVm = shipInfo;
         data.shippingAddressId = shippingData!.shippingAddressId;
         data.shippingMethod = shippingData.selectedShippingMethodName;
         CompleteCheckout(data, token).then(() => navigate("/payment"));
      }
   };

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [Checkout - JSON]
         </div>

         <div className="h4 text-center py-2">Checkout</div>

         <div className="row">
            <div className="col-md-6">
               <NewAddressForm
                  addressForm={shipInfo?.newAddressForm}
                  newAddress={setAddressId}
               />
               {shipInfo && (
                  <Addresses
                     shippingAddresses={shipInfo?.existingShippingAddresses}
                     setShippingData={setShippingData}
                  />
               )}
            </div>

            <div className="col-md-6">
               {shippingData && <OrderSummary shippingData={shippingData} />}
            </div>

            {shippingData === null && (
               <span className="text-danger h6">{message}</span>
            )}
         </div>

         <div className="row mt-2 mb-5">
            <div className="offset-md-6 col-md-2 col-5 d-grid">
               <Button variant="outline-dark" onClick={() => navigate("/cart")}>
                  <span style={{ fontSize: ".9em" }}>Cancel Order</span>
               </Button>
            </div>

            <div
               className="col-md-4 col-7 d-grid"
               onClick={() => setMessage("Please choose a shipping method")}
            >
               <Button
                  variant="primary"
                  disabled={shippingData === null}
                  onClick={onClickCompleteCheckout}
               >
                  <span className="h6">Proceed to Payment</span>
               </Button>
            </div>
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Checkout.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(shipInfo, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default Checkout;
