import React, {useState, useEffect} from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
  } from "reactstrap";

import YogaApi from  "./Api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import "./PoseDetails.css";
import NewPostForm from "./NewPostForm";
import Post from "./Post";

//need to add updatePost and deletePost to PoseDetails

function PoseDetails({createPost, updatePost, deletePost}) {

    const [pose, setPose] = useState({});
    const [showPostForm, setShowPostForm] = useState(false);
    const [showCartoon, setShowCartoon] = useState(true);
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(false);
    const [buttonText, setButtonText] = useState("Browse Posts")
   
    const {id} = useParams();

    function showMe(){
      if(showPostForm === false){
        setShowPostForm(true)
      }
    }

    function showUserPosts(){
      if(showPosts===false){
        setShowPosts(true);
        setButtonText('Hide posts')
      } else {
        setShowPosts(false)
        setButtonText('Browse posts')
      }
    }

    function hideMe(){
      if(showPostForm === true){
        setShowPostForm(false)
      }
    }

    function toggleImg(){
      showCartoon === true ? setShowCartoon(false): setShowCartoon(true)
    }

    async function getPose(id){
        let thisPose = await YogaApi.getPose(id);
        return thisPose
    }

    async function getPosts(id){
      let posts = await YogaApi.getPosts(id);
      return posts
    }

   

    async function setUp (id){
      const pose = await getPose(id);
      setPose(pose);
      const posts = await getPosts(pose.english_name);
      setPosts(posts)
      
    }

    useEffect(() => {
      setUp(id) 
    }, []);

   

      return (
        <div className="container details d-flex justify-content-center">
            <section className="col-md-8">
          <Card className="pose-card">
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                      <h5><b>{pose.english_name}</b></h5>
                    </CardTitle>
                  <CardText>
                      <p>Sanskrit name: {pose.sanskrit_name}</p>
                      <div className="pose-image">
                      {showCartoon ? <img style={{height: '400px'}}alt="Cartoon Yoga Pose" src={pose.img_url}/> : <img src={require(`./pose_images/${pose.english_name}.jpg`).default} alt="None"/> }
                      </div>
                      <br/>
                      <button className="btn btn-secondary" onClick={toggleImg}>Toggle Image</button>
                      <br/>
                      <br/>
                      
                  </CardText>
                </CardBody>
        </Card>
        <br/>
        <button  className="btn btn-success" onClick={showMe}>Share your {pose.english_name} <FontAwesomeIcon icon={faPlusCircle}/></button>
        <button  className="btn btn-primary" onClick={showUserPosts}>{buttonText}</button>
        {showPosts && <div>
          {posts[0] ? posts.map(post => (
          <Post key={post.id} thisPost={post} updatePost={updatePost} deletePost={deletePost}/> ))
       : <p>There are currently no posts for {pose.english_name}</p>} </div>}
       
        
        

        {showPostForm ?  <div className="post-form">
          <button className="btn btn-sm btn-danger post-exit"   onClick={hideMe}>X</button>
          <NewPostForm createPost={createPost} pin={pose.english_name} pinId={pose.id}/>
        </div> : null}
       
        
        </section>
        </div>
        
              
            )
}

export default PoseDetails