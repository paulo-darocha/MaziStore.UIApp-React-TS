import { useEffect } from "react";
import { logoutFromServer } from "../../webApis/AuthWebApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { loginRedux } from "../../redux-store/loggedReducer";

const Logout = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   useEffect(() => {
      logoutFromServer().then(() => {
         dispatch(loginRedux(false));
         navigate("/");
      });
   }, []);

   return (
      <div>
         <div>Logout</div>
      </div>
   );
};

export default Logout;
