import React, {useState} from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardImg
    
  } from "reactstrap";
  import {Link} from "react-router-dom";
  import "./CategoryCard.css";
  import { StyleSheet, css } from 'aphrodite';
  
function CategoryCard({category}) {

  const [showCatDescription, setShowCatDescription] = useState(false);

    function showMe(){
      if(showCatDescription === false){
        setShowCatDescription(true)
      }
    }

    function hideMe(){
      if( showCatDescription === true){
        setShowCatDescription(false)
      }
    }


const styles = StyleSheet.create({
  cardStyle : {
    backgroundColor: 'beige',
    color: 'grey',
    fontFamily: "Papyrus",
    margin: '2px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
    
    ':hover': {
      backgroundColor: 'rgb(238, 238, 119)',
      color: 'purple',
      
    },

    imageStyle : {

      width: '100%',
      height: '300px',
      objectFit: 'cover'

    }
  }
})


      return (
        <section className="col-xl-3 col-lg-4 col-md-6" onMouseEnter={showMe} onMouseLeave={hideMe} >
          <Link style={{textDecoration: 'none'}}to={`/yogacategories/${category.id}`}>
          <Card className={css(styles.cardStyle)} >
            
            <CardImg className={css(styles.imageStyle)} src={require(`./images/${category.short_name}.jpg`).default} alt="None"/>
            {showCatDescription ? 
                <p className="post-description">{category.description}</p>
               : null}
               
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                      <h5><b>{category.name}</b></h5>  
                    </CardTitle>  
                </CardBody>
            </Card>
            </Link>
        </section>  
              
        )

}

export default CategoryCard

