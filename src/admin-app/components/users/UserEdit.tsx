import { useParams } from "react-router-dom";

const UserEdit = () => {
   const param = useParams();

   return (
      <div>
         <div className="h5">Edit User {param.id}</div>
      </div>
   );
};

export default UserEdit;
