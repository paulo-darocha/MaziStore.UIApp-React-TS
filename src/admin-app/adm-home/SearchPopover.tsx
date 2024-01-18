import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction } from "react";
import { Form, InputGroup, Popover } from "react-bootstrap";

type T_Props = {
   search: string;
   setSearch: Dispatch<SetStateAction<string>>;
   showSearch: boolean;
   setShowSearch: Dispatch<SetStateAction<boolean>>;
};

const SearchPopOver = ({
   search,
   setSearch,
   setShowSearch,
   showSearch,
}: T_Props) => {
   return (
      <Popover
         className="bg-secondary"
         style={{ minWidth: "400px", position: "sticky" }}
      >
         <Popover.Header className="bg-secondary text-white" as="h5">
            Search
            <FontAwesomeIcon
               className="float-end"
               icon={faX}
               onClick={() => setShowSearch(!showSearch)}
            />
         </Popover.Header>

         <Popover.Body>
            <InputGroup>
               <Form.Control
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               ></Form.Control>
               <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
               </InputGroup.Text>
            </InputGroup>
         </Popover.Body>
      </Popover>
   );
};

export default SearchPopOver;




