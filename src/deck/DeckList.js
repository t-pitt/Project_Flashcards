import React from "react";
import Deck from "./Deck";
import { deleteDeck } from "../utils/api";

function DeckList({deckList, setDeckList}) {
    if(deckList.length === 0) {
        return <h2>No decks found. Create one.</h2>
    }

    if (deckList.length > 0) {
        const deckDelete = (deckId) => {
            deleteDeck(deckId)
                .then(setDeckList((currentDeckList) => currentDeckList.filter((deck) => deck.id !== deckId)));
        };

        const decks = deckList.map((deck, index) =>
            <Deck key={index} deck={deck} deleteDeck={deckDelete}/>
        );
        return (
            <div>
                {decks}
            </div>
        );
    }
    return "Loading decks...";
}

export default DeckList;