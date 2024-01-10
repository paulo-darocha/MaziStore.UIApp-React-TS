import { Button } from "react-bootstrap";

const Comment = () => {
   return (
      <div className="container-sm  text-end">
         <div className="h4 text-center my-3">Leave a Comment</div>
         <div className="row form-group pt-2">
            <label className="col-3 h6 form-label">Comment:</label>
            <div className="col-8">
               <textarea className="form-control" rows={5}></textarea>
            </div>
         </div>

         <div className="row form-group mt-3">
            <label className="col-3 h6 form-label pt-2">Title:</label>
            <div className="col-8">
               <input className="form-control" />
            </div>
         </div>

         <div className="row form-group mt-3">
            <label className="col-3 h6 form-label pt-2">Name:</label>
            <div className="col-8">
               <input className="form-control" />
            </div>
         </div>

         <div className="row form-group mt-3">
            <label className="col-3 h6 form-label pt-2">
               Email (optional):
            </label>
            <div className="col-8">
               <input className="form-control" />
            </div>
         </div>

         <div className="row form-group mt-3">
            <div className="offset-8 col-3">
               <Button className="mx-3">Send</Button>
               <Button variant="outline-primary">Cancel</Button>
            </div>
         </div>
      </div>
   );
};

export default Comment;
