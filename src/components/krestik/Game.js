import Board from "./Board";
import styles from './Game.module.css';
import { useReducer } from 'react';

const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function proverka(arr, state) {
    let bool = false;
    for (let i = 0; i < arr.length; i++) {
        let masiv = arr[i];
        if (state[masiv[0]] !== '' && state[masiv[1]] !== '' && state[masiv[2]] !== '') {
            if (state[masiv[0]] === state[masiv[1]] && state[masiv[1]] === state[masiv[2]]) {
                return state[masiv[0]];
            }
        }
    }
    if(isArr(state, '')){
        bool = true;
    }
    if(bool){
        return 'ничья';
    }
    return;
}



function isArr(arr, num){
    for(let i=0;i<arr.length;i++){
        if(arr[i] === num){
            return false;
        }
    }
    return true;
}



const arr = [
    '', '', '',
    '', '', '',
    '', '', ''
];

function reduceArrState(prevState, action){
    if(action.type === 'ADD'){
        let newArr = prevState.stateArr.map((elem, index)=>{
            if(action.index === index){
                if(prevState.bool !== true){
                    return 'x';
                } else {
                    return '0';
                }
            } else {
                return elem;
            }
        });

        let w = proverka(winArr, newArr);
        let krestik = prevState.krestik;
        let nolik = prevState.nolik;
        if(w === 'x'){
            krestik++;
        }
        if(w === '0'){
            nolik++;
        }
        return {
            ...prevState,
            bool: !prevState.bool,
            stateArr: newArr,
            win: w,
            krestik: krestik,
            nolik: nolik,
            nicha: w === 'ничья' ? prevState.nicha + 1:0,
            reset: true
        }
    }
    if(action.type === 'RESET'){
        return {
            ...prevState,
            stateArr: prevState.stateArr.map((elem)=>{
                return '';
            }),
            win: undefined,
            reset: false,
            bool: false
        }
    }
}
      

function Game() {

    const [arrState, dispatchArrState] = useReducer(reduceArrState, {
        win: undefined,
        stateArr: arr,
        bool: false,
        krestik: 0,
        nolik: 0,
        nicha: 0,
        reset: false
    });


    function handleClick(index) {
        if(arrState.win !== undefined){
            return;
        }
        dispatchArrState({
            type: 'ADD',
            index: index
        })
    }

    function resetArr(){
        dispatchArrState({
            type: 'RESET'
        })
    }

    return (
        <>
            <p>krestik: {arrState.krestik}</p>
            <p>nolik: {arrState.nolik}</p>
            <p>nicha: {arrState.nicha}</p>
            {arrState.win && `выиграл ${arrState.win}`}
            <div className={styles.block}>
                {
                    arrState.stateArr.map((elem, index) => {
                        return <Board key={index} value={elem} index={index} onClick={handleClick} reset={arrState.reset} />
                    })
                }
            </div>
            <button onClick={resetArr}>очистить</button>
        </>
    )
}

export default Game;