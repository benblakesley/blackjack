

export const getCard = async()=>{

    const endpoint = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";

    try{
    const response = await fetch(endpoint);

    return response;
    }
    catch(error){
        console.log(error);
    }
}