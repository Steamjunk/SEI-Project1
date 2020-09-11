console.log('Moving Mumnmies script linked');


class gameObject {
    constructor() {
        this.pyramidSize = 5;
        this.moveCount = 0
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')];
        
        
        
        this.gameStacks.forEach(stack => {
            stack.addEventListener('click', event => {
                this.handleStackClick(event.target);
            });
        });
    }

    // each turn pick a stack
    handleStackClick(selectedStack) {

        // console.log(selectedStack);
        
        // if first stack already selected
        if(this.firstStack) {
            // select second stack
            this.secondStack = selectedStack;
            // if this.isMoveLegal(firstStack, secondStack)
            // move piece
            // moveCount++
            // this.checkForWinCondition();
            // else do nothing
            // clear stacks


        } 
        
        
        // if no stack selected
        // select stack and 
        else {
            this.firstStack = selectedStack;
            // if has piece get top piece
            this.selectedPiece = selectedStack.firstChild;
            console.log(selectedStack);
        }
        // highlight selected piece
        // if no piece do nothing
    }
    isMoveLegal(firstStack, secondStack) {
        // 
    }


    // if pyramid is complete at last stack end game
    checkForWinCondition() {
        return this.gameStacks[2].childElementCount === 5
    }

}

// start game by clicking first piece
// todo Add timer

// then pick another stack
// if move is legal move piece




const game = new gameObject();