console.log('Moving Mumnmies script linked');


class gameObject {
    constructor() {
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')]
        this.gameStacks.forEach(stack => {
            stack.addEventListener('click', event => {
                this.handleStackClick(event.target);
            });
        });
    }

    // each turn pick a stack
    handleStackClick(selectedStack) {

        console.log(selectedStack);
        // if no stack selected
            // select stack and 
                // if has piece get top piece
                    // highlight selected piece
                // if no piece do nothing

        // if first stack already selected
            // select second stack
            // if isMoveLegal(firstStack, secondStack)
                // move piece
                // checkForWinCondition();
            // else do nothing


    }
}

// start game by clicking first piece
// todo Add timer

// then pick another stack
// if move is legal move piece
function isMoveLegal(firstStack, secondStack) {

}

// if pyramid is complete at last stack end game
function checkForWinCondition() {

}



const game = new gameObject();