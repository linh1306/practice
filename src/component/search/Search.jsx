import { async } from '@firebase/util';
import React from 'react';

const Search = ({valueSearch, setValueSearch, placeholder, nameButton, handleSearch}) => {
  const handleEnter = async (event) =>{
    if(event.key === 'Enter'){
      await handleSearch()
    }
  }
  return (
    <div>
      <div className="relative w-50">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i className="far fa-search"></i>
        </div>
        <input type="text" value={valueSearch} onChange={e => setValueSearch(e.target.value)} onKeyDown={(e) => handleEnter(e)} className="block w-full py-4 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{nameButton}</button>
      </div>
    </div>
  );
};

export default Search;