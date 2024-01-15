import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { setItemsCount } from "../../redux-store/cartItemsReducer";
import { Button } from "react-bootstrap";

const Thanks = () => {
   const param = useParams();
   const dispatch = useAppDispatch();
   const id = useAppSelector((x) => x.id);
   const navigate = useNavigate();

   useEffect(() => {
      getCartItemsCount(id).then((res) => dispatch(setItemsCount(res)));
   }, [dispatch]);

   return (
      <div className="text-center">
         <div>
            <h3>Congratulations</h3>
         </div>
         <div>
            <h6>We received your order #{param.orderId}. Thank you.</h6>
         </div>

         <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => navigate("/")}
         >
            Back To Shopping
         </Button>
         <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => navigate("/profile/orders")}
         >
            See My Orders
         </Button>
      </div>
   );
};

export default Thanks;
