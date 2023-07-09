import React, { useState } from 'react';
import { uploadImage } from '../../firebase/firebaseStore';
import { addData } from '../../firebase/firebase';

const AddEssayItem = ({ id, index, essays, setEssays, newEssay, setNewEssay }) => {
  const [fileImg, setFileImg] = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImg(file)
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEssay({ value: e.target.result, title: newEssay.title });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAdd = async() => {
    if(newEssay.value && newEssay.value !== ''){
      if(index===-1){
        setNewEssay({ value: '', title: 'text' })
        setEssays([...essays, newEssay])
        const tmpNewEssay = newEssay
        if(tmpNewEssay.title === 'img'){
           const data = await uploadImage(fileImg)
           tmpNewEssay.value = data
        }
        console.log(tmpNewEssay)
        await addData('essay',{items:[...essays, tmpNewEssay]},id)
      }
    }
  }
  return (
    <div className='flex flex-col'>
      <select onChange={e => setNewEssay({ value: newEssay.value, title: e.target.value })} value={newEssay.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="text">text</option>
        <option value="img">img</option>
        <option value="title">title</option>
      </select>
      <div>
        {newEssay.title === 'text' &&
          <textarea value={newEssay.value} className='w-full p-3 border-[3px] whitespace-pre-wrap' placeholder='văn bản' onChange={e => setNewEssay({ value: e.target.value, title: newEssay.title })} ></textarea>
        }
        {newEssay.title === 'img' &&
          <div>
            <label htmlFor="inputImg">thêm hình ảnh</label>
            <input type="file" onChange={handleImageChange} typeof='png, jpg' id='inputImg' hidden />
            {newEssay.value !== '' && (
              <div>
                <img src={newEssay.value} alt="Hình ảnh" />
              </div>
            )}
          </div>
        }
        {newEssay.title === 'title' &&
          <input type="text" placeholder='tiêu đề' onChange={e => setNewEssay({ value: e.target.value, title: newEssay.title })} />
        }
      </div>
      <div>
        <button onClick={() => handleAdd()} className='px-3 py-2 text-white bg-blue-400 rounded-md'>add</button>
      </div>
    </div>
  );
};

export default AddEssayItem;