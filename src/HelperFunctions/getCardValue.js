

export const getCardValue = (cardValue)=>{

    const numbersAsStrings = ["2", "3", "4", "5", "6", "7", "8", "9","10"];
    const courtCards = ["KING", "QUEEN", "JACK"];

    if(numbersAsStrings.includes(cardValue)){
        return parseInt(cardValue); //number values are simply converted to integers
    }
    
    if(courtCards.includes(cardValue)){
        return 10;                    // KINGS, QUEENS and JACKS are worth 10
    }
    /* To deal with an ACE we initially return 11 and then we will 
    convert this to a 1 when appropriate when calculating score
    */
    if(cardValue=="ACE"){
        return 11;      
    }


}