import React, { useEffect, useState } from 'react';
import { addData, getData } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [showQuestionFalse, setShowQuestionFalse] = useState(false)
  const [selectOption, setSelectOption] = useState([])
  const [statusQuestion,setStatusQuestion]  = useState([])

  const getQuestion = async () => {
    let dataArray = await getData('question', 'idLesson', id)
    for (let i = 0; i < dataArray.length; i++) {
      dataArray[i].answers = shuffleArray([dataArray[i].answer, ...dataArray[i].wrongAnswer])
    }
    setSelectOption(new Array(dataArray.length).fill(null))
    setQuestion(dataArray)
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  console.log(statusQuestion)
  const handleSelectOption = (index, indexSelect, status) => {
    let arrSelectOption = selectOption
    let arrStatusQuestion = statusQuestion
    arrSelectOption[index] = indexSelect
    arrStatusQuestion[index] = status
    setSelectOption(arrSelectOption)
    setStatusQuestion(arrStatusQuestion)
  }
  const handleClickCheck = () => {
    if (selectOption.includes(null)) {
      toast.info('hãy làm hết các câu hỏi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setShowAnswer(true)
    }
  }
  console.log(selectOption)
  useEffect(() => {
    getQuestion()
  }, [])
  return (
    <div>
      <div className='w-full flex justify-center'>
        {showAnswer &&
          (<div>
            <button onClick={() => setShowQuestionFalse(!showQuestionFalse)} className={showQuestionFalse?"py-2 px-4 rounded-md bg-green-500":"py-2 px-4 rounded-md bg-red-500"}>hiển thị câu sai</button>
            <p className='text-center'>số câu đúng {statusQuestion.filter((value) => value === true).length}/{question.length}</p>
          </div>)}
      </div>
      {question.map((item, index) => (
        <div key={index}>
          {!showQuestionFalse || (showQuestionFalse && item.answer !== question[index].answers[selectOption[index]]) ?
            <div className='text-white my-4 shadow-2xl rounded-md bg-[#0f172a] overflow-hidden'>
              <div className='px-4 py-3 border-b-2 border-[#7e7e7e] flex justify-between'>
                <h3 className='font-bold'>{item.question}</h3>
                {showAnswer && (
                  item.answer === question[index].answers[selectOption[index]] ?
                    <i className="far fa-check-circle text-[#5ffe77]"></i>
                    :
                    <i className="far fa-times-circle text-[#ff2d45]"></i>
                )}
              </div>
              <div className='rounded-b-md pb-2'>
                {question[index].answers && question[index].answers.map((i, idx) => (
                  <div className='select-question mt-2 cursor-pointer' key={"item" + idx}>
                    {!showAnswer && <input type="radio" name={"radio-" + index} id={index + "-" + idx} hidden />}
                    <label
                      htmlFor={index + "-" + idx}
                      className={showAnswer ? (i === question[index].answer ? "w-full px-5 py-2 text-[#5ffe77] border-l-2 border-[#5ffe77]" : (selectOption[index] === idx ? 'w-full px-5 py-2 text-[#ff2d45] border-l-2 border-[#ff2d45]' : "w-full px-5 py-2")) : "w-full px-5 py-2 cursor-pointer"}
                      onClick={() => handleSelectOption(index, idx,i === question[index].answer)}
                    >
                      {i}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            :
            <div></div>
          }
        </div>)
      )}
      <div className='w-full flex justify-center'>
        {!showAnswer && <button className="bg-green-400 py-2 px-3 rounded-lg" onClick={() => handleClickCheck()}>Kiểm tra</button>}
      </div>
    </div>
  );
};

export default Question;