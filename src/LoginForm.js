import React from "react";
import { useHistory } from "react-router-dom";
import "./Form.css";
import { Formik } from 'formik';

function LoginForm({login}) {

const history = useHistory();
  
return(

<div>
  <Formik
       initialValues={{ 
        username: "",
       password:""
       }}


       validate={values => {
         const errors = {};
         if (!values.username) {
          errors.username = 'Required';
        } else if (
          values.username.length >30
        ) {
          errors.username = 'Username must be 30 characters or less';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (
          values.password.length >20
        ) {
          errors.password = 'Password must be 20 characters or less';
        } else if (
          values.password.length < 5
        ) {
          errors.password = 'Password must be a minumum of 5 characters';
        }
         return errors;
       }}
       onSubmit={(values) => {
         
          login(values)
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
        <div className="container d-flex justify-content-center form-box"> 
         <section className="col-md-6">
         <h1 style={{fontFamily: "Papyrus"}}>Login</h1>
         <form  onSubmit={handleSubmit}>
          
           <label htmlFor="username"><b>Username</b></label>
           <input
             type="username"
             name="username"
             className="form-control"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
           />
           <p style={{color: 'red'}}>{errors.username && touched.username && errors.username}</p>
           
           <label htmlFor="password"><b>Password</b></label>
           <br/>
           <input
             type="password"
             name="password"
             className="form-control"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           <p style={{color: 'red'}}>{errors.password && touched.password && errors.password}
          </p>
           <br/>
           <button className= "btn btn-primary" type="submit" disabled={isSubmitting}>
             Login
           </button>
         </form>
         </section>
        </div>
       )}   
      </Formik>
      </div>    
  )  
    
}
  
  export default LoginForm;