import { useState } from 'react';
import './App.css';
import SearchBar from './modules/SearchBar';
import ResultBox from './modules/ResultBox'
import setFetchSearchData from './modules/searchLogic';


function App() {
  const defaultText = 'To search for people type a name\n into the search bar and press "SEARCH"';
  const loadingText = "LOADING";
  const [searchResult, setSearchResult] = useState(defaultText);


  function getRandomInt(min, max) {
    return ( Math.random() * (max - min + 1) + min );
  }


  function startFetching() {
    const delay = getRandomInt(700, 1500);

    setSearchResult(loadingText);
    setTimeout(() => fetchData(), delay);
  }


  async function fetchData() {
    const searchData = await setFetchSearchData();

    setSearchResult(searchData || defaultText);
  }

  
  return (
    <div className="main-app-box">
      <SearchBar fetchCommand={() => startFetching} />
      <ResultBox searchResult={searchResult} />
    </div>
  );
}

export default App;
