import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCartItemsCount } from "../../webApis/ShoppingCartWebApi";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { setItemsCount } from "../../redux-store/cartItemsReducer";

const Thanks = () => {
   const param = useParams();
   const dispatch = useAppDispatch();

   useEffect(() => {
      getCartItemsCount().then((res) => dispatch(setItemsCount(res)));
   }, [dispatch]);

   return (
      <div className="text-center">
         <div>
            <h3>Congratulations</h3>
         </div>
         <div>
            <h6>We received your order #{param.orderId}. Thank you.</h6>
         </div>
      </div>
   );
};

export default Thanks;
