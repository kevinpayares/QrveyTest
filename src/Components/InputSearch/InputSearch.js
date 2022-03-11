import React from "react";
import styles from "./InputSearch.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

class InputSearch extends React.Component {

    constructor(){
        super();
        
        this.state = {
            selectValue: "Show All"
        }
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    inputRef = React.createRef();

    handleSearch(){
        this.props.callback(this.inputRef.current.value, this.state.selectValue);
    }

    handleSelect (event){
        this.setState({selectValue: event.target.value})
    }

    render(){
        return(
            <div>
                
                    <div className={styles.box}>
                        <input  className={styles.inputText}
                                ref={this.inputRef}
                                placeholder={this.props.placeholder} 
                        />
                        <select className={styles.selectBox} value={this.state.selectValue} onChange={this.handleSelect}>
                            <option value="Show All">Show All</option>
                            <option value="Favorites">Favorites</option>
                            {this.props.ListContinent.map((item) =>{
                                return(
                                        <option key={item} value={item}>{item}</option>
                                )
                            })}
                                
                            </select>
                                <button className={styles.btnSeacrh} onClick={this.handleSearch}>
                                    <div className={styles.containerIcon}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} size={"2x"} />
                                    </div>
                            </button>
                    </div>
            </div>
        )
    }
}


export default InputSearch