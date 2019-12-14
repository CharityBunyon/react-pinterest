import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardsContainer from '../components/BoardsContainer/BoardsContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';
import './App.scss';

firebaseConnection();


class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
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

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  }

    renderView = () => {
      const { authed, selectedBoardId } = this.state;
      if (!authed) {
        return (<Auth />);
      }
      if (!selectedBoardId) {
        return (<BoardsContainer setSingleBoard={this.setSingleBoard} />);
      }
      return (selectedBoardId) && (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard} />);
    };

    render() {
      const { authed } = this.state;

      return (
      <div className="App">
        <MyNavbar authed={authed} />
        <button className="btn btn-danger">Charity's Button</button>
        {
          this.renderView()
      }
      </div>
      // If they are authenticated load the board
      // else show log in button
      );
    }
}

export default App;
