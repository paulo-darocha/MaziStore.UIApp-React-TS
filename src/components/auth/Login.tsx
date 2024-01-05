import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { T_LoginViewModel } from "../../types/AuthTypes";
import { Button } from "react-bootstrap";

type T_Props = { url?: string };

const Login: FC<T_Props> = ({ url = "" }) => {
   const [id, setId] = useState(0);
   const param = useParams();
   const navigate = useNavigate();

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
      // login(data).then((response) => {
      //    dispatch(addUser(response));
      //    navigate(`${url}/${id}`);
      // });
   };

   useEffect(() => {
      const idNum = Number(param.id);
      if (idNum > 0) {
         setId(idNum);
      }
   }, [url, param]);

   return (
      <div>
         <h4>Login</h4>
         <div style={{ fontSize: "10px" }}>
            [returUrl: {`${url}/${id !== 0 ? id : ""}`}]
         </div>
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