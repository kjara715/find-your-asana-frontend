import React, {useState, useContext} from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "./userContext";
import { Formik } from "formik"


function NewPostForm({createPost, pin, pinId}) {

  const currentUser=useContext(UserContext);
  const history = useHistory();
  const [previewSource, setPreviewSource] = useState("");

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    previewFile(file);
    updateForm(file)
}


function updateForm(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result)
    }
  }; 


function previewFile(file){
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreviewSource(reader.result)
  }
}

  

  return(

    <div>
      <Formik
           initialValues={{ 
          username: currentUser.username,
          caption: "",
          media:"",
          pin: pin,
          pin_id: pinId
           }}
    
    
           validate={values => {
             const errors = {};
            //  if (!values.media) {
            //   errors.media = 'Required';
            // }  
            if (!values.caption) {
              errors.caption = 'Required';
            } else if (
              values.caption.length > 120
            ) {
              errors.caption = 'Caption cannot exceed 120 characters';
            } 
             return errors;
           }}
           onSubmit={(values) => {
             

             values.media=previewSource;
             createPost(currentUser.username,values)
             history.push("/")
             
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
               {currentUser ? 
               <>
             <h3 style={{fontFamily: "Papyrus"}}><b><i>{pin}</i></b></h3>
              <p><i>by @{currentUser.username}</i></p>
             <form  onSubmit={handleSubmit}>

             <div className="mb-3"> 
              <label for="media" class="form-label"><b>Please select an image</b> </label>
                <input type="file" 
                id="media"
                name="media"
                onChange={handleFileInputChange}
                onBlur={handleBlur}
                className="form-control"/>
                <br/>
                {previewSource && (
                <img src={previewSource} alt="chosen" crop="scale"  style={{height: '300px'}}  />
              )}
             
              
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
                 Create Post
               </button>
               </div>
             </form>
             </>
             : <>
             <p><b>You must be logged into an account to make a post</b></p>
             <p>
               <button className="btn btn-success"><Link style={{textDecoration: 'none', color: 'white'}}to="/login">Login</Link></button>
               <button className="btn btn-secondary"><Link style={{textDecoration: 'none', color: 'white'}}to="/signup">Create An Account</Link></button>
             </p>
             
             </>}
             </section>
          
           )}   
          </Formik>
          </div> )}
          
  
  export default NewPostForm;


