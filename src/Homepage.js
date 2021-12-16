import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";

class Homepage extends React.Component {
  render() {
    if (!isLoaded(this.props.decks)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.decks)) {
      return (
        <div>
          <h2>Homepage</h2>
          <Link to="/editor">Create a new card deck.</Link>
          <br />
          <h3>Flashcards</h3>
          No decks yet.
        </div>
      );
    }

    const deckList = Object.keys(this.props.decks).map((deckId) => {
      return (
        <tr key={deckId}>
          <td>
            <Link to={`/viewer/${deckId}`}>
              {this.props.decks[deckId].name}
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h2>Homepage</h2>
        <Link to="/editor">Create a new card deck.</Link>
        <br />
        <h3>Flashcards</h3>
        <table border="1">
          <tbody>{deckList}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const decks = state.firebase.data.homepage;
  return { decks: decks };
};

export default compose(
  firebaseConnect((props) => {
    return ["/homepage"];
  }),
  connect(mapStateToProps)
)(Homepage);
