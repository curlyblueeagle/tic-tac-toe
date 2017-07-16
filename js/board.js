/**
 * What should board's model do?
 * - Intialize the game state to be ["", "", "", "", "", "", "", "", ""]
 * - Initialize the current move to "O" so the first move in the game will be "X"
 * - Maintain the state of the game as follows:
 * 	- Return what the next move should be, if current move was "O" return "X" and vice-versa.
 *  - Given row#, col# update with value. Ex, update index 2 with 'X' will result in board state ["", "", "X", "", "", "", "", "", ""]
 */
 
 class BoardModel {
	constructor () {
		this.resetBoard();
	}
	
	get move() {
		this._currentMove = (this._currentMove === "X") ? ("O") : ("X");
		return this._currentMove;
	}
	
	setCellValue(index=0, value="") {
		this._board[index] = value;
	}
	
	getCellValue(index) {
		return this._board[index];
	}
	
	getBoardState() {
		return this._board.join("");
	}
	
	resetBoard() {
		this._board = ["", "", "", "", "", "", "", "", ""];
		this._currentMove = "O";
	}

}

/**
 * What should board's view do?
 * - It should update given cell's DOM element based on whether the value is "X", "O" or "". In curent implementation of view, this means
 *   that it should inject a span tag with the value as content
 * 
 */
class BoardView {
	//Just save a reference of all the necessary DOM elements so that they can be reused later.
	constructor() {
		this._board = document.querySelector(".board");
		this._cells = this._board.querySelectorAll(".cell");
		this._restartButton = document.getElementById('restart-button');
		this._messageContainer = document.querySelector(".message-container");
	}	

	initialize() {		
		this._board.addEventListener("click", this.update);
		this._restartButton.addEventListener("click", this.restart)
	}
	
	displayMessage(msg) {
		this._messageContainer.innerHTML = msg;
	}
	
	getIndex(element) {
		return parseInt(element.dataset.index, 10);
	}
	
	setCellElementContent(element, value, isBoardFull=false) {
		element.innerHTML = "<span>" + value + "</span>";
		if (isBoardFull) {
			this.displayMessage("Game Over! Please click RESTART to begin a new game");
		}
	}
	
	resetBoard() {
		var cellsCount = this._cells.length;
		for (let i = 0; i < cellsCount; i++) {
			this._cells[i].innerHTML = "";
		}
		this._messageContainer.innerHTML = "";
	}
}

/**
 * 
 */
class BoardController {
	constructor(view, model) {
		this._view = view;
		this._model = model;
		this.initialize();
	}

	/**
	 * Intialize as follows:
	 * - Set handler for click on the Board's DOM
	 * - Set handler for click on Restart button
	 */
	initialize() {
		this._view.update = this.updateBoard.bind(this);
		this._view.restart = this.restartBoard.bind(this);
		this._view.initialize();
	}
	
	/**
	 * Restart play in the board by resetting the model and the view.
	 */
	restartBoard() {
		this._model.resetBoard();
		this._view.resetBoard();
	}
	
	/**
	 * The following updates need to happen to the Board:
	 * 1) The Model needs to be updated with index of the cell clicked.
	 * 2) The target cell in the View needs to be updated with the move value presented by the Model
	 */
	updateBoard(event) {		
		var targetIndex = this._view.getIndex(event.target);
		if (this._model.getCellValue(targetIndex) === "") {
			let cellValue = this._model.move;
			this._model.setCellValue(targetIndex, cellValue);
			this._view.setCellElementContent(event.target, cellValue, (this._model.getBoardState().length === 9));				
		}
	}	
	
}
