import React from "react";
import styles from "./CountryStyle.module.css";


class Country extends React.Component {

    constructor() {
        super();
    }


    render(){
        return(
            <div>
                <div className={styles.containerItem}> 
                    <img className={styles.img} src={this.props.img}/>
                </div>
                <div className={styles.containerItem}>
                    <p className={styles.text}>{this.props.name}</p>
                </div>
            </div>
        )
    }

}

export default Country
