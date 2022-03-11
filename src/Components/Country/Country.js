import React from "react";
import styles from "./CountryStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

class Country extends React.Component {

    constructor() {
        super();
    }


    render(){

        let colorStar = "#0000000d";

        if(this.props.isFavorite){
            colorStar = "#FFD700";
        }

        return(
            <div>
                
                <div className={styles.containerItem}> 
                    <img className={styles.img} src={this.props.img}/>
                </div>

                <div className={styles.containerItem}>
                    <p className={styles.text}>{this.props.name} <FontAwesomeIcon icon={faStar} color={colorStar}/> </p>
                    
                </div>
            </div>
        )
    }

}

export default Country
