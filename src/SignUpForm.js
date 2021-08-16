import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import "./Form.css"

function SignupForm({signup}) {

const history = useHistory();
  
return(

<div>
  <Formik
       initialValues={{ 
        username: "",
       password:"",
       firstName:"",
       lastName:"",
       email:""}}


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
          errors.firstName = 'Last name must be 30 characters or less';
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
         
         console.log(values)
         
          signup(values)
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
         /* and other goodies */
       }) => (
        <div className="container d-flex justify-content-center form-box"> 
         <section className="col-md-6">
         <h1 style={{fontFamily: "Papyrus"}}>Sign Up</h1>
         <h5 style={{fontFamily: "Papyrus"}}>Join our online community of yogis and share your asana practice</h5>
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
           <br/>
           <button className= "btn btn-primary" type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
         </section>
        </div>
       )}   
      </Formik>
      </div>    
  )   
}
  
  export default SignupForm;