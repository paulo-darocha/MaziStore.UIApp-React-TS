import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { T_LoginViewModel } from "../../types/AuthTypes";
import { Button } from "react-bootstrap";
import { checkIfLogged, login } from "../../webApis/AuthWebApi";
import { OneResponse } from "../../types/CoreTypes";
import { useAppDispatch } from "../../redux-store/reduxStore";
import { loginRedux } from "../../redux-store/loggedReducer";
import { setUsername } from "../../redux-store/userNameReducer";

type T_Props = { url?: string };

const Login: FC<T_Props> = ({ url }) => {
   const [message, setMessage] = useState("");
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<T_LoginViewModel>({
      mode: "onBlur",
      defaultValues: {
         email: "paulo@test.com",
         password: "Test123#",
         rememberMe: true,
      },
   });

   const onClickSubmit = (data: T_LoginViewModel) => {
      login(data).then((res: OneResponse<string>) => {
         if (res.error) {
            setMessage(res.msg);
         } else {
            dispatch(loginRedux(true));
            checkIfLogged().then((res) => {
               dispatch(setUsername(res.user.fullName));
               navigate(`${url ?? "/home"}`);
            });
         }
      });
   };

   return (
      <div>
         <h4>Login</h4>
         <div style={{ fontSize: "10px" }}>[returUrl: {`${url ?? "/"}`}]</div>
         <div className="row">
            <div className="col-7 text-end pe-3">
               <form onSubmit={handleSubmit(onClickSubmit)}>
                  <div className="row form-group my-3">
                     <label className="col-md-3 col-form-label h5">Email</label>
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

                  <div>
                     {message && (
                        <div className="text-danger mb-3 h6">{message}</div>
                     )}
                     <Button type="submit" className="mx-4">
                        Login
                     </Button>
                     <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate("/")}
                     >
                        Cancel
                     </Button>
                  </div>
               </form>
            </div>
            <div className="col-5 p-3">
               <section>
                  <h4>Use another service to log in.</h4>
                  <div>
                     <p>
                        There are no external authentication services
                        configured. See{" "}
                        <a href="https://go.microsoft.com/fwlink/?LinkID=532715">
                           this article
                        </a>
                        for details on setting up this ASP.NET application to
                        support logging in via external services.
                     </p>
                  </div>
               </section>
            </div>
         </div>
      </div>
   );
};

export default Login;
