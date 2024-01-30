import { useEffect, useState } from "react";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";
import { Modal } from "react-bootstrap";
import { T_SmartTableResult, T_UserResult } from "../../admin-types/UserTypes";
import { useAppSelector } from "../../../redux-store/reduxStore";
import { getUserList } from "../../admin-hooks/UsersWebApi";

export const UsersList = () => {
   const [dev, setDev] = useState(false);
   const [users, setUsers] = useState<
      T_SmartTableResult<T_UserResult> | undefined
   >();
   const token = useAppSelector((x) => x.token);
   const params = useAppSelector((x) => x.params);
   const modified = useAppSelector((x) => x.modified);

   useEffect(() => {
      getUserList(params, token).then((res) => setUsers(res));
   }, [token, modified, params]);

   return (
      <div>
         <div
            className="row"
            style={{
               fontSize: "9px",
               cursor: "pointer",
            }}
            onClick={() => setDev(true)}
         >
            [ CategoriesMenu - JSON ]
         </div>

         <div>UsersList</div>
         <UserFilters />
         {users && <UsersTable users={users.items} />}

         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CategoriesMenu.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(users, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};
