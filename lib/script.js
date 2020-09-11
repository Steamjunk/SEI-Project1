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
        
        for(let i = 0 ; i < this.pyramidSize ; i++) {
            
        }


    }

    handleStackClick(eventTarget) {
        // Ensures stack element is selected
        if(eventTarget.classList.contains('game-piece')) {
            console.log(eventTarget.parentNode);
            this.selectedStack = eventTarget.parentNode;
        } else {
            console.log(eventTarget);
            this.selectedStack = eventTarget;
        }

        if(this.firstStack) {
            if(this.firstStack === this.selectedStack) {
                console.log('same stack selected');
                this.clearStacks();
            } else {
                this.secondStack = this.selectedStack;
                console.log(this.firstStack + " " + this.secondStack);
                this.isMoveLegal()
                // move piece
                // moveCount++
                // this.checkForWinCondition();
                // else do nothing
                this.clearStacks();
            }
        } else {
            this.firstStack = this.selectedStack;
            this.selectedPiece = this.selectedStack.childNodes[1];
            if(this.selectedPiece) {
                console.log(this.selectedPiece);
                // highlight selected piece
            } else {
                console.log('deselected');
                this.clearStacks();
            }
        }
    }


    isMoveLegal() {
        
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

// then pick another stack
// if move is legal move piece




const game = new gameObject();