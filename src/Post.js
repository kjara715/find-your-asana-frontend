import React, {useState, useContext} from "react";

import {
    Card,
    CardBody,
    CardTitle,
    
  } from "reactstrap";
  
import { StyleSheet, css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt, faEdit } from '@fortawesome/fontawesome-free-solid';
import UserContext from './userContext';
import EditPostForm from './EditPostForm';
import DeletePostForm from './DeletePostForm';
import {Image} from "cloudinary-react";
import { Link } from "react-router-dom";

  
function Post({thisPost, deletePost, updatePost}) {

const currentUser=useContext(UserContext);

const [showDeleteForm, setShowDeleteForm]=useState(false);
const [showEditForm, setShowEditForm]=useState(false);


function showDelForm(){
    if(showDeleteForm === false){
        setShowDeleteForm(true)
    }
}

function hideDelForm(){
    if(showDeleteForm === true){
        setShowDeleteForm(false)
    }
}

function showEdForm(){
  if(showEditForm === false){
      setShowEditForm(true)
  }
}

function hideEdForm(){
  if(showEditForm === true){
      setShowEditForm(false)
  }
}

const styles = StyleSheet.create({
  cardStyle : {
    backgroundColor: 'beige',
    color: 'grey',
    fontFamily: "Papyrus",
    margin: '2px',
    border: '2px solid gray',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
  },

  linkStyle : {
    color: 'black',
    textDecoration: 'none',
    ':hover': {
      color: 'purple'
      
    }
  }
})





      return (
        <div>
           <Card className={css(styles.cardStyle)} >
          
          <Image cloudName="drblalgqw" publicId={thisPost.media} crop="scale" />
        
              <CardBody>
                  <CardTitle className="font-weight-bold text-center">  
                  <h5><Link className={css(styles.linkStyle)} exact to={`/yogaposes/${thisPost.pin_id}`}><b>#{thisPost.pin}</b></Link></h5>
                  </CardTitle>  
                  <p><b>by <Link exact to ={`/users/${thisPost.username}`}>@{thisPost.username}</Link></b></p>
                  <p>{thisPost.caption}</p>
                  {currentUser.username === thisPost.username ? 
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" onClick={showEdForm}>Edit Caption <FontAwesomeIcon icon={faEdit}/></button>
                    <button type="button" class="btn btn-danger" onClick={showDelForm}>Delete <FontAwesomeIcon icon={faTrashAlt}/></button>
                  </div>
                  : null}
                  
                  
              </CardBody>
          </Card>
          {showDeleteForm ? 
          <div className="post-form">
              <button className="btn btn-sm btn-secondary post-exit" onClick={hideDelForm} >X</button>
              <DeletePostForm deletePost={deletePost} thisPost={thisPost}/>
          </div> :
           null}  

          {showEditForm ?
     
         <div className="post-form">
           <button className="btn btn-sm btn-secondary post-exit" onClick={hideEdForm} >X</button>
           <EditPostForm updatePost={updatePost} thisPost={thisPost}/>  
          </div> :
           null}

        </div>
        
         

       
        )

}

export default Post

