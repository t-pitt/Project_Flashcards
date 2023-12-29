import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard } from "../utils/api";

function DisplayCard({ card, setCard }) {
    const history = useHistory();

    const editHandler = () => {
        history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
    };

    const deleteHandler = () => {
        const cardDelete = window.confirm("Delete this card? This cannot be undone.")
        if (cardDelete) {
            deleteCard(card.id)
                .then(setCard((currentCards) => currentCards.filter((currentCard) => card.id !== currentCard.id)))
        }
    };

    return (
        <div>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button onClick={() => editHandler()}>Edit</button>
            <button onClick={() => deleteHandler()}>Delete</button>
        </div>
    );
}

export default DisplayCard;