import React, {useState, useEffect} from "react"; 
import YogaApi from  "./Api";
import PoseCard from "./PoseCard"
import { useParams } from "react-router-dom";
import "./CategoryDetails.css"
 
 

function CategoryDetails() {

    const [category, setCategory] = useState({});

    const {id} = useParams();

    async function getCategory(id){
        let thisCategory = await YogaApi.getCategory(id);
        setCategory(thisCategory)
    }

    useEffect(() => {
        getCategory(id)
    }, [id]);

      return (
        <div className="category-details">
            <br/>
            <h2>{category.name}</h2>
            <h4>{category.description}</h4>
            <div className=" d-flex justify-content-center row "> 
            <br/>
        {category.yoga_poses && category.yoga_poses.map(pose => (
            <>
             <PoseCard key={pose.id} pose={pose}/>
            <br/>
            </>
        ))}
        </div>
        </div>
        
        )
}

export default CategoryDetails

