import React, { useState, useEffect } from "react";
import CardForm from "./CardFrom";
import { createCard, readDeck, updateCard } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function CreateCard() {
    const {deckId} = useParams();
    const [card, setCard] = useState({front: "", back: ""});
    const [deck, setDeck] = useState({});

    const submitHandler = (event) => {
        event.preventDefault();
        createCard(deckId, card)
            .then(setCard({front: "", back: ""}));
    };

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, []);

    if(deck.id) {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li>/</li>
                        <li>Add Card</li>
                    </ul>
                </nav>
                <CardForm card={card} setCard={setCard} deckId={deckId} submitHandler={submitHandler}/>
            </div>
        );
    }
    return "Loading deck...";
}

export default CreateCard;