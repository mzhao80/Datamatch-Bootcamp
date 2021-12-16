import React from "react";
import "./CardEditor.css";

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: true, currIndex: 0 };
  }

  flip = () => this.setState({ front: !this.state.front });
  prev = () => this.setState({ currIndex: this.state.currIndex - 1 });
  next = () => this.setState({ currIndex: this.state.currIndex + 1 });

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>;
    }

    const card =
      this.props.cards[this.state.currIndex][
        this.state.front ? "front" : "back"
      ];

    return (
      <div>
        <h2>{this.props.name}</h2>
        <h3>{this.props.description}</h3>
        <table>
          <tbody>
            <tr>
              <td onClick={this.flip}>{card}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        Card {this.state.currIndex + 1}/{this.props.cards.length}
        <br></br>
        <button onClick={this.prev} disabled={this.state.currIndex === 0}>
          Previous
        </button>
        <button
          onClick={this.next}
          disabled={this.state.currIndex === this.props.cards.length - 1}
        >
          Next
        </button>
        <hr />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  const description = deck && deck.description;
  return { cards: cards, name: name, description: description };
};

export default compose(
  withRouter,
  firebaseConnect((props) => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps)
)(CardViewer);
