import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';


class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
    editMode: false,
    boardToEdit: {},
    showBoardForm: false,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errFromBoardsContainer) => console.error({ errFromBoardsContainer }));
  }


  addBoard = (newBoard) => {
    boardData.saveBoard(newBoard)
      .then(() => {
        this.getBoards();
        this.setState({ showBoardForm: false });
      })
      .catch((errorFromSaveBoard) => console.error({ errorFromSaveBoard }));
  }

  updateBoard = (boardId, updateBoard) => {
    boardData.updateBoard(boardId, updateBoard)
      .then(() => {
        this.getBoards();
        this.setState({ editMode: false, showBoardForm: false });
      })
      .catch((errorFromUpdateBoard) => console.error({ errorFromUpdateBoard }));
  }

  setEditMode = (editMode) => {
    this.setState({ editMode, showBoardForm: true });
  }

  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  setShowBoardForm = () => {
    this.setState({ showBoardForm: true });
  }

  render() {
    const { setSingleBoard } = this.props;

    return (<div>
      <button className="btn btn-success" onClick={ this.setShowBoardForm }>Add a New Board</button>
      {this.state.showBoardForm && <BoardForm addBoard={this.addBoard} editMode={this.state.editMode} boardToEdit={this.state.boardToEdit} updateBoard={this.updateBoard} />}
      {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard= {setSingleBoard} setEditMode={this.setEditMode} setBoardToEdit= {this.setBoardToEdit} />))}
    </div>);
  }
}

export default BoardsContainer;
