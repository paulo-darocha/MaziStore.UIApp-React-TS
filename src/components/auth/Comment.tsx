import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { T_PublicCommentVm } from "../../types/AuthTypes";
import { useNavigate } from "react-router-dom";
import { sendCommentToServer } from "../../webApis/AuthWebApi";
import { useState } from "react";

const Comment = () => {
   const [dev, setDev] = useState(false);
   const [message, setMessage] = useState<string | undefined>();
   const [disabled, setDisabled] = useState(false);

   const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
   } = useForm<T_PublicCommentVm>();
   const navigate = useNavigate();

   const onSubmitForm = (data: T_PublicCommentVm) => {
      sendCommentToServer(data).then(() => {
         setDisabled(true);
         setMessage("Comment posted successfully. Thank you!");
      });
   };

   return (
      <div className="container-sm  text-end">
         <div
            className="row"
            style={{ fontSize: "9px", cursor: "pointer" }}
            onClick={() => setDev(true)}
         >
            [ Comment - FormData ]
         </div>
         <div className="h4 text-center my-3">Leave a Comment</div>

         <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="row form-group pt-2">
               <label className="col-3 h6 form-label">Comment:</label>
               <div className="col-8">
                  <textarea
                     disabled={disabled}
                     {...register("comment", {
                        required: {
                           value: true,
                           message: "Please fill in your message",
                        },
                        minLength: {
                           value: 15,
                           message: "Please fill at least 15 characters",
                        },
                     })}
                     className="form-control"
                     rows={5}
                  ></textarea>
                  {errors.comment && (
                     <span className="text-danger">
                        {errors.comment.message}
                     </span>
                  )}
               </div>
            </div>

            <div className="row form-group mt-3">
               <label className="col-3 h6 form-label pt-2">Title:</label>
               <div className="col-8">
                  <input
                     {...register("title")}
                     disabled={disabled}
                     className="form-control"
                     style={{ fontSize: "1.08em", fontWeight: "bold" }}
                  />
               </div>
            </div>

            <div className="row form-group mt-3">
               <label className="col-3 h6 form-label pt-2">Name:</label>
               <div className="col-8">
                  <input
                     {...register("name")}
                     disabled={disabled}
                     className="form-control"
                  />
               </div>
            </div>

            <div className="row form-group mt-3">
               <label className="col-3 h6 form-label pt-2">
                  Email (optional):
               </label>
               <div className="col-8">
                  <input
                     {...register("email")}
                     disabled={disabled}
                     className="form-control"
                  />
               </div>
            </div>

            <h5 className="text-success text-center mt-3">
               {message && message}
            </h5>
            <div className="row form-group mt-3">
               <div className="offset-8 col-3">
                  {!disabled && (
                     <Button type="submit" className="mx-3" disabled={disabled}>
                        Send
                     </Button>
                  )}
                  <Button
                     type="button"
                     onClick={() => navigate("/")}
                     variant="outline-primary"
                  >
                     {disabled ? "Back To Shopping" : "Cancel"}
                  </Button>
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
      </div>
   );
};

export default Comment;
