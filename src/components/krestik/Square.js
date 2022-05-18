import { useEffect, useState } from 'react';
import styles from './Square.module.css';

function Square(props){
    const [bool, setBool] = useState('');

    useEffect(()=>{
        if(props.reset === false){
            setBool(false);
        }
    }, [props.reset]);

    function handleIndex(){
        if(bool !== true){
            props.onClick(props.index);
            setBool(!bool);
        } else {
            return;
        }
    }
    return (
        <button className={styles.square} onClick={handleIndex}>{props.value}</button>
    )

}

export default Square;