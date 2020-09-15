console.log('Pyramid Panic!');


class GameObject {
    constructor(pyramidSize, timeLimitseconds) {
        this.pyramidSize = pyramidSize;
        this.timeLimitSeconds = timeLimitseconds;
        this.scene = document.querySelector('#scene');

        if(this.sceneHidden) {
            this.toggleSceneHide();
        }
        
        this.setupBoard();
    }
    
    setupBoard() {
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
        this.sun = document.querySelector('#sun');
        this.sun.classList.remove('hidden');

        const skyWidth = document.querySelector('#sky').clientWidth;
        const sunWidth = document.querySelector('#sun').clientWidth;

        let positionInSky = 0;
        this.activeAnimation = setInterval(function() {
            if (positionInSky == (skyWidth - sunWidth)) {
                clearInterval(this.activeAnimation);
            } else {
                positionInSky++;
                this.sun.style.left = positionInSky + 'px';
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

        if(this.sun) {
            this.sun.classList.add('hidden');
        }
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
        this.stopTimer();
        this.clearBoard();
        
        if(this.endGameImage) {
            this.endGameImage.remove();
        }
    }

    gameOver() {
        this.reset();
        this.toggleSceneHide();

        // Build game over image
        this.endGameImage = document.createElement('img');
        this.endGameImage.classList.add('end-game-image');
        this.endGameImage.src = './lib/images/angryPharaoh.png';

        this.endGameText = document.createElement('p');
        this.endGameText.classList.add('end-game-text');
        this.endGameText.innerHTML = "Game Over! <br>Face the wrath of the Pharaoh";

        this.endGameScene = document.querySelector('#end-game-scene')
        this.endGameScene.appendChild(this.endGameImage);
        this.endGameScene.appendChild(this.endGameText);
    }

    gameWon() {
        this.reset();
        this.toggleSceneHide();

        //show game won graphic
        this.endGameImage = document.createElement('img');
        this.endGameImage.classList.add('end-game-image');
        this.endGameImage.src = './lib/images/desertSunset.png';

        this.endGameText = document.createElement('p');
        this.endGameText.classList.add('end-game-text');
        this.endGameText.innerText = "Wow you really did it! The Pharaoh is pleased. For now...";

        this.endGameScene = document.querySelector('#end-game-scene')
        this.endGameScene.appendChild(this.endGameImage);
        this.endGameScene.appendChild(this.endGameText);
    }

    toggleSceneHide() {
        const groundMarkers = document.querySelectorAll('.ground-marker');
        console.log(groundMarkers);

        if(this.sceneHidden) {
            this.sceneHidden = false;
            document.querySelector('#sky').classList.remove('hidden');
            document.querySelector('.game-field-wrapper').classList.remove('hidden');

            for(let i = 0 ; i < groundMarkers.length ; i++) {
                groundMarkers[i].classList.remove('hidden');
            }

            document.querySelector('#end-game-scene').classList.add('hidden');
            this.endGameText.remove();
        } else {
            this.sceneHidden = true;
            document.querySelector('#sky').classList.add('hidden');
            document.querySelector('.game-field-wrapper').classList.add('hidden');

            for(let i = 0 ; i < groundMarkers.length ; i++) {
                groundMarkers[i].classList.add('hidden');
            }

            document.querySelector('#end-game-scene').classList.remove('hidden');
        }
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
                this.gameTimeLimit = 90;
            } else if(this.pyramidSize == 8) {
                this.gameTimeLimit = 180;
            }
        });
        document.querySelector('.reset-button').addEventListener('click', event => {
            event.preventDefault();
            this.resetGame();
        });
    }

    resetGame() {
        this.currentGame.reset();

        if(this.currentGame.sceneHidden) {
            this.currentGame.toggleSceneHide();
        }

        this.currentGame = new GameObject(this.pyramidSize, this.gameTimeLimit);
    }
}


// Default game settings on page load
const defaultSize = 4;
const defaultTime = 30;

const game = new GameManager(defaultSize, defaultTime);
