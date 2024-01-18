import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = { initialValue: string; getValue: (value: string) => void };

const TinyMCEEditor: FC<Props> = ({
   initialValue = "TinyMCE Text Editor",
   getValue,
}) => {
   const handleEditorChange = (content: string, editor: any) => {
      getValue(content);
   };

   return (
      <Editor
         apiKey="uchkm2jbko05t8pz3hs5gpmv07y21mcp5cahweev58bvl27r"
         init={{
            deprecation_warnings: false,
            inline: false,
            plugins:
               "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
               "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_author: "Author name",
            mergetags_list: [
               { value: "First.Name", title: "First Name" },
               { value: "Email", title: "Email" },
            ],
            height: 250,
            icons: "thin",
            fixed_toolbar_container: "#mazi_toolbar",
         }}
         initialValue={initialValue}
         onEditorChange={handleEditorChange}
      />
   );
};

export default TinyMCEEditor;
