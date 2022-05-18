import Square from "./Square";

function Board(props){
    return <Square value={props.value} onClick={props.onClick} index={props.index} reset={props.reset} />
}

export default Board;