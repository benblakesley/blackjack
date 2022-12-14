import { countAces } from "./countAces";
import { getCardValue } from "./getCardValue";


export const getHandValue = (hand) =>{

    let handValue=0;

    hand.forEach(card=>{
        handValue = handValue + getCardValue(card.cardValue);
    })

    if(handValue>21){
        if(countAces(hand)>0){
            handValue = handValue - countAces(hand)*10;
        }
    }

    return handValue;
}   