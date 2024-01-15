import { useEffect } from "react";
import { logoutFromServer } from "../../webApis/AuthWebApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { setToken } from "../../redux-store/tokenReducer";
import { setUsername } from "../../redux-store/userNameReducer";

const Logout = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   useEffect(() => {
      logoutFromServer().then(() => {
         dispatch(setUsername("(visitor)"))
         dispatch(setToken('x'));
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
