import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminCover = () => {
   const navigate = useNavigate();

   return (
      <div className="text-center">
         <div className="h3 m-3">Wellcome to MaziStore Administration</div>
         <div className="h5 m-3">(in development)</div>

         <div className="text-center row">
            <div className="offset-4 col-4 d-grid gap-2">
               <Button
                  variant="outline-primary"
                  onClick={() => navigate("products")}
               >
                  products
               </Button>
               <Button
                  variant="outline-primary"
                  onClick={() => navigate("categories")}
               >
                  categories
               </Button>
               <Button
                  variant="outline-primary"
                  onClick={() => navigate("inventory")}
               >
                  inventory
               </Button>
               <Button
                  variant="outline-primary"
                  onClick={() => navigate("comments")}
               >
                  comments
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AdminCover;
