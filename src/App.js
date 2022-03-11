import React from "react";
import Country from "./Components/Country";
import InputSearch from "./Components/InputSearch"
import styles from "./App.module.css";
import Modal from "./Components/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            ListCountry: [],
            ListCountryAux: [],
            ListContinent: [],
            ListContinentAux: [],
            conuntryDetailModal: null,
            showModal: false, 
            anyData: true
        }

        this.searchCountry = this.searchCountry.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidMount () {
        fetch("https://restcountries.com/v3/all")
        .then((res) => res.json())
        .then((ListCountry) => this.setState({  ListCountry: ListCountry,
                                                ListCountryAux: ListCountry,
                                                ListContinent: [...new Set(ListCountry.map(item => item.region))],
                                                ListContinentAux: [...new Set(ListCountry.map(item => item.region))]
        }))
    }

    searchCountry (data, typeSearch){
        let newListCountry;
        if(typeSearch === "Show All"){
            
            if(data !== ""){
                newListCountry = this.state.ListCountryAux.filter(c => c.name.common.toLowerCase().includes(data))
            }else{
                newListCountry = this.state.ListCountryAux
            }

        }else if(typeSearch === "Favorites"){
            newListCountry = this.state.ListCountryAux
            
        }else{
            
            if(data !== ""){
                newListCountry = this.state.ListCountryAux.filter(c => c.name.common.toLowerCase().includes(data) && c.region === typeSearch)
            }else{
                newListCountry = this.state.ListCountryAux.filter(c => c.region === typeSearch)
            }
        }
        if(newListCountry.length == 0){
            this.setState({anyData: false})

        }else{
            this.setState({anyData: true})

        }

         this.setState({ListCountry: newListCountry, 
                        ListContinent: [...new Set(newListCountry.map(item => item.region))]
                     })
    }

    openModal(data) {
        this.setState({conuntryDetailModal: data})

         if(this.state.showModal){
             this.setState({showModal: false})
         }else{
             this.setState({showModal: true})
         }
    }

    closeModal(){
        if(this.state.showModal){
            this.setState({showModal: false})
        }else{
            this.setState({showModal: true})
        }
    }

    render(){
        return(
            <div>
                <div>
                    <Modal  showModal={this.state.showModal} 
                            countryDetail={this.state.conuntryDetailModal}
                            closeModal = {this.closeModal}
                            handleFavorite = {this.handleFavorite}
                            ListFavoriteCuntry = {this.state.ListFavoriteCuntry}
                    />
                </div>

                <div className={styles.box}>
                    <div>
                        <h1 className={styles.text}>Find any <b className={styles.textAqua}>country</b> in the world</h1>
                    </div>
                </div>

                <img src="./img/planet.png" className={styles.imgWorld}></img>
                
                <div className={styles.containerInput}>
                    <div className={styles.InputPosition}>
                        <InputSearch    placeholder="Seach Country" 
                                        callback ={this.searchCountry} 
                                        ListContinent = {this.state.ListContinentAux}
                        />
                    </div>
                </div>
                <div className={styles.containerCountriesBody}>
                    <div className={styles.containerCountries}>
                        {
                            this.state.ListContinent.sort((a, b) => a > b ? 1 : -1).map((countient, index)=>{
                                return(
                                    <div key={index} className={styles.container}>
                                        <h1 className={styles.title}>{countient}</h1>
                                        {this.state.ListCountry.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
                                        .map((country, index)=>{
                                            if(country.region === countient){
                                                return(
                                                    <div key={index} className={styles.countryItem} 
                                                         onClick={() => this.openModal(country)} title={country.name.common}> 
                                                        <Country    name={country.name.common}
                                                                    img = {country.flags[0]}
                                                        />
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            })
                            
                        }

                        {
                            !this.state.anyData ? <div className={styles.noData}>No results found</div> : <div></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default App