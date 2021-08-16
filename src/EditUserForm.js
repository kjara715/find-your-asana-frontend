import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./userContext";
import { Formik } from "formik"


function EditUserForm({updateUser}) {

  const currentUser=useContext(UserContext);
  const [previewSource, setPreviewSource] = useState("");

  const history = useHistory();

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
}

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
        firstName:currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        bio: currentUser.bio || " ",
        
        }}


       validate={values => {
         const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Required';
        } else if (
          values.firstName.length > 30
        ){
          errors.firstName = 'First name must be 30 characters or less';
        }
        if (!values.lastName) {
          errors.lastName = 'Required';
        } else if (
          values.lastName.length > 30
        ){
          errors.lastName = 'Last name must be 30 characters or less';
        }
        if(values.bio.length > 200){
          errors.bio = 'Bio must not exceed 200 characters';
        }
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values) => {
         
        //this part needs to change to fix the edit user bug;
        if(previewSource){
          values.profileImg=previewSource;
        }
        
         
         updateUser(currentUser.username,values)
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
        <div className="container d-flex justify-content-center form-box"> 
         <section className="col-md-6">
         <h1 style={{fontFamily: "Papyrus"}}>Edit Account Details</h1>
         <h5 style={{fontFamily: "Papyrus"}}><b>@{currentUser.username}</b></h5>
         <form  onSubmit={handleSubmit}>
           
           <label htmlFor="firstName"><b>First Name</b></label>
           <input
             type="firstName"
             name="firstName"
             className="form-control"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.firstName}
           />
           <p style={{color: 'red'}}>{errors.firstName && touched.firstName && errors.firstName}</p>
           <label htmlFor="lastName"><b>Last Name</b></label>
           <input
             type="lastName"
             name="lastName"
             className="form-control"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.lastName}
           />
           <p style={{color: 'red'}}>{errors.lastName && touched.lastName && errors.lastName}</p>
           <label htmlFor="bio"><b>Bio</b> (optional)</label>
           <input
             type="bio"
             name="bio"
             className="form-control"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.bio}
           />
           <p style={{color: 'red'}}>{errors.bio && touched.bio && errors.bio}</p>
           
           <label htmlFor="email"><b>Email</b></label>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             className="form-control"
             value={values.email}
           />
           <p style={{color: 'red'}}>{errors.email && touched.email && errors.email}</p>
           <label htmlFor="profileImg"><b>Profile Picture</b> (optional)</label>
           <input
             type="file"
             name="profileImg"
             onChange={handleFileInputChange}
             onBlur={handleBlur}
             className="form-control"
            
           />
           
          
           <br/>
           <button className= "btn btn-primary" type="submit" disabled={isSubmitting}>
             Save Changes
           </button>
         </form>
         </section>
        </div>
       )}   
      </Formik>
      </div>    
  )   

 }
  
  export default EditUserForm;