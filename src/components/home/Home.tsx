import { useEffect, useState } from "react";
import { getHomeWidgets } from "../../webApis/CoreWebApi";
import CarouselWidget from "../cms/CarouselWidget";
import {
   T_HomeViewModel,
   T_WidgetInstanceViewModel,
} from "../../types/CoreTypes";
import ProductWidget from "../catalog/ProductWidget";

const Home = () => {
   const [widgets, setWidgets] = useState<T_HomeViewModel | null>(null);

   useEffect(() => {
      getHomeWidgets().then((res) => setWidgets(res));
   }, []);

   return (
      <div className="container-fluid">
         <div>
            <div style={{ fontSize: "9px" }}>/src/components/Home.tsx</div>
            {widgets && (
               <>
                  <div>
                     <CarouselWidget instance={widgets?.widgetInstances[0]} />
                  </div>
                  <div>
                     {widgets.widgetInstances.map(
                        (instance: T_WidgetInstanceViewModel, i: number) =>
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
         {/* <div className="small">
            <pre>{JSON.stringify(widgets, null, 3)}</pre>
         </div> */}
      </div>
   );
};

export default Home;
