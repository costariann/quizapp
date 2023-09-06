import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import quizData from './Quiz';
import { initialResult } from './Quiz';

function App() {
  const[currentQuestion, setCurrentQuestion] = useState(0)
  
  const {questions} = quizData
  const {question, choices, correctAnswer} = questions[currentQuestion]
  const [answerIndex, setAnswerIndex] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [result, setResult]=useState(
  {
  score: 0,
  correctAnswer: 0,
  wrongAnswer: 0
  }
  )
const [showResult, setShowResult] =useState(false)
  
  const onSelect = (answer, index) => {
    setAnswerIndex(index);
   if (answer === correctAnswer) {
    setAnswer(true)
   } else{
    setAnswer(false)
   }
  }

  const onNextQuestion = () => {
    setAnswerIndex(null);
    setResult((prev) => 
    answer ? {
       ...prev,
       score: prev.score + 5,
       correctAnswer: prev.correctAnswer + 1,
 
    } : {
      ...prev,
      wrongAnswer: prev.wrongAnswer + 1
    }
      );

      if (currentQuestion !== questions.length -1) {
         setCurrentQuestion((prev)=> prev + 1)
      }else{
        setCurrentQuestion(0)
        setShowResult(true)
      }

  }

  const onReset = () => {
    setResult({
      score: 0,
      correctAnswer: 0,
      wrongAnswer: 0
      });
      setShowResult(false);
  }


  const beginningZero = (number) => number > 9 ? number : `0${number}`
  
  return (
    <div className="quiz-container">
    {!showResult ? (<>
    <span className="active-quiz-no">{beginningZero(currentQuestion + 1)}</span>
    <span className="total-quiz-no">/{beginningZero(questions.length)}</span>
    
    <h2>{question}</h2>
    <ul>
     {choices.map((answer,index) => 
     (<li key={answer} onClick={() => onSelect(answer,index)}
     className={answerIndex === index ? 'selected-answer' : null}>
     {answer}
     </li>))}
    </ul>
    <div className='btn'>
      <button onClick={onNextQuestion} disabled={answerIndex === null}>
        {currentQuestion === questions.length - 1 ? 'Done' : 'Next'}
      </button>
    </div>
    </>): <div className='result'>
      <h3>Your Result</h3>
       <p>
        Total Question: <span>{question.length}</span>
        </p>
       <p>
        Total Score: <span>{result.score}</span>
        </p>
        <p>
        Correct Answer: <span>{result.correctAnswer}</span>
        </p>
        <p>
        Wrong Answer: <span>{result.wrongAnswer}</span>
        </p>
       
       <div className='remarks'> 
        {result.score >= 20 ? 'Great Job!' : 'Not Encouraging'}
        <div >
          <button className='btn' onClick={onReset}>Try Again</button>
        </div>
       </div>
      </div>}
    </div>
  
  );
}

export default App;
