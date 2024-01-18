import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminCover = () => {
   const navigate = useNavigate();

   return (
      <div className="text-center">
         <div className="h3 m-3">Wellcome to MaziStore Administration</div>
         <div className="h5 m-3">(in development)</div>
         <Button variant="outline-primary" onClick={() => navigate("comments")}>
            See latest comments
         </Button>
      </div>
   );
};

export default AdminCover;
