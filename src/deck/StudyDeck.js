import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Card from "../card/StudyCard";
import NotEnoughCards from "../card/NotEnoughCards";
import { Link } from "react-router-dom";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [currentCard, setCurrentCard] = useState(1);

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, [deckId]);

    const nextCardHandler = () => {
        setCurrentCard(currentCard + 1);
    };

    if (deck.cards) {
        const cards = deck.cards;

        let display = <NotEnoughCards deckLength={cards.length} />;
        if (cards.length > 2) {
            display = (
                <div>
                    <Card card={cards[currentCard-1]} setCurrentCard={setCurrentCard} currentCard={currentCard} deckLength={cards.length} nextCardHandler={nextCardHandler} />
                </div>
            );
        }

        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li>/</li>
                        <li>Study</li>
                    </ul>
                </nav>
                <div>
                    <h1>Study: {deck.name}</h1>
                </div>
                {display}
            </div>
        );
    }
    return "Loading cards...";
}

export default Study;