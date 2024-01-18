import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { T_RegisterViewModel } from "../../types/AuthTypes";
import { useState } from "react";
import { registerNewUser } from "../../webApis/AuthWebApi";
import { OneResponse } from "../../types/CoreTypes";

const Registration = () => {
   const [dev, setDev] = useState(false);
   const [hasError, setHasError] = useState(false);
   const [message, setMessage] = useState<string | null>(null);

   const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
   } = useForm<T_RegisterViewModel>({
      mode: "onBlur",
      defaultValues: {
         email: "paulo@test.com",
         fullName: "PauloRocha",
         password: "Test123#",
         confirmPassword: "Test123#",
      },
   });

   const navigate = useNavigate();

   const onClickSubmit = (data: T_RegisterViewModel) => {
      registerNewUser(data).then((res: OneResponse<string>) => {
         setHasError(res.error);
         setMessage(res.msg);
      });
   };

   return (
      <>
         <div
            className="row"
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [ Registration - FormData ]
         </div>

         <div className="m-3" style={{ fontSize: "1.1em" }}>
            Already have an account? <Link to="/login">Login here</Link> .
         </div>

         <form onSubmit={handleSubmit(onClickSubmit)}>
            <div>
               <h4>Create a new Account</h4>
               <hr />
               <div className="row">
                  <div className="col-md-7 text-end">
                     <div className="row form-group my-3">
                        <label className="col-md-3 col-form-label h5">
                           Email
                        </label>
                        <div className="col-md-9">
                           <input
                              {...register("email", {
                                 required: {
                                    value: true,
                                    message: "please enter your email",
                                 },
                                 pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "please enter a valid email",
                                 },
                              })}
                              className="form-control"
                           />
                           {errors.email && errors.email.message && (
                              <span className="text-danger small">
                                 {errors.email.message}
                              </span>
                           )}
                        </div>
                     </div>

                     <div className="row form-group my-3">
                        <label className="col-md-3 col-form-label h5">
                           FullName
                        </label>
                        <div className="col-md-9">
                           <input
                              {...register("fullName", {
                                 required: {
                                    value: true,
                                    message: "please enter your name",
                                 },
                              })}
                              className="form-control"
                           />
                           {errors.fullName && errors.fullName.message && (
                              <span className="text-danger bold small">
                                 {errors.fullName.message}
                              </span>
                           )}
                        </div>
                     </div>

                     <div className="row form-group my-3">
                        <label className="col-md-3 col-form-label h5">
                           Password
                        </label>
                        <div className="col-md-9">
                           <input
                              {...register("password", {
                                 required: {
                                    value: true,
                                    message: "please enter a password",
                                 },
                                 minLength: {
                                    value: 8,
                                    message:
                                       "password must be at least 8 characters long",
                                 },
                                 pattern: {
                                    value: new RegExp(
                                       "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[:!@#$%^&*])(?=.{8,})"
                                    ),
                                    message:
                                       "Password must contain at least 1 special character, 1 cap letter, and 1 number",
                                 },
                              })}
                              className="form-control"
                           />
                           {errors.password && errors.password.message && (
                              <span className="text-danger small">
                                 {errors.password.message}
                              </span>
                           )}
                        </div>
                     </div>

                     <div className="row form-group my-3">
                        <label className="col-md-3 col-form-label h5">
                           Confirm Password
                        </label>
                        <div className="col-md-9">
                           <input
                              {...register("confirmPassword", {
                                 required: {
                                    value: true,
                                    message: "please enter a password",
                                 },
                                 minLength: {
                                    value: 8,
                                    message:
                                       "password must be at least 8 characters long",
                                 },
                                 pattern: {
                                    value: new RegExp(
                                       "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[:!@#$%^&*])(?=.{8,})"
                                    ),
                                    message:
                                       "Password must contain at least 1 special character, 1 cap letter, and 1 number",
                                 },
                                 validate: {
                                    value: (x) => x === getValues("password"),
                                 },
                              })}
                              className="form-control"
                           />
                           {errors.confirmPassword &&
                              errors.confirmPassword.message && (
                                 <span className="text-danger small">
                                    {errors.confirmPassword.message}
                                 </span>
                              )}
                           {errors.confirmPassword &&
                              errors.confirmPassword.type === "value" && (
                                 <span className="text-danger small">
                                    Passwords are not equal
                                 </span>
                              )}
                        </div>
                     </div>

                     {message && !hasError ? (
                        <div className="row form-group my-3">
                           <div className="mt-1 mb-3 h6 text-success">
                              {message}
                           </div>
                           <label className="col-md-3 col-form-label h5"></label>
                           <div className="col-md-9">
                              <Button
                                 className="mx-4"
                                 type="submit"
                                 onClick={() => navigate("/login")}
                              >
                                 Login
                              </Button>
                              <Button
                                 variant="secondary"
                                 type="button"
                                 onClick={() => navigate("/")}
                              >
                                 Ok
                              </Button>
                           </div>
                        </div>
                     ) : (
                        <div className="row form-group my-3">
                           <div className="mt-1 mb-3 h6 text-danger">
                              {message}
                           </div>
                           <label className="col-md-3 col-form-label h5"></label>
                           <div className="col-md-9">
                              <Button
                                 className="mx-4"
                                 type="submit"
                                 onBlur={() => setMessage("")}
                              >
                                 Submit
                              </Button>
                              <Button
                                 variant="secondary"
                                 type="button"
                                 onClick={() => navigate("/")}
                              >
                                 Cancel
                              </Button>
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="col-md-5">
                     <section>
                        <h4>Use another service to log in.</h4>
                        <div>
                           <p>
                              There are no external authentication services
                              configured. See{" "}
                              <a href="https://go.microsoft.com/fwlink/?LinkID=532715">
                                 this article
                              </a>
                              for details on setting up this ASP.NET application
                              to support logging in via external services.
                           </p>
                        </div>
                     </section>
                  </div>
               </div>
            </div>
         </form>
         <Modal show={dev} onHide={() => setDev(false)}>
            <Modal.Body>
               <Modal.Header closeButton>Registration.tsx</Modal.Header>
               <div style={{ fontSize: "12px" }}>
                  <pre>{JSON.stringify(getValues(), null, 3)}</pre>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default Registration;
