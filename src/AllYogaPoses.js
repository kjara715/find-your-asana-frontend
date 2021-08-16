import React, {useState, useEffect} from "react";
import PoseCard from './PoseCard';
import YogaApi from  "./Api";
import "./AllYogaPoses.css"


function AllYogaPoses() {

    const [poses, setPoses] = useState([]);

    async function getAllPoses(){
        let poses = await YogaApi.getAllPoses();
        setPoses(poses)
      }


    useEffect(() => {
        getAllPoses()
       }, []);

    return (
        <div >
            <br/>
          <div className="d-flex row "> 
          <h2 style={{fontFamily: "Papyrus", justifyContent: "center", margin: 'auto',
            textAlign: 'center'}}><b>Yoga Poses</b></h2>
          <br/>
            {poses.map(pose => (
                <PoseCard key={pose.id} pose={pose} />
            ))}
          </div>
          
        </div>
        );
  }
  
  
  export default AllYogaPoses;