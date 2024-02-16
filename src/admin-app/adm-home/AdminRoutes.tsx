import { Route, Routes } from "react-router-dom";
import AdminCover from "./AdminCover";
import { UsersList } from "../components/users/UsersList";
import UserEdit from "../components/users/UserEdit";
import CommentsList from "../components/comments/CommentsList";
import Products from "../components/catalog/products/Products";
import ProductEditor from "../components/catalog/products/ProductEditor";
import CategoriesList from "../components/catalog/categories/CategoriesList";
import CategoryEdit from "../components/catalog/categories/CategoryEditor";
import StockList from "../components/inventory/StockList";

const AdminRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="" element={<AdminCover />} />
            <Route path="users" element={<UsersList />} />
            <Route path="user/:id" element={<UserEdit />} />
            <Route path="comments" element={<CommentsList />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="products/edit/:id/*" element={<ProductEditor />} />
            <Route path="categories/edit/:id/*" element={<CategoryEdit />} />
            <Route path="inventory" element={<StockList />} />
         </Routes>
      </div>
   );
};

export default AdminRoutes;
