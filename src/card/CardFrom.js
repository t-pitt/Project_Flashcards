import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({card, setCard, deckId, submitHandler}) {
    const history = useHistory();
    const cardFrontHandler = (event) => {
        setCard({...card, front: event.target.value});
    };

    const cardBackHandler = (event) => {
        setCard({...card, back: event.target.value});
    };

    const finishHandler = () => {
        history.push(`/decks/${deckId}`)
    };
    return (
        <form onSubmit={() => submitHandler()}>
            <label>Front</label>
            <br />
            <textarea id="front" value={card.front} onChange={(event) => cardFrontHandler(event)} placeholder="Front of the card"></textarea>
            <br />
            <label>Back</label>
            <br />
            <textarea id="back" value={card.back} onChange={(event) => cardBackHandler(event)} placeholder="Back of the card"></textarea>
            <br />
            <button onClick={() => finishHandler()}>Done</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CardForm;