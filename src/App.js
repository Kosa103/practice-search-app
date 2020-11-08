import { useState } from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import SearchBar from './modules/SearchBar';
import ResultBox from './modules/ResultBox';
import SearchHistory from './modules/SearchHistory';
import fetchSearchData from './modules/searchLogic';


function ErrorFallback({error}) {
  return (
    <div>
      <p>An error occured:</p>
      <pre>{error.message}</pre>
    </div>
  );
}


function App() {
  const defaultText = 'To search for people type a name\n into the search bar and press "SEARCH"';
  const loadingText = "LOADING";

  const [searchResult, setSearchResult] = useState(defaultText);


  function getRandomInt(min, max) {
    return (Math.random() * (max - min + 1) + min);
  }


  function startFetching() {
    const delay = getRandomInt(700, 1500);

    setSearchResult(loadingText);
    setTimeout(() => fetchData(), delay);
  }


  async function fetchData() {
    const searchData = await fetchSearchData();

    setSearchResult(searchData || defaultText);
  }

  return (
    <div className="main-app-box">
      <SearchBar fetchCommand={() => startFetching} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ResultBox searchResult={searchResult} />
      </ErrorBoundary>
      <SearchHistory />
    </div>
  );
}

export default App;
