import Routes from './Routes';
import NavBar from './NavBar';
import React, {useState, useEffect} from "react";
import YogaApi from "./Api";
import jwt from "jsonwebtoken";
import useLocalStorageState from './hooks/useLocalStorageState';
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";
import './App.css'

function App() {

  const history = useHistory();

  const [token, setToken] = useLocalStorageState("");
  const [currentUser, setCurrentUser] = useState("");
  const [newPost, setNewPost] = useState("");
  const [updatedUser, setUpdatedUser]=useState("");
  
 
  useEffect(function () {
    
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          YogaApi.token = token;
          let currentUser = await YogaApi.getUser(username);
          setCurrentUser(currentUser);
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      //setInfoLoaded(true);
    }

    //setInfoLoaded(false);
    getCurrentUser();
  }, [token, newPost, updatedUser]);


 

  async function signUp (userData){
    let myToken = await YogaApi.signUp(userData);
    setToken(myToken);          
  }

  async function login (userData){
      
    let myToken = await YogaApi.login(userData);
    if(myToken){
      setToken(myToken); 
    } else {
      alert("Invalid username/password.")
    }
           
}

async function logout () {
  alert(`Goodbye ${currentUser.username}`)
  setCurrentUser("");
  setToken("");
  history.push("/")
}

async function updateUser(username, userData){
  let user = await YogaApi.updateUser(username, userData);
  setUpdatedUser(user);
}

async function createPost(username, postData){
  let post = await YogaApi.createPost(username, postData);
  setNewPost(post);
}

async function deletePost(username, id){
  await YogaApi.deletePost(username, id);
  console.log(`post ${id} has been deleted`);
  if(!newPost){
    setNewPost("none")
  } else {
    setNewPost("")
  }
  
}

async function deleteUser(username){
  await YogaApi.deleteUser(username);
  setCurrentUser("");
}



async function updatePost(username, id, patchData){
  let post = await YogaApi.updatePost(username, id, patchData);
  setNewPost(post);
}



  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
      <NavBar logout={logout}/>
      <Routes signup={signUp} login={login} updateUser={updateUser} createPost={createPost} deletePost={deletePost} updatePost={updatePost} deleteUser={deleteUser}   />
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
