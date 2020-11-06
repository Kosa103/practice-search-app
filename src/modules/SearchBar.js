import React from 'react';
import './SearchBar.css';


function SearchBar(props) {
    const fetchCommand = props.fetchCommand;

    return (
        <div className="search-box">
            <div className="search-input-box">
                <input className="search-input-field" id="search-input"></input>
            </div>
            <div className="search-button-box">
                <button className="search-input-button" onClick={fetchCommand()}>SEARCH</button>
            </div>
        </div>
    );
}

export default SearchBar;
