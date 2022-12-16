

export const UndoStake = (props) => {

    const undoStake = ()=>{
        props.undoStake();
    }

    return <button type="button" className="btn btn-secondary" onClick={undoStake}> Undo Stake </button>
}