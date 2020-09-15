console.log('Pyramid Panic!');


class GameObject {
    constructor(pyramidSize, timeLimitseconds) {
        this.pyramidSize = pyramidSize;
        this.timeLimitSeconds = timeLimitseconds;
        this.scene = document.querySelector('#scene');
        
        this.setupBoard();
    }
    
    setupBoard() {
        this.moveCount = 0;
        this.gameInProgress = false;
        this.gameStacks = [];
        
        // Build the stacks
        for( let i = 1 ; i <= 3 ; i++) {
            const newStack = document.createElement('div');
            newStack.id = `stack${i}`;
            newStack.classList.add('game-stack');

            document.querySelector('#game-field').appendChild(newStack);
            this.gameStacks.push(newStack);
        }

        // Build the Pyramid
        for(let i = 1 ; i <= this.pyramidSize ; i++) {
            const piece = document.createElement('div');
            piece.id = `piece${i}`;
            piece.classList.add('game-piece');
            this.gameStacks[0].appendChild(piece);
        }
        this.gameStacks.forEach(stack => {
            stack.addEventListener('click', event => {
                this.handleStackClick(event.target);
            });
        });

        // Build the timer
        this.onScreenTimer = document.querySelector('#timer');
        this.onScreenTimer.innerText = this.timeLimitSeconds;
        this.gameStacks[0].addEventListener('click', event => this.startTimer(), {once : true});
    }

    handleStackClick(eventTarget) {
        // Ensure a stack is selected
        if(eventTarget.classList.contains('game-piece')) {
            this.selectedStack = eventTarget.parentNode;
        } else {
            this.selectedStack = eventTarget;
        }

        // Stack selection logic
        if(this.firstStack) {
            if(this.firstStack === this.selectedStack) {
                this.clearSelections();
            } else {
                this.secondStack = this.selectedStack;
                if(this.isMoveLegal()) {
                    this.movePiece();
                    this.checkForWinCondition();
                    this.clearSelections()
                }
                this.clearSelections();
            }
        } else {
            this.firstStack = this.selectedStack;
            this.selectedPiece = this.selectedStack.childNodes[0];
            if(this.selectedPiece) {
                this.selectedPiece.classList.add('selected-piece');
            } else {
                this.clearSelections();
            }
        }
    }

    startTimer() {        
        this.gameInProgress = true;
        // this.onScreenTimer.classList.remove('hidden');
        this.sun = document.querySelector('#sun');

        this.sun.classList.remove('hidden');

        
        this.animateSun();
        
        // Game timer
        this.activeTimer = setInterval(event => {
            this.timeLimitSeconds--;
            if(this.timeLimitSeconds > 0) {
                this.onScreenTimer.innerText = this.timeLimitSeconds;
            } else {
                this.gameOver();
            }
        }, 1000);
    }

    animateSun() {
        const skyWidth = document.querySelector('#sky').clientWidth;
        const sunWidth = document.querySelector('#sun').clientWidth;

        let position = 0;
        this.activeAnimation = setInterval(function() {
            if (position == (skyWidth - sunWidth)) {
                clearInterval(this.activeAnimation);
            } else {
                position++;
                this.sun.style.left = position + 'px';
            }
        }, this.timeLimitSeconds);
    }
    
    isMoveLegal() {
        const topPiece = this.secondStack.childNodes[0]
        if(topPiece) {
            if(topPiece.id > this.selectedPiece.id) {
                return true;
            } else {
                return false;
            }
        } else {
            return true
        }
    }

    movePiece() {
        this.moveCount++
        const movedPiece = this.selectedPiece.cloneNode();
        movedPiece.classList.remove('selected-piece');
        this.secondStack.prepend(movedPiece);
        this.selectedPiece.remove();
    }

    checkForWinCondition() {
        if(this.gameStacks[2].childElementCount === this.pyramidSize) {
            this.gameWon();
        }
    }
    
    stopTimer() {
        clearInterval(this.activeTimer);
        clearInterval(this.activeAnimation);
        this.sun.classList.add('hidden');
    }
    
    clearSelections() {
        this.firstStack = '';
        this.secondStack = '';
        
        if(this.selectedPiece) {
            this.selectedPiece.classList.remove('selected-piece');
        }
    }

    clearBoard() {
        const gameStacks = document.querySelectorAll('.game-stack');
        for(let i = 0 ; i < gameStacks.length ; i++) {
            gameStacks[i].remove();
        }
    }
    
    reset() {
        this.gameInProgress = false;
        this.stopTimer();
        this.clearBoard();
        this.scene.classList.remove('hidden');
        
        if(this.endGameImage) {
            this.endGameImage.remove();
        }
    }

    gameOver() {
        console.log("Game Over! Face the wrath of the Pharaoh");
        this.reset();
        // show game over graphic
        this.toggleSceneHide();
        this.endGameImage = document.createElement('img');
        this.endGameImage.classList.add('end-game-screen');
        this.endGameImage.src = 'images/angryPharaoh.png';
        this.scene.appendChild(this.endGameImage);
    }

    gameWon() {
        console.log("You did it!");
        this.reset();
        //show game won graphic
        this.endGameImage = document.createElement('img');
        this.endGameImage.classList.add('end-game-screen');
        this.endGameImage.src = 'images/desertSunset.png';
        this.scene.appendChild(this.endGameImage);
    }

    toggleSceneHide() {
        console.log(this.scene.childNodes);
        this.scene.classList.add('hidden');
        document.querySelector('#sky').classList.add('hidden');
        document.querySelector('.game-field-wrapper').classList.add('hidden');
        document.querySelector('#ground').classList.add('hidden');


    }
}

class GameManager {
    constructor(pyramidSize, gameTimeLimit) {
        this.pyramidSize = pyramidSize;
        this.gameTimeLimit = gameTimeLimit;
        this.currentGame = new GameObject(this.pyramidSize, this.gameTimeLimit);

        document.querySelector('#difficulty').addEventListener('change', event => {
            event.preventDefault();
            this.pyramidSize = document.querySelector('#difficulty').value;
            if(this.pyramidSize == 4) {
                this.gameTimeLimit = 30;
            } else if(this.pyramidSize == 6) {
                this.gameTimeLimit = 60;
            } else if(this.pyramidSize == 8) {
                this.gameTimeLimit = 120;
            }
        });
        document.querySelector('.reset-button').addEventListener('click', event => {
            event.preventDefault();
            this.resetGame();
        });
    }

    resetGame() {
        this.currentGame.reset();

        this.currentGame = new GameObject(this.pyramidSize, this.gameTimeLimit);
    }
}

const defaultSize = 4;
const defaultTime = 2;

const game = new GameManager(defaultSize, defaultTime);
