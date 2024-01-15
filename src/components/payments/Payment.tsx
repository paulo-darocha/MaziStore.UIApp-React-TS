import { useEffect, useState } from "react";
import { T_PaymentProviderVm } from "../../types/PaymentTypes";
import { Card, Modal } from "react-bootstrap";
import {
   getPaymentProviders,
   sendPaymentCoD,
} from "../../webApis/Payments.WebApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux-store/reduxStore";

const Payment = () => {
   const [dev, setDev] = useState(false);
   const [data, setData] = useState<T_PaymentProviderVm[]>([]);

   const navigate = useNavigate();
   const token = useAppSelector(x => x.token)

   useEffect(() => {
      getPaymentProviders(token).then((res) => setData(res.paymentProviders));
   }, []);

   const onClickPayment = () => {
      sendPaymentCoD(token).then((res) => navigate(`/thanks/${res}`));
   };

   return (
      <div>
         <div
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [Payment - JSON]
         </div>
         <div className="text-center h4 hy-5">Payment</div>

         <div>
            {data &&
               data.map((provider) => (
                  <div key={provider.id}>
                     <Card
                        style={{ width: "18rem", cursor: "pointer" }}
                        className="text-center"
                     >
                        <Card.Title className="mt-2">
                           {provider.name}
                        </Card.Title>
                        <Card.Body>
                           <FontAwesomeIcon
                              icon={faMoneyBillAlt}
                              size="2x"
                              color="darkgreen"
                           />
                           <br />
                           <button
                              className="btn btn-outline-success py-1 mt-2"
                              onClick={onClickPayment}
                           >
                              Pay with {provider.name}
                           </button>
                        </Card.Body>
                     </Card>
                  </div>
               ))}
         </div>

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Checkout.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(data, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default Payment;
