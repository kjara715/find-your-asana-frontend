import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardImg
  } from "reactstrap";
  import {Link} from "react-router-dom";
  import "./PoseCard.css";

  import { StyleSheet, css } from 'aphrodite';
  

function PoseCard({pose}) {

  const styles = StyleSheet.create({
      imageStyle : {
  
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
  })
      return (

       
             <section className="col-xl-3 col-lg-4 col-md-6">
                  <Link style={{textDecoration: 'none'}} to={`/yogaposes/${pose.id}`}>
                    <Card className="tile">
                    <CardImg className={css(styles.imageStyle)} src={pose.img_url} alt="Yoga Pose"/>
                    <CardBody >
                        <CardTitle className="font-weight-bold text-center">
                        <h5><b>{pose.english_name}</b></h5>
                        </CardTitle>
                    </CardBody>
                    </Card>
                </Link>
            </section>  
            )
}

export default PoseCard

