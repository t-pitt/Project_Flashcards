import React, { useEffect, useState } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import DisplayCard from "../card/DisplayCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DisplayDeck({setDeckList}) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId)
            .then(response => {
                setDeck(response);
                setCards(response.cards);
            });
    },[deckId]);

    if (deck.cards) {
        const editHandler = () => {
            history.push(`/decks/${deckId}/edit`);
        };

        const studyHandler = () => {
            history.push(`/decks/${deckId}/study`);
        };

        const newCardHandler = () => {
            history.push(`/decks/${deckId}/cards/new`);
        };

        const deleteDeckHandler = () => {
            const deckDelete = window.confirm("Delete this deck? This cannote be undone.");
            if (deckDelete) {
                deleteDeck(deckId);
                setDeckList((currentDeckList) => currentDeckList.filter((deck) => deck.id !== deckId));
            }
        };

        // Pass the index as a key to stop a console error
        const displayCards = cards.map((card, index) => 
            <DisplayCard key={index} card={card} setCard={setCards} />
        );

        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li>{deck.name}</li>
                    </ul>
                </nav>
                <h1>{deck.name}</h1>
                <p>{deck.description}</p>
                <div>
                    <button onClick={() => editHandler()}>Edit</button>
                    <button onClick={() => studyHandler()}>Study</button>
                    <button onClick={() => newCardHandler()}>Add Cards</button>
                    <button onClick={() => deleteDeckHandler()}>Delete</button>
                </div>
                <h2>Cards</h2>
                <div>
                    {displayCards}
                </div>
            </div>
        );
    }
    return "Loading deck..."
}

export default DisplayDeck;