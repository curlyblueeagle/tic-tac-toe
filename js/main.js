/**
 * Boostrap the game's application by instantiating the View, Model and Controller
 * The insantiated controller automatically kickstarts all the necessary actions required make the game ready to be played.
 */
window.onload = () => {
	var boardView = new BoardView();
	var boardModel = new BoardModel();
	var boardController = new BoardController(boardView, boardModel);
}
