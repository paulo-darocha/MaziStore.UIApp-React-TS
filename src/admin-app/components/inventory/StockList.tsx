import { useEffect, useState } from "react";
import useInventoryAPI from "../../admin-hooks/useInventoryAPI";
import { T_Warehouse } from "../../admin-types/InventoryTypes";
import { Modal } from "react-bootstrap";

const StockList = () => {
   const [dev, setDev] = useState(false);
   const [warehouses, setWarehouses] = useState<T_Warehouse[] | undefined>();

   const { getWarehouseListRepo } = useInventoryAPI();

   useEffect(() => {
      getWarehouseListRepo().then((res) => setWarehouses(res));
   }, []);

   useEffect(() => {}, [warehouses]);

   return (
      <div>
         <div style={{ fontSize: "9px", cursor: "pointer" }}>
            DEV: StockList.tsx{" "}
            <a href="#" onClick={() => setDev(true)}>
               [ JSON ]
            </a>
         </div>
         <div>StockList</div>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>CategoriesList.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(warehouses, null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default StockList;
