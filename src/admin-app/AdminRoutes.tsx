import { Route, Routes } from "react-router-dom";
import UsersList from "./users/UsersList";
import AdminCover from "./AdminCover";
import UserEdit from "./users/UserEdit";
import CommentsList from "./comments/CommentsList";

const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="" element={<AdminCover />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/user/:id" element={<UserEdit />} />
            <Route path="comments" element={<CommentsList />} />
         </Routes>
      </div>
   );
};

export default AdminRoutes;
