import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import AppRoutes from "./AppRoutes";

const AdminHome = React.lazy(() => import("./admin-app/adm-home/AdminHome"));

function App() {
   return (
      <>
         <Routes>
            <Route path="/*" element={<AppRoutes />} />
            <Route
               path="admin/*"
               element={
                  <Suspense
                     fallback={
                        <h5 className="text-center m-5">Loading on demand.</h5>
                     }
                  >
                     <AdminHome />
                  </Suspense>
               }
            />
         </Routes>
      </>
   );
}

export default App;
