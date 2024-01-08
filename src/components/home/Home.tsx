import { FC, useEffect, useState } from "react";
import { getHomeWidgets } from "../../webApis/CoreWebApi";
import CarouselWidget from "../cms/CarouselWidget";
import {
   T_HomeViewModel,
   T_WidgetInstanceViewModel,
} from "../../types/CoreTypes";
import ProductWidget from "../catalog/ProductWidget";
import { Alert, Modal } from "react-bootstrap";
import CategoriesMenu from "../categories/CategoriesMenu";

type T_Props = { notFound?: boolean };

const Home: FC<T_Props> = ({ notFound = false }) => {
   const [show, setShow] = useState(true);
   const [widgets, setWidgets] = useState<T_HomeViewModel | null>(null);
   const [dev, setDev] = useState(false);

   useEffect(() => {
      getHomeWidgets().then((res) => setWidgets(res));
   }, []);

   return (
      <>
         {notFound && (
            <Alert variant="danger" dismissible className="m-3 pt-2 pb-1">
               <Alert.Heading>
                  The page you are looking for was not found
               </Alert.Heading>
            </Alert>
         )}

         <div className="container-fluid">
            <div className="row">
               <CategoriesMenu />
            </div>
            <div
               className="row"
               style={{
                  fontSize: "9px",
                  cursor: "pointer",
               }}
               onClick={() => setDev(true)}
            >
               [ Home - JSON ]
            </div>
            <div className="row">
               {widgets && (
                  <>
                     <div>
                        <CarouselWidget
                           instance={widgets?.widgetInstances[0]}
                        />
                     </div>
                     <div>
                        {widgets.widgetInstances.length > 0 &&
                           widgets.widgetInstances.map(
                              (
                                 instance: T_WidgetInstanceViewModel,
                                 i: number
                              ) =>
                                 i !== 0 && (
                                    <ProductWidget
                                       instance={instance}
                                       key={instance.id}
                                    />
                                 )
                           )}
                     </div>
                  </>
               )}
            </div>

            <Modal show={dev} onHide={() => setDev(false)}>
               <Modal.Body>
                  <Modal.Header closeButton>Home.tsx</Modal.Header>
                  <div style={{ fontSize: "12px" }}>
                     <pre>{JSON.stringify(widgets, null, 3)}</pre>
                  </div>
               </Modal.Body>
            </Modal>
         </div>
      </>
   );
};

export default Home;
