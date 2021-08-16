import React, { useContext} from "react";
import { useHistory} from "react-router-dom";
import UserContext from "./userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/fontawesome-free-solid';

function DeletePostForm({deletePost, thisPost}) {
  

  const currentUser=useContext(UserContext);
  const history = useHistory();
  
  const handleSubmit = evt => {
    evt.preventDefault()
    deletePost(currentUser.username, thisPost.id)
    history.push(`/`)
  }  

      return (
        
        <div  > 
          <br/>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                
              <form onSubmit={handleSubmit}>
                    <button style={{margin: '2px'}} className="btn btn-danger">Confirm <FontAwesomeIcon icon={faTrashAlt}/></button>
                    
              </form>
        </div>
        
      );
    
  }
  
  export default DeletePostForm;