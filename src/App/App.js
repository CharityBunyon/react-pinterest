import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import './App.scss';

firebaseConnection();


class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <button className="btn btn-danger">Charity's Button</button>
        {
        (authed) ? (<div>You Logged In!</div>) : (<Auth />)
      }
      </div>
      // If they are authenticated load the board
      // else show log in button
    );
  }
}

export default App;
