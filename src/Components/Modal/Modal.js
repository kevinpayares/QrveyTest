import React from "react";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

class Modal extends React.Component{

    constructor(){
        super();

        this.state = {
            isFavorite: false
        }

        this.addToFavorite = this.addToFavorite.bind(this);
    }

    
    addToFavorite(){
        let nameCountry = this.props.countryDetail.name.common;
        let index;
        let listFavorite = JSON.parse(localStorage.getItem('listFavorite'));
        if(listFavorite != null && listFavorite.includes(nameCountry)){
            
            this.setState({isFavorite: false})
            index = listFavorite.indexOf(nameCountry);
            listFavorite.splice(index, 1);
            localStorage.setItem('listFavorite', JSON.stringify(listFavorite));

        }else{
            
            this.setState({isFavorite: true})

            if(listFavorite == null){
                listFavorite= [];
            }

            listFavorite.push(nameCountry);
            localStorage.setItem('listFavorite', JSON.stringify(listFavorite));

        }
    }

    render(){

        if(this.props.showModal){

            let listFavorite = JSON.parse(localStorage.getItem('listFavorite'));
            let countryDetail = this.props.countryDetail
            let currencie = countryDetail.hasOwnProperty("currencies") ? Object.values(countryDetail.currencies)[0].name : "";
            let languages = countryDetail.hasOwnProperty("languages") ? Object.values(countryDetail.languages)[0] : "";
            let population = parseInt(countryDetail.population / 1000000);
            let listCountry = "";
            let colorStar = this.state.isFavorite ? "#FFD700" : "#0000000d";

            if(listFavorite != null && listFavorite.includes(countryDetail.name.common)){
                colorStar = "#FFD700";
            }else{
                colorStar = "#0000000d";
            }
            
            if(countryDetail.borders){
                listCountry = countryDetail.borders.toString()+"."
            }
            
            return(
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={this.props.closeModal}>&times;</span>

                        <p className={styles.title}>{countryDetail.name.common} 
                            <FontAwesomeIcon icon={faStar} color={colorStar} 
                            onClick={this.addToFavorite}/>
                        </p>

                        <p className={styles.textField}><b>Region:</b> {countryDetail.region}</p>
                        <p className={styles.textField}><b>Population:</b> {population}M</p>
                        <p className={styles.textField}><b>Capital:</b> {countryDetail.capital}</p>
                        <p className={styles.textField}><b>Currency:</b> {currencie}</p>
                        <p className={styles.textField}><b>Language:</b> {languages}</p>
                        <p className={styles.textField}><b>Border Countries:</b>{listCountry}</p>
                        <p className={styles.textField}><b>Flag:</b></p>
                        <img className={styles.flag} src={countryDetail.flags[0]}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

export default Modal