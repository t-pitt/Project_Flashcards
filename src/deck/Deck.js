import React from "react";
import { useHistory } from "react-router-dom";

function Deck({deck, deleteDeck}) {
    const history = useHistory();

    const viewHandler = () => {
        history.push(`/decks/${deck.id}`);
    };
    const studyHandler = () => {
        history.push(`/decks/${deck.id}/study`);
    };
    const deleteHandler = () => {
        const deckDelete = window.confirm("Delete this deck? You will not be able to recover it.");
        if (deckDelete) {
            deleteDeck(deck.id);
        }
    };

    return (
        <div>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
            </div>
            <div>
                <p>{deck.description}</p>
            </div>
            <div>
                <button onClick={() => viewHandler()}>View</button>
                <button onClick={() => studyHandler()}>Study</button>
                <button onClick={() => deleteHandler()}>Delete</button>
            </div>
        </div>
    );
}

export default Deck;