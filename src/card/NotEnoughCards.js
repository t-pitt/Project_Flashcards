import React from "react";

function NotEnoughCards({deckLength}) {
    return (
        <div>
            <h2>Not enough cards</h2>
            <p>You need at least 3 cards to study. There are only {deckLength} cards in this deck.</p>
        </div>
    );
}

export default NotEnoughCards;