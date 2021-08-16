import React, {useState, useEffect} from "react";
import CategoryCard from './CategoryCard';
import YogaApi from  "./Api";
import "./CategoryList.css"


function CategoryList() {

    const [categories, setCategories] = useState([]);
    

    async function getCategories(){
      let yogaCategories = await YogaApi.getYogaCategories();
      setCategories(yogaCategories)
    };

    useEffect(() => {
        getCategories()
       }, []);

    return (
        <div >
          <div className="d-flex row"> 
          <br/>
            {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
        </div>
        );
  }
  //justify-content-center container 
  
  export default CategoryList;
  