import { useEffect, useState } from "react";
import { getPublicCommentList } from "../../webApis/AuthWebApi";
import { T_PublicCommentVm } from "../../types/AuthTypes";

const CommentsList = () => {
   const [commentList, setCommentList] = useState<T_PublicCommentVm[]>([]);
   useEffect(() => {
      getPublicCommentList().then((res) => setCommentList(res));
   }, []);

   return (
      <div className="container">
         <div className="h4 text-center">Public Comments List</div>
         {commentList &&
            commentList.length > 0 &&
            commentList.map((comment) => (
               <div>
                  <h5>{comment.title}</h5>
                  <p>{comment.comment}</p>
                  {comment.name && (
                     <p className="float-end">
                        <strong>
                           written by {comment.name} (<i>{comment.email}</i>)
                        </strong>
                     </p>
                  )}
                  <br />
                  <hr />
               </div>
            ))}
      </div>
   );
};

export default CommentsList;
