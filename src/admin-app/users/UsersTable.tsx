import { FC, useEffect, useState } from "react";
import UsersTableRow from "./UsersTableRow";
import { T_Sort, T_UserResult } from "../types/UserTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faArrowDown,
   faArrowUp,
   faSort,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { toggleSort } from "../../redux-store/userParamReducer";

type T_Props = { users: T_UserResult[] };

const UsersTable: FC<T_Props> = ({ users }) => {
   const [sort, setSort] = useState<string>();
   const [reverse, setReverse] = useState(false);
   const dispatch = useAppDispatch();

   const getIcons = (field: string) => {
      if (field != sort) {
         return <FontAwesomeIcon icon={faSort} />;
      } else if (reverse) {
         return <FontAwesomeIcon icon={faArrowUp} />;
      }
      return <FontAwesomeIcon icon={faArrowDown} />;
   };

   const setSortField = (field: string) => {
      if (field != sort) {
         setSort(field);
         setReverse(false);
      } else if (!reverse) {
         setReverse(true);
      } else {
         setSort("");
      }
   };

   useEffect(() => {
      if (sort) {
         const data: T_Sort = { predicate: sort, reverse: reverse };
         dispatch(toggleSort(data));
      }
   }, [sort, dispatch, reverse]);

   return (
      <div>
         <div>UsersTable</div>
         <table className="table table-sm table-bordered">
            <thead>
               <tr className="text-center">
                  <th>Id</th>
                  <th
                     style={{ cursor: "pointer" }}
                     onClick={() => setSortField("FullName")}
                  >
                     {getIcons("FullName")}&emsp;Full Name
                  </th>
                  <th
                     style={{ cursor: "pointer" }}
                     onClick={() => setSortField("Email")}
                  >
                     {getIcons("Email")}&emsp;Email
                  </th>
                  <th>Role</th>
                  <th
                     style={{ cursor: "pointer" }}
                     onClick={() => setSortField("CreatedOn")}
                  >
                     {getIcons("CreatedOn")}&emsp;Created On
                  </th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {users &&
                  users.map((user) => (
                     <UsersTableRow user={user} key={user.id} />
                  ))}
            </tbody>
         </table>
      </div>
   );
};

export default UsersTable;
