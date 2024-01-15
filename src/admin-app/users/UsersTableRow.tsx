import { FC, useState } from "react";
import { T_UserResult } from "../types/UserTypes";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEdit,
   faExclamationTriangle,
   faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../web-api/UsersWebApi";
import { useAppDispatch, useAppSelector } from "../../redux-store/reduxStore";
import { setModified } from "../../redux-store/modifiedReducer";

type T_Props = { user: T_UserResult };

const UsersTableRow: FC<T_Props> = ({ user }) => {
   const [showDelete, setShowDelete] = useState(false);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const token = useAppSelector((x) => x.token);

   const onClickDeleteUser = () => {
      deleteUser(user.id, token).then(() => {
         setShowDelete(false);
         dispatch(setModified(true));
      });
   };

   return (
      <tr>
         <td>{user.id}</td>
         <td>{user.fullName}</td>
         <td>{user.email}</td>
         <td>{user.roles.join(", ")}</td>
         <td>{new Date(user.createdOn).toLocaleString()}</td>
         <td>
            <Button
               size="sm"
               variant="outline-primary"
               className="mx-1"
               onClick={() => navigate(`user/${user.id}`)}
            >
               <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
               size="sm"
               variant="outline-danger"
               className="mx-1"
               onClick={() => setShowDelete(true)}
            >
               <FontAwesomeIcon icon={faX} />
            </Button>

            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
               <Modal.Body className="text-center">
                  <Modal.Header closeButton>
                     <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        color="orange"
                        size="2x"
                     />
                  </Modal.Header>
                  <br />
                  <h5>Are you sure you want to delete user</h5>
                  <h6>"{user.email}"</h6>
                  <h6>({user.fullName}) ?</h6>
               </Modal.Body>
               <Modal.Footer>
                  <Button
                     variant="danger"
                     className="mx-2"
                     onClick={onClickDeleteUser}
                  >
                     Delete
                  </Button>
                  <Button
                     variant="secondary"
                     onClick={() => setShowDelete(false)}
                  >
                     Exit
                  </Button>
               </Modal.Footer>
            </Modal>
         </td>
      </tr>
   );
};

export default UsersTableRow;
