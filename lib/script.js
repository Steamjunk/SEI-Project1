console.log('Moving Mumnmies script linked');


class gameObject {
    constructor() {
        this.gameStacks = [document.querySelector('#stack1'), 
                           document.querySelector('#stack2'), 
                           document.querySelector('#stack3')]
        this.gameStacks.forEach(stack => {
            const handleStackClickBind = this.handleStackClick(stack);

            stack.addEventListener('click', handleStackClickBind);
        });
    }

    // each turn pick a stack
    handleStackClick(selectedStack) {
        console.log(selectedStack);
    }
    
    
}

// start game by clicking first piece


// then pick another stack
// if move is legal move piece
function isMoveLegal() {

}

// if pyramid is complete at last stack end game
function checkForWinCondition() {

}



const game = new gameObject();