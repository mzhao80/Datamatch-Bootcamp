import React from 'react';
import './CardEditor.css'

import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { front: true, currIndex: 0 };
    }

    switchSide = () => this.setState({ front: !this.state.front });
    prev = () => this.setState({ currIndex: this.state.currIndex - 1 });
    next = () => this.setState({ currIndex: this.state.currIndex + 1 });

    render() {
        const cardFront = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    {card.front}
                </tr>
            )
        })
        const cardBack = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    {card.back}
                </tr>
            )
        })
        if (this.state.front) {
            return (
                <div>
                    <h2>Card Viewer</h2>
                    <h3>Front</h3>
                    <table>
                        <tr>
                            <td onClick={this.switchSide}>{cardFront[this.state.currIndex]}</td>
                        </tr>
                    </table>
                    <br></br>
                    Card {this.state.currIndex + 1}/{this.props.cards.length}
                    <br></br>
                    <button onClick={this.prev} disabled={this.state.currIndex === 0}>Previous</button>
                    <button onClick={this.next} disabled={this.state.currIndex === this.props.cards.length - 1}>Next</button>
                    <hr />
                    <Link to="/editor">Go to card editor.</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Card Viewer</h2>
                    <h3>Back</h3>
                    <table>
                        <tr>
                            <td onClick={this.switchSide}>{cardBack[this.state.currIndex]}</td>
                        </tr>
                    </table>
                    <br></br>
                    Card {this.state.currIndex + 1}/{this.props.cards.length}
                    <br></br>
                    <button onClick={this.prev} disabled={this.state.currIndex === 0}>Previous</button>
                    <button onClick={this.next} disabled={this.state.currIndex === this.props.cards.length - 1}>Next</button>
                    <hr />
                    <Link to="/editor">Go to card editor.</Link>
                </div>
            )
        }
    }
}

export default CardViewer;