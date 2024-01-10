import { Button } from "react-bootstrap";

const UserProfile = () => {
   return (
      <div>
         <div className="h4 text-center m-3">UserProfile</div>
         <h6>Personal Data:</h6>
         <div className="border">
            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">Name:</label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">Last name:</label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">Phone:</label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="offset-9 col-2 mt-3 text-end">
               <Button>Save Changes</Button>
            </div>
         </div>
         <br />

         <h6>Change password:</h6>
         <div className="border">
            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">
                  Current password:
               </label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">New password:</label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">
                  Confirm new password:
               </label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>

            <div className="offset-8 col-3 mt-3 text-end">
               <Button>Change password</Button>
            </div>
         </div>
         <br />

         <h6>Help:</h6>
         <div className="border">
            <div className="row form-group mt-3 text-end">
               <label className="col-3 h6 form-label pt-2">
                  Current password:
               </label>
               <div className="col-8">
                  <input className="form-control" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
