import React, { useState, useEffect } from "react";
import CardForm from "./CardFrom";
import { readCard, readDeck, updateCard } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function EditCard() {
    const {deckId, cardId} = useParams();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

    const submitHandler = (event) => {
        updateCard(card);
    };

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
        readCard(cardId)
            .then(setCard);
    }, []);

    if(card.id) {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li>/</li>
                        <li>Edit Card</li>
                    </ul>
                </nav>
                <CardForm card={card} setCard={setCard} deckId={deckId} submitHandler={submitHandler}/>
            </div>
        );
    }
    return "Loading card...";
}

export default EditCard;