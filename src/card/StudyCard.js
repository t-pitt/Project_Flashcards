import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({card, setCurrentCard, currentCard, deckLength, nextCardHandler}) {
    const history = useHistory();
    const [flipped, setFlipped] = useState(false);

    const flipHandler = () => {
        setFlipped(true);
    };

    const nextCardButtonHandler = () => {
        nextCardHandler();
        setFlipped(false);
        if (currentCard === deckLength) {
            const restart = window.confirm("Restart this deck? Click cancel to return to the home page.");
            if (!restart) {
                history.push("/");
            } else {
                setCurrentCard(1);
            }
        }
    };

    let nextButton;
    if(flipped)
        nextButton = <button onClick={() => nextCardButtonHandler()}>Next</button>;
    return (
        <div>
            <h2>Card {currentCard} of {deckLength}</h2>
            <p>{flipped ? card.back : card.front}</p>
            <button onClick={() => flipHandler()}>Flip</button>
            {nextButton}
        </div>
    );
}

export default StudyCard;