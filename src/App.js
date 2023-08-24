import React, { useState } from "react";
import questions from "./data/gk.json";
import './App.css'
// "list-group-item"
// "list-group-item active"


// const getOptionClass = (qid, op, attempts) => {

//   let found = attempts.find(attempt => attempt.qid ===qid && attempt.op ===op);
//   if(found){
//   return "btn btn-primary"
//  }else {
//   return "btn btn-primary disabled";
//  }
// }

export default function App() {
  let [attempts, setAttempts] = useState([]);
  let [currentQuestion, setCurrentQuestion]=useState(0);
  const [score, setScore] = useState(0); // Keep track of selected options
  let [showResult, setShowResult] = useState(false)

  const handleOptionSelection = (qid, op) => {
    let attempt = {qid: qid, op: op};    
    setAttempts([...attempts, attempt]); // state update ?
    handleNextQuestion()
    handleAnswerButtonClick(op)
  }


    const handleAnswerButtonClick = (op) =>{
    const correct = op === questions[currentQuestion].answerIndex
    if(correct){
      setScore(score +1)
      console.log('correct')
      console.log(score)

    }else{
      console.log('wrong')
    }
  }
  const handleRestButton = ()=>{
  setScore(0);
  setCurrentQuestion(0)
  setShowResult(false)
  
  }
  const handleNextQuestion = ()=>{
    const nextQuestion = currentQuestion +1;    
    if(nextQuestion<questions.length){
      setCurrentQuestion(nextQuestion);
      
    }else{
      setShowResult(true)
    }
  }
 
  
  return (
    <>
    {!showResult ?
    <div className="container">
      <div style={{width:'100%',display:'flex', justifyContent: 'center'}}>
      <h1>Quiz</h1>
      </div>
      {questions[currentQuestion] && ( 
        <div>
          <div className="answerSection">
            <div style={{display:'flex', flexWrap:'wrap',background:'red',borderRadius:'4px',margin:'5px', color:'white', padding:'5px'}}><h5>Question {currentQuestion+1}/{questions.length} <h5>{questions[currentQuestion].statement}</h5></h5>         
</div>
          <ul className="list-group" >
            {questions[currentQuestion].options.map(op => (
              <li key={op}><button  
              className= 'list-group-item'       
                 // className={getOptionClass(questions[currentQuestion].id, op, attempts)}
              onClick={() => handleOptionSelection(questions[currentQuestion].id, op)}
            >
                {op}
              </button>
              </li>
            ))}
          </ul></div>
        </div>
      )}
      {/* <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button> */}
      {/* <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length }>Next</button> */}
    </div>
:  (<>
    <div className="resultDev">
      <h1> You scored {score} / out of {questions.length}</h1>
      <div>
        <button onClick={() =>handleRestButton()}>Try Again</button>
        </div>
    </div>
 </> )  }
    </>
  );
}
