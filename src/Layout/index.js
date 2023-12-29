import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "../deck/StudyDeck";
import DeckList from "../deck/DeckList";
import DisplayDeck from "../deck/DisplayDeck";
import EditDeck from "../deck/EditDeck";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import CreateDeck from "../deck/CreateDeck";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditCard from "../card/EditCard";
import CreateCard from "../card/CreateCard";

function Layout() {
  const history = useHistory();
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    listDecks()
      .then(setDeckList)
  },[]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <button onClick={() => history.push("/decks/new")}>Create Deck</button>
            <DeckList deckList={deckList} setDeckList={setDeckList}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck setDeckList={setDeckList} />
          </Route>
          <Route exact path="/decks/:deckId">
            <DisplayDeck setDeckList={setDeckList} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
