import { Route, Routes } from "react-router-dom";
import AdminCover from "./AdminCover";
import { UsersList } from "../components/users/UsersList";
import UserEdit from "../components/users/UserEdit";
import CommentsList from "../components/comments/CommentsList";
import Products from "../components/catalog/Products";
import ProductEditor from "../components/catalog/ProductEditor";

const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="" element={<AdminCover />} />
            <Route path="users" element={<UsersList />} />
            <Route path="user/:id" element={<UserEdit />} />
            <Route path="comments" element={<CommentsList />} />
            <Route path="products" element={<Products />} />
            <Route path="products/edit/:id/*" element={<ProductEditor />} />
         </Routes>
      </div>
   );
};

export default AdminRoutes;
