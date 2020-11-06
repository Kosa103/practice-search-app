import React from 'react';
import './ResultBox.css';


function ResultBox(props) {
    const searchResult = props.searchResult;


    function renderResult() {
        if (searchResult.length) {
            if (typeof (searchResult) === "object") {
                const person = searchResult[0];

                return (
                    <div className="text-separator-div">
                        <h3>Data of first matching person:</h3>
                        <hr/>
                        <p>{`Name: ${person.name}`}</p>
                        <hr/>
                        <p>{`Gender: ${person.gender}`}</p>
                        <hr/>
                        <p>{`Id: ${person.id}`}</p>
                    </div>
                );
            } else if (typeof(searchResult) === "string") {
                return (
                    <div className="text-separator-div">
                        <p>{searchResult}</p>
                    </div>
                );
            } else {
                console.log("Unknown error while rendering search result!")
            }

        } else {
            return (
                <div className="text-separator-div">
                    <p>No person found for the entered name!</p>
                </div>
            );
        }
    }


    return (
        <div className="result-box">
            <div className="result-text">
                {renderResult()}
            </div>
        </div>
    );
}


export default ResultBox;
