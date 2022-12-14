

export const countAces = (hand)=>{

    let numberOfAces = 0;
    hand.forEach(card => {
        if(card.cardValue=="ACE"){
            numberOfAces ++;
        }
    });
    return numberOfAces;
}