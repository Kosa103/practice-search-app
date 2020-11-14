import React from 'react';

import { SearchHistoryContext } from '../App';


function SearchHistory() {
    const context = React.useContext(SearchHistoryContext);
    const history = context.history;
    const load = context.load;
  
  
    function renderSearchHistory() {
      if (history.length && Array.isArray(history)) {
        const list = history.map((person, index) => {
          return (
            <p key={`${person.id}-${index}`} 
               onClick={() => load(person.id)}
               className="search-history-element">
                 {person.name}
            </p>
          );
        });
        return list;
      } else {
        return (
          <p>No search history</p>
        );
      }
    }
  
    return (
        <div className="search-history-box">
            <h3>SEARCH HISTORY:</h3>
            {renderSearchHistory()}
        </div>
    );
}

export default SearchHistory;
