import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux-store/reduxStore";
import { T_LoginViewModel } from "../types/AuthTypes";
import { login } from "../webApis/AuthWebApi";
import { setToken } from "../redux-store/tokenReducer";
import { setUsername } from "../redux-store/userNameReducer";
import { setId } from "../redux-store/idReducer";
import AdminRoutes from "./AdminRoutes";
import AdminNavigation from "./AdminNavigation";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
   const username = useAppSelector((x) => x.username);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const loginAsAdmin = () => {
      const data: T_LoginViewModel = {
         email: "admin@mazistore.com",
         password: "1qazZAQ!",
         rememberMe: false,
      };
      login(data).then((res) => {
         if (res.succeeded) {
            dispatch(setToken(res.token));
            dispatch(setUsername(res.email));
            dispatch(setId(res.id));
         } else {
            // setMessage("Invalid login or password.");
         }
      });
   };

   if (username !== "admin@mazistore.com") {
      return (
         <div className="text-center pt-5">
            <div className="text-primary py-5">
               <h5>
                  You are accessing the Administration Area
                  <br />
                  <br />
                  click bellow to access as a <strong>guest</strong>
               </h5>
            </div>
            <Button
               variant="outline-secondary"
               className="mx-3"
               onClick={() => navigate("/")}
            >
               Exit
            </Button>
            <Button variant="outline-primary" onClick={loginAsAdmin}>
               Enter as a <strong>Guest Admin</strong>
            </Button>
         </div>
      );
   }
   return (
      <div className="container-fluid">
         <AdminNavigation />

         <AdminRoutes />
      </div>
   );
};

export default AdminHome;
