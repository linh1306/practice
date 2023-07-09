import React from 'react';
import { addData, getData } from '../../firebase/firebase';
import { toast } from 'react-toastify';

const AddLessonOrDeleteCourse = ({showAddlessonOrDelete, setShowAddlessonOrDelete,objectForm, setObjectForm, getCourse, setCourse, index, course}) => {
  const handleDeleteCourse = async (id) => {
    await deleteData('course', id)
    getCourse()
  }
  const handleAddLesson = async (index) => {
    objectForm.idCourse = course[index].id
    if (objectForm.name !== '') {
      await addData('lesson', objectForm)
      const listLesson = await getData('lesson', 'idCourse', course[index].id)
      let tmp = [...course]
      tmp[index].lesson = listLesson
      setCourse(tmp)
    } else {
      toast.warning('thêm lesson không thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div className="flex flex-col items-center px-4 py-3 border border-b-0 border-gray-200">
      <div className='w-64 flex justify-between mb-4 text-sm font-medium'>
        <button disabled={showAddlessonOrDelete === 0} onClick={() => setShowAddlessonOrDelete(0)} className={showAddlessonOrDelete === 0 ? "text-white bg-zinc-700 rounded-lg px-4 py-2.5" : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2.5"}>Add Lesson</button>
        <button disabled={showAddlessonOrDelete === 1} onClick={() => setShowAddlessonOrDelete(1)} className={showAddlessonOrDelete === 1 ? "text-white bg-zinc-700 rounded-lg px-4 py-2.5" : "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg px-4 py-2.5"}>Delete course</button>
      </div>
      <div className={showAddlessonOrDelete === 0 ? 'w-64 p-2 relative' : "hidden"}>
        <div onClick={() => setShowAddlessonOrDelete(-1)} className='absolute right-[-4px] top-[-12px] cursor-pointer'><i className="fas fa-times"></i></div>
        <input type="text" onChange={e => setObjectForm({ name: e.target.value, typeLesson: objectForm.typeLesson })} className="block w-full p-2.5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Name lesson new" />
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select type lesson</label>
        <select onChange={e => setObjectForm({ name: objectForm.name, typeLesson: e.target.value })} value={objectForm.typeLesson} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="question">question</option>
          <option value="essay">essay</option>
        </select>
        <button onClick={() => handleAddLesson(index)} className="text-white block mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2.5 mx-auto">Add Lesson</button>
      </div>
      <div className={showAddlessonOrDelete === 1 ? 'w-64 p-2 relative flex flex-col items-center  font-medium' : "hidden"}>
        <div onClick={() => setShowAddlessonOrDelete(-1)} className='absolute right-[-4px] top-[-12px] cursor-pointer'><i className="fas fa-times"></i></div>
        <h3 className='text-center mb-4'>Bạn có chắc chắn muốn xóa course này không</h3>
        <button onClick={() => handleDeleteCourse(item.id)} className="text-white mx-1 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-4 py-2.5">Delete course</button>
      </div>
    </div>
  );
};

export default AddLessonOrDeleteCourse;