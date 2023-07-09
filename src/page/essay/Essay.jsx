import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddEssayItem from './AddEssayItem';
import { getById, getData } from '../../firebase/firebase';

const Essay = () => {
  const { id } = useParams();
  const [essays, setEssays] = useState([])
  const [newEssay, setNewEssay] = useState({ value: '', title: 'text' })

  useEffect(() => {
    const getEssays = async () => {
      const data = await getById('essay', id)
      setEssays(data.items)
    }
    getEssays()
  }, [])
  return (

    <div>
      <div>
        {essays.map((item, index) => (
          <div key={index}>
            {item.title === 'title' &&
              <h3 className='font-medium text-xl text-center'>{item.value}</h3>
            }
            {item.title === 'text' &&
              <p className='indent-5 first-letter:uppercase'>{item.value}</p>
            }
            {item.title === 'img' &&
              <img src={item.value} alt="img on firebase" />
            }
          </div>
        ))}
      </div>
      <AddEssayItem id={id} index={-1} essays={essays} setEssays={setEssays} newEssay={newEssay} setNewEssay={setNewEssay} />
    </div>
  );
};

export default Essay;