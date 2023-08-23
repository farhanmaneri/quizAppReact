import React, { useState } from "react";
import questions from "./data/gk.json";
import './App.css'
// "list-group-item"
// "list-group-item active"


const getOptionClass = (qid, op, attempts) => {

  let found = attempts.find(attempt => attempt.qid ===qid && attempt.op ===op);
  if(found){
  return "list-group-item active"
 }else {
  return "list-group-item";

 }

}

export default function App() {
  let [attempts, setAttempts] = useState([]);
  let [currentQuestion, setCurrentQuestion]=useState(0);
  // const [selectedOptions, setSelectedOptions] = useState({}); // Keep track of selected options

  const handleOptionSelection = (qid, op) => {
    let attempt = {qid: qid, op: op};    
    setAttempts([...attempts, attempt]); // state update ?
    handleNextQuestion()
  }


    // const handleAnswerButtonClick = (answerOption) =>{
  //   console.log(answerOption)
  //   if(answerOption === questions[currentQuestion].answerIndex){
  //     console.log('correct')

  //   }else{
  //     console.log('wrong')
  //   }
   
  
  const handleNextQuestion = ()=>{
    const nextQuestion = currentQuestion +1;    
    if(nextQuestion<questions.length){
      setCurrentQuestion(nextQuestion);
    }else{
      alert('Quiz completed')
    }
  }
 
  
  return (
    <>
    <div className="container">
      <h1>GK Quiz</h1>
      {questions[currentQuestion] && ( 
        <div>
          <h4>{questions[currentQuestion].statement}</h4>
          <div className="answerSection">
          <ul className="list-group" >
            {questions[currentQuestion].options.map(op => (
              <li 
                key={op}
                className={getOptionClass(questions[currentQuestion].id, op, attempts)}
                onClick={() => handleOptionSelection(questions[currentQuestion].id, op)}
              >
                {op}
              </li>
            ))}
          </ul></div>
        </div>
      )}
      {/* <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button> */}
      {/* <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length }>Next</button> */}
    </div>
  </>
  );
}
