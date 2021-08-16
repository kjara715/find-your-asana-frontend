import React, { useContext, useState, useEffect} from "react";
import {
    Card,
    CardText,
    CardTitle,
    CardBody
  } from "reactstrap";

import "./ProfilePage.css"
import Post from "./Post"
import DeleteUserForm from './DeleteUserForm'
import { useParams } from "react-router-dom";
import "./PoseDetails.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt, faEdit } from '@fortawesome/fontawesome-free-solid';

import YogaApi from "./Api";


import UserContext from "./userContext";

import {Image} from "cloudinary-react";


function ProfilePage({deletePost, updatePost, deleteUser}) {

  const {username} = useParams();
  const currentUser=useContext(UserContext);
  const [deleteForm, setDeleteForm] = useState(false);
  const [thisUser, setThisUser]=useState("none");
 
useEffect(() => {
  async function getThisUser() {
        let foundUser = await YogaApi.getUser(username);
        setThisUser(foundUser);      
  }
  getThisUser();
}, [username]);


    function showForm(){
      if(deleteForm === false){
        setDeleteForm(true)
      }
    }

    function hideForm(){
      if(deleteForm === true){
        setDeleteForm(false)
      }
    }

    

      return (
        <div className="container d-flex justify-content-center">
            <section className="col-md-8">
          <Card style={{fontFamily: "Papyrus"}}className="profile">    
                <br/>
                <CardTitle><h2><b>@{thisUser.username}</b></h2></CardTitle> 
                <div className="circle">
                  <Image cloudName="drblalgqw" publicId={thisUser.profileImg} crop="scale"/> 
                </div>
                
                <CardBody>
                <CardText>
                <p><b>Name: </b>{thisUser.firstName} {thisUser.lastName}</p>
                <p>{thisUser.bio}</p>
                {currentUser.username === thisUser.username ? 
                <>
                <Link to={`${username}/edit`}><button className="btn btn-secondary">Edit Account Details <FontAwesomeIcon icon={faEdit}/></button></Link>
                <button className="btn btn-danger" onClick={showForm}>Delete Account <FontAwesomeIcon icon={faTrashAlt}/></button> 
                </>:
                null}
                
               {deleteForm ? 
                <div className="post-form">
                  <button className="btn btn-sm btn-secondary post-exit" onClick={hideForm} >X</button>
                  <DeleteUserForm deleteUser={deleteUser} />
                </div> : null}  

                <br/>
                <div className="post-list">
                {thisUser.posts &&
                 thisUser.posts.map(post => (
                   <Post thisPost={post} deletePost={deletePost} updatePost={updatePost} />
                  
                ))
                }
               
                </div>
                
              
                </CardText>
                </CardBody>   
               
        </Card>
        </section>
        </div>    
            )
}

export default ProfilePage