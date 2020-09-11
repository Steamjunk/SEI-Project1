console.log('Moving Mumnmies script linked');


class gameObject {
    constructor() {
        this.pyramidSize = 3;
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
        if(this.moveCount === 0) {
            //start timer
        }


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
                this.selectedPiece.classList.add('selected-piece')
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
        this.selectedPiece.classList.remove('selected-piece');
    }
}

const game = new gameObject();