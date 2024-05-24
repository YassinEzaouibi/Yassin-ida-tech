// eslint-disable-next-line no-unused-vars
import React, {useRef, useState} from 'react'
import './Quiz.css'
import {data} from '../../assets/data.js'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);

    let options1 = useRef(null);
    let options2 = useRef(null);
    let options3 = useRef(null);
    let options4 = useRef(null);

    let option_array = [options1, options2, options3, options4];

    const checkAns = (e, ans) => {
        if(lock === false){
            if(question.ans === ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev=>prev + 1)
            }else{
                e.target.classList.add("wrong")
                setLock(true)
                option_array[question.ans-1].current.classList.add("correct")
            }
        }

    }

    const next = () => {
        if(lock===true){
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) =>{
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
                return null;
            })
        }
    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={options1}  onClick={(e)=>{checkAns(e, 1)}}>{question.option1}</li>
                <li ref={options2}  onClick={(e)=>{checkAns(e, 2)}}>{question.option2}</li>
                <li ref={options3}  onClick={(e)=>{checkAns(e, 3)}}>{question.option3}</li>
                <li ref={options4}  onClick={(e)=>{checkAns(e, 4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className='index'>{index+1} of {data.length} questions</div>
        </div>
    )
}

export default Quiz