import React from 'react';

const InsertQuestion = () => {
  const [text, setText] = useState("")
  const chiaText = async () => {
    let data = []
    let i = 0
    const lines = text.split('\n');
    while (i < lines.length) {
      data.push({
        idLesson: id,
        question: lines[i],
        answer: lines[i + 1],
        wrongAnswer: [
          lines[i + 2],
          lines[i + 3],
          lines[i + 4]
        ]
      })
      i += 6
    }
    console.table(data)
    for (let index = 0; index < data.length; index++) {
      await addData('question', data[index])
    }
  }
  return (
    <div>
      <div>
        <textarea cols="30" rows="10" onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={() => chiaText()}>chiaText</button>
      </div>
    </div>
  );
};

export default InsertQuestion;