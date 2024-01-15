import { Button } from "react-bootstrap";
import GitHub from "../../assets/github-mark-white.svg";
import LinkedIn from "../../assets/LI-In-Bug.png";

const About = () => {
   return (
      <div className="container-sm">
         <div className=" row mt-3">
            <div className="col-md-3 mt-5">
               <h5>About the developer:</h5>
               <strong>Paulo Rocha</strong>
               <p>
                  fullstack developer <br />
                  (ASP.NET Core + React)
               </p>
               <Button
                  className="my-1"
                  href="https://github.com/paulo-darocha"
                  variant="dark"
               >
                  <img src={GitHub} style={{ maxWidth: "5vh" }} />
                  <span className="m-2">Paulo Rocha</span>
               </Button>
               <br />
               <Button
                  className="mt-2"
                  variant="outline-primary"
                  href="https://www.linkedin.com/in/paulorocha2010"
               >
                  <img src={LinkedIn} style={{ maxWidth: "5vh" }} />
                  <span className="m-2">Paulo Rocha</span>
               </Button>
               <br />
            </div>

            <div className="col-md-9">
               <div>
                  <span className="h4">Mazi Store</span>{" "}
                  <small>&copy;2024:</small>
               </div>
               <br />
               <h5>
                  This is a Single Page Application - SPA - build as a mock Web
                  Commerce
                  <br />
                  Fully developed in React 18 with Typescript - Vite template:
               </h5>
               <ul>
                  <li>
                     Using <strong>Axios</strong> for comunication to WebAPI
                     endpoints{" "}
                  </li>{" "}
                  <li>
                     <strong>React-Bootstrap + CSS</strong> for styling.
                  </li>
                  <li>
                     Modern fully implementation utilizing{" "}
                     <strong>React Hooks</strong> with
                  </li>
                  Functions for the components.
                  <li>
                     React Redux using <strong>'@reduxjs/toolkit'</strong> with
                     slices and reducers.
                  </li>
                  <li>
                     Routes with <strong>react-router-dom@6.20</strong>
                  </li>
                  <li>
                     Authentication using <strong>Identity Cookies</strong> for
                     users
                  </li>
                  <li>
                     In the Admin App is beeing used <strong>JWT</strong> for
                     Authorization and Authentication
                  </li>
                  <li>
                     New <strong>import.meta.env</strong> for dotenv
                     configuration
                  </li>
               </ul>
               GitHub repository with complete App code:{" "}
               <a href="https://github.com/paulo-darocha/MaziStore.UIApp-React-TS">
                  MaziStore.UIApp-React-TS
               </a>
               <hr />
               <h5>
                  Backend Web API Server fully developed in C# ASP.NET Core 6:
               </h5>
               GitHub repository with complete WebServer API code:{" "}
               <a href="https://github.com/paulo-darocha/MaziStore.ApiServer-AspNetCore6">
                  MaziStore.ApiServer-AspNetCore6
               </a>
               <p>
                  Using <strong>Controllers</strong>,{" "}
                  <strong>Entity Framework</strong> Core 6 and{" "}
                  <strong>MSSQL Server</strong> for data structure
               </p>
               <hr />
               <h5>Administration Application fully developed React:</h5>
               <p>(in development)</p>
            </div>
         </div>
      </div>
   );
};

export default About;
