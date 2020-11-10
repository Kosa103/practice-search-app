import * as React from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import SearchBar from './modules/SearchBar';
import ResultBox from './modules/ResultBox';
// import SearchHistory from './modules/SearchHistory';
import fetchSearchData from './modules/searchLogic';


const SearchHistoryContext = React.createContext([]);


function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div className="error-box" onClick={resetErrorBoundary}>
      <p className="error-pre-message">An error occured:</p>
      <pre className="error-message">{error.message}</pre>
      <p className="error-post-message">Click on this message to reset the display.</p>
    </div>
  );
}


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


function App() {
  const defaultText = 'To search for people type a name\n into the search bar and press "SEARCH"';
  const loadingText = "LOADING";

  const [searchResult, setSearchResult] = React.useState(defaultText);
  const [searchHistory, setSearchHistory] = React.useState([]);


  function getRandomInt(min, max) {
    return (Math.random() * (max - min + 1) + min);
  }


  function startFetching() {
    const delay = getRandomInt(700, 1500);

    setSearchResult(loadingText);
    setTimeout(() => fetchData(), delay);
  }


  async function fetchData() {
    const newSearchHistory = searchHistory;

    const searchData = await fetchSearchData();

    if (searchData) {
      if (!!searchData.length && Array.isArray(searchData)) {
        newSearchHistory.unshift(searchData[0]);
        setSearchHistory(newSearchHistory);
      }
    }

    setSearchResult(searchData || defaultText);
  }


  function loadPersonFromCache(id) {
    let cachedPerson = null;

    for (const person of searchHistory) {
      if (person.id === id) {
        cachedPerson = person;
        break;
      }
    }

    setSearchResult([cachedPerson]);
  }


  return (
    <div className="main-app-box">
      <SearchBar fetchCommand={() => startFetching} />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => setSearchResult(defaultText)}>
        <ResultBox searchResult={searchResult} />
      </ErrorBoundary>
      <SearchHistoryContext.Provider value={{history: searchHistory, load: loadPersonFromCache}}>
        <SearchHistory />
      </SearchHistoryContext.Provider>
    </div>
  );
}

export default App;
