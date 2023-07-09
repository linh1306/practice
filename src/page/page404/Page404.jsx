import React, { useState } from 'react';
import Search from '../../component/search/Search';

const Page404 = () => {
  // return (
  //   <div className=' w-screen h-screen'>
  //     <div className='flex flex-row items-center bg-slate-50'>
  //       <div className='text-img w-36 h-40 rounded-[70px]'></div>
  //       <p className='text-img text-[180px] m-0 p-0 font-serif'><i className="fas fa-circle"></i>h</p>
  //     </div>
  //     <h3>phải chăng bạn đã đi lạc</h3>
  //   </div>
  // );
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [numStart, setNumStart] = useState(0)
  const handleSearch = async (value, event) => {
    if (!event || event.key === 'Enter') {
      try {
        const imageTypes = 'jpg';
        const imageSize = 'medium';
        const apiKey = 'AIzaSyAs4dCBMDRELYLfBDJGzuS8AsRaW2Q-VeE';
        const cx = '337b22accb1744b04';
        const numImages = 9;
        const url = `https://www.googleapis.com/customsearch/v1?cx=${cx}&key=${apiKey}&searchType=image&q=${query}&imgSize=${imageSize}&num=${numImages}&start=${(numStart + numImages) * value}&fileType=${imageTypes}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data)
        console.log(numStart)
        setNumStart((numStart + numImages) * value)
        if (data.items) {
          const imageLinks = data.items.map(item => item.link);
          setResults(imageLinks);
        }
      } catch (error) {
        console.error('Error searching images:', error);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className="relative w-80">
        <Search valueSearch={query} setValueSearch={setQuery} nameButton={'Search'} placeholder='từ điển' handleSearch={()=>handleSearch(0)}/>
      </div>
      {/* <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder='input' onKeyDown={(e) => handleSearch(0, e)} />
      <button onClick={() => handleSearch(0)}>Search</button> */}
      <div className='w-60'>
        <div className='w-full grid grid-cols-3 gap-1'>
          {results.map((link, index) => (
            <div key={index} className='aspect-square overflow-hidden bg-slate-300'>
              <img className='w-full h-full object-cover' src={link} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          {results.length > 0 && <button className='border-2 py-1 px-2 rounded-xl' onClick={() => handleSearch(1)}><i className="fas fa-sync-alt"></i></button>}
        </div>
      </div>
        
    </div>
  );
};


export default Page404;