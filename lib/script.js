console.log('Moving Mumnmies script linked');


class GameObject {
    constructor(pyramidSize, timeLimitseconds) {
        this.pyramidSize = pyramidSize;
        this.timeLimitSeconds = timeLimitseconds;

        this.gameInProgress = false;
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')];
        this.setupBoard();
    }
    
    setupBoard() {
        this.moveCount = 0;

        this.onScreenTimer = document.querySelector('#timer');
        this.onScreenTimer.innerText = this.timeLimitSeconds;

        this.gameStacks[0].addEventListener('click', event => {
            this.gameInProgress = true;
            this.startTimer();
        }, {once : true});

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
                this.selectedPiece.classList.add('selected-piece');
            } else {
                console.log('deselected');
                this.clearStacks();
            }
        }
    }

    startTimer() {
        console.log('timer started');
        console.log(this);

        this.onScreenTimer.classList.remove('hidden');
        
        this.activeTimer = setInterval(event => {
            console.log(this.timeLimitSeconds);
            this.onScreenTimer.innerText = this.timeLimitSeconds;
            this.timeLimitSeconds--;
            // check if limit is zero
        }, 1000);
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
            this.gameInProgress - false;
            this.stopTimer();
            console.log("You did it!");
        }
    }

    stopTimer() {
        clearInterval(this.activeTimer);
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
        this.gameTimeLimit = 60;
        this.currentGame = new GameObject(this.pyramidSize, this.gameTimeLimit);

        document.querySelector('#difficulty').addEventListener('change', event => {
            event.preventDefault();
            console.log(this);
            this.pyramidSize = document.querySelector('#difficulty').value;
            if(this.pyramidSize === "4") {
                this.gameTimeLimit = 60;
            } else if(this.pyramidSize === "6") {
                this.gameTimeLimit = 90;
            } else if(this.pyramidSize === "8") {
                this.gameTimeLimit = 120;
            }
        });
        document.querySelector('.reset-button').addEventListener('click', event => {
            event.preventDefault();
            this.resetGame();
        });
    }

    resetGame() {
        this.currentGame.stopTimer();

        this
        const allGamePieces = document.querySelectorAll('.game-piece');
        for(let i = 0 ; i < allGamePieces.length ; i++) {
            allGamePieces[i].remove();
        }
        console.log(this.gameTimeLimit);
        this.currentGame = new GameObject(this.pyramidSize, this.gameTimeLimit);
    }
}

const game = new GameManager(4);