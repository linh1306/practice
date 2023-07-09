import React, { useEffect, useState } from 'react';
import { addData, deleteData, getData } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import LinkLesson from './LinkLesson';
import AddCourse from './AddCourse';
import AddLessonOrDeleteCourse from './AddLessonOrDeleteCourse';

const ListCourse = () => {
  const [course, setCourse] = useState([])
  const [indexShowCourse, setIndexShowCourse] = useState(-1)
  const [objectForm, setObjectForm] = useState({ name: '', typeLesson: 'question' })
  const [showAddlessonOrDelete, setShowAddlessonOrDelete] = useState(-1)    // xác định show khối div addlesson hay delete course
  const getCourse = async () => {
    const listCourse = await getData('course');
    setCourse(listCourse);
  }

  useEffect(() => {
    getCourse()
  }, [])
  const handleClickCourse = async (valueNewIndexShowCourse, index) => {
    if (course[index] && !course[index].lesson) {
      const listLesson = await getData('lesson', 'idCourse', course[index].id)
      course[index].lesson = listLesson
      setCourse(course)
    }
    setIndexShowCourse(valueNewIndexShowCourse)
    setShowAddlessonOrDelete(-1)
  }

  return (
    <div className='mx-auto'>
      <div className='max-w-lg mx-auto'>
        {course.map((item, index) => (
          <div key={index}>
            <div onClick={() => handleClickCourse(index === indexShowCourse ? -1 : index, index)} className={index === indexShowCourse ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white mb-1" : ""}>
              <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200  dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                <span>{item.name}</span>
                <i className={index === indexShowCourse ? "fas fa-angle-down rotate-180" : "fas fa-angle-down"}></i>
              </button>
            </div>
            <div className={index === indexShowCourse ? "" : "hidden"}>
              {item.lesson ? item.lesson.map((i) => (
                <LinkLesson key={i.id} i={i} index={index} setCourse={setCourse} course={course} />
              )) : <div></div>}
              <AddLessonOrDeleteCourse course={course} showAddlessonOrDelete={showAddlessonOrDelete} setShowAddlessonOrDelete={setShowAddlessonOrDelete} objectForm={objectForm}  setObjectForm={setObjectForm}  getCourse={getCourse} setCourse={setCourse} index={index}/>
            </div>
          </div>
        ))}
        <AddCourse indexShowCourse={indexShowCourse} setIndexShowCourse={setIndexShowCourse} objectForm={objectForm} setObjectForm={setObjectForm} getCourse={getCourse} />
      </div>
    </div>
  );
};

export default ListCourse;
