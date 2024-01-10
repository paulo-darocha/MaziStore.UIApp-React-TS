import { FC } from "react";
import { useAppSelector } from "../../redux-store/reduxStore";
import { useParams } from "react-router-dom";
import Login from "./Login";

type T_Props = { children: React.ReactNode; returnUrl: string };

const CheckAuth: FC<T_Props> = ({ children, returnUrl }) => {
   const logged = useAppSelector((x) => x.logged);
   const params = useParams();

   return (
      <>
         {logged ? (
            <>{children}</>
         ) : (
            <Login url={`${returnUrl}/${params.url ?? ""}`} />
         )}
      </>
   );
};

export default CheckAuth;
