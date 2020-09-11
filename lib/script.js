console.log('Moving Mumnmies script linked');


class GameObject {
    constructor(pyramidSize) {
        this.pyramidSize = pyramidSize;
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')];
        this.setupBoard();
    }
    
    setupBoard() {
        this.moveCount = 0;

        this.gameStacks.forEach(stack => {
            stack.addEventListener('click', event => {
                this.handleStackClick(event.target);
            });
        });

        for(let i = 1 ; i <= this.pyramidSize ; i++) {
            const piece = document.createElement('div');
            piece.id = `piece${i}`;
            piece.classList.add('game-piece');
            this.gameStacks[0].appendChild(piece);
        }
    }

    handleStackClick(eventTarget) {
        if(this.moveCount === 0) {
            //start timer
        }

        if(eventTarget.classList.contains('game-piece')) {
            this.selectedStack = eventTarget.parentNode;
        } else {
            this.selectedStack = eventTarget;
        }

        if(this.firstStack) {
            if(this.firstStack === this.selectedStack) {
                console.log('same stack selected');
                this.clearStacks();
            } else {
                this.secondStack = this.selectedStack;
                if(this.isMoveLegal()) {
                    this.movePiece();
                    this.checkForWinCondition();
                    this.clearStacks()
                }
                this.clearStacks();
            }
        } else {
            this.firstStack = this.selectedStack;
            this.selectedPiece = this.selectedStack.childNodes[0];
            if(this.selectedPiece) {
                this.selectedPiece.classList.add('selected-piece')
            } else {
                console.log('deselected');
                this.clearStacks();
            }
        }
    }

    movePiece() {
        this.moveCount++
        const movedPiece = this.selectedPiece.cloneNode();
        movedPiece.classList.remove('selected-piece');
        this.secondStack.prepend(movedPiece);
        this.selectedPiece.remove();
    }

    isMoveLegal() {
        console.log(this.secondStack);
        const topPiece = this.secondStack.childNodes[0]
        if(topPiece) {
            // console.log(topPiece.id);
            if(topPiece.id > this.selectedPiece.id) {
                return true;
            } else {
                return false;
            }
        } else {
            return true
        }
    }

    checkForWinCondition() {
        if(this.gameStacks[2].childElementCount === this.pyramidSize) {
            console.log("You did it!");
        }
    }

    clearStacks() {
        this.firstStack = '';
        this.secondStack = '';

        if(this.selectedPiece) {

            this.selectedPiece.classList.remove('selected-piece');
        }
    }
}

class GameManager {
    constructor(pyramidSize) {
        this.pyramidSize = pyramidSize;
        this.currentGame = new GameObject(this.pyramidSize);

        document.querySelector('#difficulty').addEventListener('change', event => {
            event.preventDefault();
            this.pyramidSize = document.querySelector('#difficulty').value;
        })
        document.querySelector('.reset-button').addEventListener('click', event => {
            event.preventDefault();
            this.resetGame();
        })
    }

    resetGame() {
        const allGamePieces = document.querySelectorAll('.game-piece');
        for(let i = 0 ; i < allGamePieces.length ; i++) {
            allGamePieces[i].remove();
        }
        this.currentGame = new GameObject(this.pyramidSize);
    }
}

const game = new GameManager(4);