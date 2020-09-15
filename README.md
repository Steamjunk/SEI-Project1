# SEI-Project1 

## Pyramid Panic!
This game is a version of the Tower of Hanoi with graphics of pyramid pieces. 

The Pharaoh has decreed that the great pyramids of his ancestors be moved so that they do not block his view of the sun at the palace. It sounds mad to move an entire pyramid, but the word of the Pharaoh is law! So you'd better get started...

### Game Features:
The player moves pyramid pieces one by one to get them all to the other side of the desert. It is a functioning Tower of Hanoi puzzle.

After the first move a timer starts. The timer is framed by a sun traveling across the sky above the pyramid. If the time is up and the player has not completed the pyramid the game is over and they are doomed to suffer the wrath of the Pharaoh. 

The difficulty can be modified by the player before the game by selecting the number of pyramid levels.

There is a reset button to begin the game again.

### The Rules:
1. One piece may be moved at a time.
1. A piece can be moved to any open spot or on top of a larger piece.
1. Move the entire pyramid to its final resting place before sundown or else!

![WireFrame](https://i.imgur.com/ZLvMyFW.png)

### Technology 
This app uses HTML, CSS and JavaScript

### Approach
The game is held entirely within a gameObject and a gameManager class in the script. 

The game field is modeled as three stacks, each holding zero or more pieces. One stack is selected and then another, if a piece can be legally moved it resolves.

I designed the game scene to be user friendly. The block selection region is large and ground sections are labeled to be more intuitive. Pieces can be quickly moved by a skilled player to get good times.

The sun animation pressures the player with a visual cue and they are rewarded with artwork at the end of the game.

### Unfinished features
The high score board has not been implemented.