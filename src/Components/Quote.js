import React from "react";
import { H2, QuoteCard, TrashSize, SaveSize } from "./Styled/Styled";
import { axiosWithAuth } from '../Utils/axiosWithAuth';


const Quote = props => {
    let quote_id = props.id;
    let userid = localStorage.userid;

    function saveQuote(){
        console.log('saving quote!');
        console.log('sending to post request', {quote_id: quote_id, user_favorites: userid});
        axiosWithAuth()
            .post('https://simpsons-says-nodejs.herokuapp.com/api/user/quotes', {quote_id: quote_id, user_favorites: userid})
            .then(res => {
                console.log(`response from save quote call: `, res)
            })
            .catch(err => {
                console.log(`error saving quote: `, err)
            })
    }

    function deleteQuote(){
        console.log('quote removed from saved list!');
        axiosWithAuth()
        .delete(`https://simpsons-says-nodejs.herokuapp.com/api/user/quotes/${quote_id}`)
        .then(res => {
            console.log(`response from delete quote call: `, res)
        })
        .catch(err => {
            console.log(`error deleting quote: `, err)
        })
    }

    return (
        <div>
            <QuoteCard>
            {/* <img src={props.url} /> */}
                <H2>{props.character}:</H2>                
                <H2>{`"${props.quote}"`}</H2>
                {/* <H2> Episode: {props.episode}</H2> */}
                <div onClick={saveQuote}><i class="fas fa-save"></i></div>
                <TrashSize onClick={deleteQuote} src='https://static.simpsonswiki.com/images/b/bb/Trash_Can_Tapped_Out.png' alt='trash can'/>
            </QuoteCard>
        </div>
    )
}

export default Quote;