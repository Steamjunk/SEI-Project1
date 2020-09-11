console.log('Moving Mumnmies script linked');


class gameObject {
    constructor() {
        this.pyramidSize = 5;
        this.moveCount = 0
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')];
        this.setupBoard();
    }
    
    setupBoard() {
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
        // Ensures stack element is selected
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
                console.log(this.firstStack + " " + this.secondStack);
                // console.log(this.isMoveLegal());
                if(this.isMoveLegal()) {
                    this.movePiece();
                    this.checkForWinCondition();
                }
                this.clearStacks();
            }
        } else {
            this.firstStack = this.selectedStack;
            this.selectedPiece = this.selectedStack.childNodes[0];
            if(this.selectedPiece) {
                // console.log(this.selectedPiece);
                // highlight selected piece
            } else {
                console.log('deselected');
                this.clearStacks();
            }
        }
    }

    movePiece() {
        this.moveCount++
        const movedPiece = this.selectedPiece.cloneNode();
        console.log(movedPiece);
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


    // if pyramid is complete at last stack end game
    checkForWinCondition() {
        return this.gameStacks[2].childElementCount === 5
    }

    clearStacks() {
        this.firstStack = '';
        this.secondStack = '';
    }

}

// start game by clicking first piece
// todo Add timer

const game = new gameObject();