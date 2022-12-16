
import { availableChips } from "../HelperFunctions/availableChips";
import { Chip } from "./Chip";



export const SetOfChips = (props) => {

    const availableBalance = props.balance - props.stake;

    const addToStake=(amount)=>{
        props.addToStake(amount);
    }
    
    return(
        <div className="container">
            <div className="row">
                {availableChips(availableBalance).map(value=>{
                    return (
                        <div className="col">
                    <Chip addToStake={addToStake} amount={value}/>
                    </div>
                )
                })
                }
            </div>
        </div>
    )


}