import React from 'react';
import { addData } from '../../firebase/firebase';

const AddCourse = ({indexShowCourse, setIndexShowCourse, objectForm,setObjectForm,getCourse}) => {
  const handleClickAddCourse = async () => {
    if (objectForm.name && objectForm.name !== "") {
      await addData('course', objectForm)
      getCourse()
    } else {
      toast.warning('thêm course không thành công', {
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
    <div>
      <div onClick={() => setIndexShowCourse(-2 === indexShowCourse ? -1 : -2)} className={-2 === indexShowCourse ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white" : ""}>
        <button type="button" className="flex justify-center w-full px-4 py-3 text-lg font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className={-2 === indexShowCourse ? "border border-gray-200 py-8 px-5 grid place-items-center" : "hidden"}>
        <input type="text" value={objectForm.name} onChange={e => setObjectForm({ name: e.target.value })} className="block w-full py-4 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Name couse new" required />
        <button onClick={() => handleClickAddCourse()} className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5">Add course</button>
      </div>
    </div>
  );
};

export default AddCourse;