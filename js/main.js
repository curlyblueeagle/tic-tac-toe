window.onload = () => {
	var boardView = new BoardView();
	var boardModel = new BoardModel();
	var boardController = new BoardController(boardView, boardModel);
}
