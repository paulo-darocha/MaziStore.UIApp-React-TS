import { FC } from "react";
import { T_CategoryListItem } from "../../../admin-types/CategoryAdmTypes";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCheck,
   faPencil,
   faTrashCan,
   faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type T_Props = { category: T_CategoryListItem };

const CategoryRow: FC<T_Props> = ({ category }) => {
   const navigate = useNavigate();

   const getIcon = (state: boolean) => {
      if (state) return <FontAwesomeIcon icon={faCheck} color="green" />;
      else return <FontAwesomeIcon icon={faX} size="xs" color="red" />;
   };

   return (
      <tr className="align-text-bottom">
         <td className="text-start">{category.name}</td>
         <td>{getIcon(category.includeInMenu)}</td>
         <td>{category.displayOrder}</td>
         <td>{getIcon(category.isPublished)}</td>
         <td>
            <Button variant="outline-primary" size="sm" className="m-1">
               <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => navigate(`edit/${category.id}`)}
               />
            </Button>
            <Button variant="outline-danger" size="sm" className="m-1">
               <FontAwesomeIcon icon={faTrashCan} />
            </Button>
         </td>
      </tr>
   );
};

export default CategoryRow;
