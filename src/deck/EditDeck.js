import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    const onSubmitHandler = (event) => {
        event.preventDefault();
        updateDeck(deck)
            .then(history.push(`/decks/${deckId}`));
    };

    const nameHandler = (event) => {
        setDeck({...deck, name: event.target.value});
    };

    const descriptionHandler = (event) => {
        setDeck({...deck, description: event.target.value});
    };

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, []);

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li>/</li>
                    <li>Edit Deck</li>
                </ul>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <label>Name</label>
                <br />
                <input id="name" value={deck.name} onChange={(event) => nameHandler(event)} placeholder="Deck Name"/>
                <br />
                <label>Description</label>
                <br />
                <textarea id="description" value={deck.description} onChange={(event) => descriptionHandler(event)} placeholder="Brief description of the deck" />
                <br />
                <button>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditDeck;