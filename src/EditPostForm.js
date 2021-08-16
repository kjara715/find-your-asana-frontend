import React, { useContext} from "react";
import { useHistory} from "react-router-dom";
import UserContext from "./userContext";
import { Formik } from "formik"

function EditPostForm({updatePost, thisPost}) {

  const currentUser=useContext(UserContext);
  const history = useHistory();
  
  return(

    <div>
      <Formik
           initialValues={{ 
          
          caption: thisPost.caption
           }}
    
    
           validate={values => {
             const errors = {};
             if (!values.caption) {
              errors.caption = 'Required';
            }  else if (
              values.caption.length > 120
            ) {
              errors.caption = 'Caption cannot exceed 120 characters';
            } 
             return errors;
           }}

           onSubmit={(values) => {
             
             updatePost(currentUser.username, thisPost.id, values)
             history.push(`/users/${currentUser.username}`)
            
           }}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
           }) => (
           
             <section style={{ justifyContent: 'center'}}>
               <br/>
               
             <h3 style={{fontFamily: "Papyrus"}}><b><i>{thisPost.pin}</i></b></h3>
              <p><i>by @{currentUser.username}</i></p>
             <form  onSubmit={handleSubmit}>

             <div className="mb-3"> 
              <br/>
                <input 
                type="caption" 
                className="form-control" 
                placeholder="Write a caption"
                id="caption"
                name="caption"
                value={values.caption}
                onChange={handleChange}
                onBlur={handleBlur}
                />
               <p style={{color: 'red'}}>{errors.caption && touched.caption && errors.caption}</p>
               <br/>
               <button className= "btn btn-primary" type="submit" disabled={isSubmitting}>
                 Update Caption
               </button>
               </div>
             </form>
             </section>
          
           )}   
          </Formik>
          </div> )
}
  
 
  
  export default EditPostForm;