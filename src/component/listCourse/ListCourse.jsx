import React, { useEffect, useState } from 'react';
import { getData } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const ListCourse = () => {
  const [course, setCourse] = useState([])
  const [indexShow, setIndexShow] = useState(-1)
  const navigate = useNavigate()
  const getCourse = async () => {
    const listCourse = await getData('course');
    const promiseList = listCourse.map((element) => getData('lesson', 'idCourse', element.id));
    const listLesson = await Promise.all(promiseList);
    listCourse.forEach((element, index) => {
      element.lesson = listLesson[index];
    });
    setCourse(listCourse);
  }
  useEffect(() => {
    getCourse()
  }, [])

  const handleClickLesson = (href) => {
    console.log('href', href)
    navigate(href)
  }
  return (
    <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
      {course.map((item, index) => (
        <div key={index}>
          <h2 onClick={() => setIndexShow(index === indexShow ? -1 : index)} className={index === indexShow ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white" : ""}>
            <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
              <span>{item.name}</span>
                <i className={index === indexShow ? "fas fa-angle-down rotate-180" : "fas fa-angle-down"}></i>
              {/* <svg className={index === indexShow ? "w-6 h-6 rotate-180 shrink-0" : "w-6 h-6 shrink-0"} ><i class="far fa-sort-down"></i></svg> */}
            </button>
          </h2>
          <div className={index === indexShow ? "" : "hidden"}>
            {item.lesson ? item.lesson.map((i) => (
              <div key={i.id} className="px-4 py-3 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 cursor-pointer">
                <div onClick={() => handleClickLesson('/lesson/' + i.id)}><i className="fas fa-circle text-xs mr-2"></i>{i.name}</div>
              </div>
            )) : <div>không có bài học</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCourse;
