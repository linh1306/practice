import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteData, getData } from '../../firebase/firebase';

const LinkLesson = ({ i, index, setCourse, course }) => {
  const navigate = useNavigate()
  const handleClickLesson = (href) => {
    navigate(href)
  }
  const handleDeleteLesson = async (id, index) => {
    await deleteData('lesson', id)
    const listLesson = await getData('lesson', 'idCourse', course[index].id)
    let tmpArr = [...course]
    tmpArr[index].lesson = listLesson
    setCourse(tmpArr)
  }
  return (
    <div className="relative flex justify-between border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 cursor-pointer">
      <input type="checkbox" id={index + i.id} hidden />
      <div className='boxshow flex justify-between w-full bg-white px-4 py-3 z-10'>
        <div className='flex-1' onClick={() => navigate('/'+i.typeLesson+'/' + i.id)}>
          <i className="fas fa-circle text-xs mr-2"></i>{i.name}
        </div>
        <label htmlFor={index + i.id} className='bg-zinc-200 w-6 text-center rounded-full cursor-pointer'><i className="fas fa-ellipsis-v"></i></label>
      </div>
      <div className='absolute right-1 top-2'>
        <button onClick={() => handleDeleteLesson(i.id, index)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg px-3 py-2 text-xs">Delete</button>
      </div>
    </div>
  );
};

export default LinkLesson;