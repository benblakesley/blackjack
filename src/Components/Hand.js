
import { Card } from "./Card";

export const Hand = (props) => {

    
    return(
        <div className="container">
            <div className="row mb-5">
       {props.cards.map(
            card=>{
                return(
                    <div className="col">
                    <Card cardImageSrc={card.cardImageUrl}/>
                    </div>
                );
            }
        )}
        </div>
        </div>
    )
    

}