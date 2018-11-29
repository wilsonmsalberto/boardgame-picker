import React, { Component } from 'react';

// SDK
import { bggSdk } from './sdk';

// Components
import List from './components/list/List';

// Styles
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: {},
            username: 'thesheol',
        }
    }

    render() {
        const { collection, username } = this.state;

        return (
            <main>
                <form>
                    <h1>Find a User Collection</h1>
                    <input
                        value={ username }
                        onChange={ evt => this.updateUsername(evt) }
                        type="text"
                    />
                    <button onClick={ (e) => this.getUserCollection(e) }>
                        Submit
                    </button>
                </form>

                <List items={ collection && collection.games } />
            </main>
        );
    }

    updateUsername(evt) {
        this.setState({ username: evt.target.value });
    }

    async getUserCollection(e) {
        e.preventDefault();

        const { username } = this.state;

        if (!username) {
            return;
        }

        const collection = await bggSdk.collection.getUserCollection({
            username,
            fullDetails: true,
        });

        console.log(collection);

        this.setState({
            collection: {
                games: collection.games,
                total: collection.total,
            }
        });
    }
}

export default App;
