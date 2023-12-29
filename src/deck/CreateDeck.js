import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function CreateDeck({setDeckList}) {
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({name: "", description: ""});

    const onSubmitHandler = (event) => {
        event.preventDefault();
        createDeck(newDeck)
            .then(setDeckList((currentDeckList) => [...currentDeckList, newDeck]))
            .then(setNewDeck({name: "", description: ""}))
            .then(response => history.push(`/decks/${response.id}`))
            ;
    };

    const nameHandler = (event) => {
        setNewDeck({...newDeck, name: event.target.value});
    };

    const descriptionHandler = (event) => {
        setNewDeck({...newDeck, description: event.target.value});
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li>Create Deck</li>
                </ul>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <label>Name</label>
                <br />
                <input id="name" value={newDeck.name} onChange={(event) => nameHandler(event)} placeholder="Deck Name"/>
                <br />
                <label>Description</label>
                <br />
                <textarea id="description" value={newDeck.description} onChange={(event) => descriptionHandler(event)} placeholder="Brief description of the deck" />
                <br />
                <button>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;