---
page: Python Games
description: A project guide to show learners how to start making games using Python and Pygame
---
# Build your own games with Python

[[toc]]

## What are we making?

In this project you’ll learn how to make your own game in Python. We’ll start with simple text games (like quizzes and adventures) and later you can move on to games with graphics like the famous Snake! game.

You’ll learn how to:

- Ask the player questions
- Check their answers
- Keep score
- Make your code easier to expand with functions and lists
- Follow player commands and instructions
- Draw graphics
- Move things around the screen

Along the way you will also learn how to:

- take your game ideas and turn them into a design that you can make in code
- investigate and solve problems
- search for help and ideas - even professional programers do this every day

To make these games you will need some kind of Python app. If you are not sure get someone to help you set up [Thonny](https://thonny.org/) or another Python app on your computer. You can use a website like [the raspberry pi editor](https://editor.raspberrypi.org/en-US/projects/blank-python-starter) to get started but some of the exercises won't work in an online editor.

There are also some other great [Python game projects on the raspberry pi website](https://projects.raspberrypi.org/en/interests/games)

## Chapter 1 - A basic quiz game

### Step 1 - Ask a question (and remember the answer)

Try this:

```python
input("What is your favourite colour?  > ")
```

This asks a question - but it doesn’t save the answer anywhere.
This is better:

```python
player_answer =input("What is your favourite colour?  > ")
print("Your favourite colour is", player_answer)
```

**Your turn:** Think of some more questions and add more code to ask the player the questions and show their answers. You can try things like:

- What is your name?
- What is your favourite animal?
- What is your favourite food?

### Step 2 - Check the answer (right or wrong)

Games need to react to what the player types. We do this with if and else.

Here is an example so how if and else work. Important things to notice:

- The : (called a colon) at the end of if and else
- The gap at the start of the lines (called indentation)


```python
if player_answer=="the correct answer":
    # This block of code only runs if the answers match
    print("Well done!")
else:
    #This block of code only runs if the answers don’t match
    print("Wrong!")
```


Try a quiz question:

```python
player_answer=input("What is Batman’s favourite colour?  > ")
if player_answer=="black": 
    print("Well done!")
else:
    print("Wrong!")
```

**Your turn:** Make 3 quiz questions of your own. Examples:

- "What colour is the sky on a clear day?"
- "How many legs does a spider have?"
- "What sound does a cow make?"

### Step 3 - keep score

Now let’s give the player points for correct answers:

```python
# Start with the score at 0
total_score=0
# First question
player_answer = input("What is 2 + 2?  > ")
if player_answer == "4":
    print("Well done!")
    total_score = total_score+1
else:
    print("Wrong!")
    total_score = total_score + 0
# More questions can go here
print("Game Over!")
print("Your points: ", total_score)
```

Things to notice:

- Code which starts with # are comments for programers to read and Python ignores them. As your game gets bigger and more complicated comments can help you remember how the code works.
- The blocks of code for if and else can have lots of lines in them. The indentations tell Python where the blocks start and finish.
- The print("Game Over!") line isn't part of the else block because it isn't indented the same as the other lines.
- We have a line that says `total_score = total_score + 0`. In this game that won't make any difference and we could miss it out. If you wanted to give the player a penalty for a wrong answer you could change this line to take points away.

**Your turn:** Add scores into your quiz game. If the score isn't changing the way you expect, you can add in prints to see what Python is actually doing `print("Score is now:" total_score)`

### Step 4 - Tidy up (stop writing the same code over and over)

If you add more questions to your quiz you will keep writing similar code again and again. It is better to get Python to do the boring things for you. A function is a way to make a mini-program you can use several times.

```python
# A function to ask a question and give points
def quiz_question( question, correct_answer):
    player_answer=input(question)
    if player_answer==correct_answer:
        print("Well done!")
        return 1
    else:
        print("Wrong!")
        return 0

# Use the function
total_score=0
total_score+=quiz_question("What is Batman’s favourite colour? > ", "black")
total_score+=quiz_question("What is Barbie’s favourite colour? > ", "pink")
print("You got", total_score, "points")
```

Things to notice:

- def tells Python that this code defines a function
- the brackets () after the function name
- the list of parameters inside the brackets. These are a way to pass information into the function. That way our function can handle any question and answer.
- the : (colon) at the end of the def line
- how the indentation shows where the function code begins and ends
- The double indentation inside the if and else blocks
- the return lines which lets us pass back information
- the way we use the function for our questions. We fill in the parameters and use the returned points.

**Your turn:** Add your own questions using the function (much less typing)

>**Bonus challenges:** Make a smarter quiz_question function that can do things like:
>
>- Get your function to add on the "? > " parts so you don't have to type it on the end of every question
>- Allow the player to use capitals or lower case and still get points. For example 'black', 'Black', 'BLACK' and 'bLACk' are all treated the same. Investigate Python string methods like lower() to do this.

### Step 5 - Keep your questions in a list (Super organised)

A list can store all your questions and answers together:

```python
# Make a quiz list
quiz = [
    ("What is Batman's favourite colour? >", "black"),
    ("What is Barbie's favourite colour? >", "pink")
]

# Ask the questions using a loop:
for (question, answer) in quiz:
    total_score+=quiz_question(question, answer)
print("You got", total_score, "points")
```

Things to notice:

- The [ ] (square brackets) around the whole list
- The ( ) (brackets) around each pair of questions and answers.
- How the , (commas) separates items in the list and each pair of questions and answers
- How the for loop gets each item from the list
- How the for loop unpacks the question and answer from each item

**Your turn:** Use a list of 5 questions in your program

## Chapter 2 - Give the player more control

We will let the player give us special instructions as well as answers. Here are the instructions:

- "leave" - stops the game
- "pass" - skips the question

We will have to make several changes to our quiz game. You can do this in one go (see the [examples](#chapter-1---a-basic-quiz-game) at the end of this project) but you will learn more and be a more successful games programmer if you do this bit by bit and keep checking things work. Make sure you keep saving your program so you don't lose what you are doing.

### Step 6 - Get instructions from the player

Change the program so our quiz_question function can give back more information.
In the function there is code to return the number of points like this

```python
        return 1
```

Now we need to return points and an instruction like this:

```python
        return (1, "answer")
```

When we use the function we need to handle the points and the instruction. Instead of this line:

```python
    total_score += quiz_question(question, answer)
```

We will need:

```python
    (points, instruction) = quiz_question(question, answer)
    total_score += points
```

Things to notice:

- How we use () and , to send and receive the information back from the function. If you want to check this is working you can add in prints inside your code to see what is happening `print("Points:", points, " Instructions:", instructions")`.

**Your turn:** Change you program so that your function sends back a score and the word "answer". There are two `return` lines to change. Change the line where we use the function so we can get the score and the instruction and then use the score to update the players total. We aren’t doing anything with the instruction yet. That's ok for this step. Test your quiz now and check it works just as before.

### Step 7 - Allow valid instructions

In our quiz_question function we can have two results (or branches): right or wrong. Now we are going to need four results: right, wrong, pass or leave. Let’s change our function to allow this.

```python
    if player_answer=="leave":
        print("OK. Come back and play another time.")
        return (0,"leave")
    elif player_answer=="pass":
        print("OK. Skip this question")
        return (0, "pass")
    elif player_answer==correct_answer:
        print("Well done!")
        return (1, "answer")
    else:
        print("Wrong! You lose a point")
        return (-1, "answer")
```

Important things to notice:

- the if, else and elif (short for "else if") lines
- the : at the end of some of the lines
- how some lines have more indentation than others
- how we make the player lose a point for a wrong answer

**Your turn:** Make these changed inside your quiz loop. The program gives the player the right messages but the leave instruction doesn't stop the game yet. That's ok. Check the rest of your quiz game is still working.

### Step 8 - Leave the game

We can add two lines to handle the leave instruction and finish the game early like this:

```python
    if instruction=="leave":
        break
```

**Your turn:** Can you work out where these lines go into your game? Try it and see what happens. If it doesn't work, try again.

**Clue:** break statements are used to escape out of loops early.
If you need help look at the [examples](#examples---chapter-2) at the end of this project.

## Chapter 3 - More players

Now we will let more players take the quiz. We will keep a board of high-scores and let new players add their nickname or gamer tag when they get a new high-score. Just like Chapter 2 you can look at the [example](#examples---chapter-3) at the end of the project but you won't learn very much from copying that. If you want to learn more go through these steps and check your game works each time.

### Step 9 - Put each quiz round into a function

As we want to do the quiz several times we can put it in a function. Use these hints to reorganise your code:

```python
# Keep your quiz questions list as before
quiz = [
    # Your quiz questions and answers
]

# Keep your quiz_question function
def quiz_question( question, correct_answer):
    # Your function code as before

# Add a new quiz_round function
def quiz_round():
    # All of your other code moves into here, but you will have to change the indentation

    # pass back the final score
    return total_score

# Play a round of the quiz
quiz_round()

```

Things to notice:

- quiz_round doesn't have any parameters but we still need the () when we define it and use it.

**Your turn:** Add in the quiz_round function and reorganise your code. If you get stuck look at the [examples](#examples---chapter-3) at the end of the project. We haven't added anything for high scores and players yet but check the game still works.

### Step 10 - Play many quizzes

We can now put the quiz_round into a loop to play many times like this:

```python
keep_playing=True
while keep_playing:
    print("Welcome to the amazing quiz game!")
    gamer_tag = input("Type in your nickname or gamer tag > ")
    print("OK,", gamer_tag, "let's play.")
    player_score=quiz_round()
    if input("Is there another player? > ")=="no":
        keep_playing=False
```

Things to notice:

- The way we use the keep_playing variable to continue or stop the game. Can you see how this works?
- The double indent inside the if block of code. Can you work out why we need that?
- When we use = to set a value and when we use == to check a value

**Your turn:** We are not keeping a score board yet but check your game works for several players now

### Step 11 - Add in score board

We used a list to store our questions and answers. Now we can use a list to store our scoreboard. Add this code near where you have stored your question and answer list:

```python
# Start with an empty scoreboard list
scoreboard = []
```

Next, we add a function to show the scoreboard. Put this near your other functions.

```python
# Show the scoreboard
def show_scoreboard():
    print("Top Scores")
    position = 1
    for (gamer_tag, score) in scoreboard:
        print (position, ":",gamer_tag,"=",score)
        position+=1
```

Things to notice:

- How we make an empty list with []
- Look how we have used a position variable so that the scoreboard lines have a number

Then we need a function to add a new score to the board:

```python
def add_new_score(gamer_tag, score):
    scoreboard.append((gamer_tag, score))
```

Things to notice:

- We've used two pairs of brackets for scoreboard.append. The look the same but they mean different things to Python. append is a function so we need the outer pair for the parameters. The item we are adding to the list has two bits of information in it so the inner pair of brackets groups these into one item to add to the list. What happens if you make a mistake and miss one of the pairs of brackets? Try it an see.

Finally, we can use these parts in the keep_playing loop.

```python
        # Show the scoreboard
        show_scoreboard()
```

```python
        # Add new score to the scoreboard
        add_new_score(gamer_tag, player_score)
```

**Your turn:** Put the new code in your quiz game. Double check the indentations as it is easy to get this wrong. If you get stuck look at the [examples](#examples---chapter-3) at the end of this project

### Step 12 - Improve the scoreboard

You might have noticed some problems with the scoreboard:

- It just shows a title when the scoreboard is empty.
- It shows the scores in order of play, not in the order of the scores
- It shows all the scores, not just the top ones

Let's fix these by changing our show_scoreboard function. First let's skip showing the scoreboard if there is nothing in there.

```python
# Show the scoreboard
def show_scoreboard():
    if len(scoreboard) > 0:
        print("Top Scores")
        position = 1
        for (gamer_tag, score) in scoreboard:
            print (position, ":",gamer_tag,"=",score)
            position+=1
    else:
        print("No top score yet")
```

Things to notice:

- We've use a len() function and the > symbol (known as greater than) to check the size of the board
- We've used if and else to react to the size of the board
- We've changed the indentation. The block inside the for loop is indented three times. Can you work out why we need to do that?

**Your turn:** Try this small change and check it works.

Now let's fix the order. Python knows how to sort lists so we can add in:

```python
        scoreboard.sort()
```

Things to notice:

- sort is a special type of function that works with lists. We use scoreboard.sort() and not sort(scoreboard)

**Your turn:** You need to put it in the right place in the show_scoreboard function. Try it in some different places to see what happens. If you get stuck check out the [examples](#examples---chapter-3) at the end of the project.

The sort() function works but it isn't sorting in the right way. Luckily, we can give sort some more information to get it right. First, we make a helper function so sort can find the score rather than the gamer_tag.

```python
def scoreboard_sort_key(sb):
    (gamer_tag, score) = sb
    return score
```

Now we can give some more parameters to sort to get it right.

```python
        scoreboard.sort(reverse=True, key=scoreboard_sort_key)
```

Things to notice:

- So far, we have used "positional" parameters for functions just by putting things in the right order. list sort uses names parameters. This is a bit of an advanced topic so don't worry about it now. It is just necessary for list sort.

Finally, we can only show the top scores. Inside our show_scoreboard we have a position variable that counts up each time we show a line in the board. We can check this number and break out of the loop.

```python
        if position > 10:
            break
```

**Your turn:** See if you can find the right place to insert this code and check it all works. If you get stuck look at the [examples](#examples---chapter-3) at the end of the project.

## Chapter 4 - Saving and loading games

When we leave the game, we lose the scoreboard and it starts empty the next time we play. Instead, we can save the scoreboard information in a file and load it back in the next time we play.

We will make some more functions to work with files:

- get the scoreboard from a file if it exists
- replace the scoreboard file with the new top scores at the end of the game

### Step 13 - Save the scoreboard

Since the scoreboard is a simple table with two columns we can save it with comma-separated-values (.csv file).

We can use Python's csv module to help with this.

At the start of our program we need to add in the module like this:

```python
import csv
```

Here is a function to save the scoreboard:

```python
def save_scoreboard():
    with open("quiz-scores.csv", "w", newline="") as file:
        writer=csv.writer(file)
        writer.writerows(scoreboard)
```

Things to notice:

- The with block creates a variable for handling the file. At the end of the block the file gets closed automatically to keep everything tidy.
- We open the file in write mode with "w". Whatever was in the file will be replaced by our new data.
- We use the csv module to convert our scoreboard and put it in the file

After we have updated the scoreboard we can save it in the file with:

```python
        save_scoreboard()
```

**Your turn:** Update your game by adding in these bits of code on the right places and check that it works. If you get stuck, you can check the [examples](#examples---chapter-4) at the end of the project. You should be able to see the file is created after the first game. You can open the file with a text editor or spreadsheet app to inspect the data.

### Step 14 - Load the scoreboard

Loading the scoreboard looks very similar:

```python
def load_scoreboard():
    with open("quiz-scores.csv", "r") as file:
        global scoreboard
        scoreboard=[]
        reader=csv.reader(file)
        for (gamer_tag, score) in reader:
            scoreboard.append((gamer_tag, int(score)))
```

Things to notice:

- our scoreboard list lives outside of the function but we want our function to give it a new value so we use the global statement. If we didn't do this Python would think we are making a new scoreboard inside the function which would be lost at the end of the function
- In the csv file, everything is stored as text. To us the text "10" and the number 10 seem like the same things but to computers and Python they are quite different. In the loop we've used the int() function to turn the figures in the file into an actual score number.

We can use this function with:

```python
        load_scoreboard()
```

**Your turn:** Put these bits of code in the right places and check they work. If you get stuck look at the [examples](#examples---chapter-4).

>**Watch out** We made the save function first so we already had a scoreboard file when we added the load. The program won't work if the file is not there. The [example](#examples---chapter-4) code at the end of the project adds some extra code, a try except block, to fix this if you really need it. A try except block lets your program cope with problems instead of stopping - in this case it lets us carry on if the file is missing.

## Chapter 5 - An adventure game

Let's use what we have learnt to make a new game. This is going to be a text adventure game. It is up to you what sort of adventure it will be. It could be a dungeon adventure with wizards, knights and dragons. It could be a wildlife adventure with animals and scientists. Use your own hobbies, interests and imagination.

### Step 15 - The game world

The game world will live in a dictionary. A dictionary is like a list, but you can use labels to access each item.

```python
game_world = {
    # Each place or event has a label and a value
    "wilderness": ...value...,
    "castle": ...value...,
    "end" : ...value...,
    "killed" : ...value
}
```

We can also use dictionaries to hold the details about the places and events.

```python
# Main dictionary to hold the whole world
game_world = {
    # Each place or event has a label and a smaller dictionary for things like the title and description
    "wilderness": {
        "title": "Wilderness",
        "description": "You stand alone in the barren wilderness. There is a castle in the distance",
    },
    "castle": {
        "title": "Castle",
        "description": "You enter the castle and are confronted by the evil dragon!",
    },
    "end" : {
        "title": "The End",
        "description": "You return to your village"
    },
    "killed" : {
        "title": "The End", 
        "description": "Without your own magic you are no match for the dragon!",
    }
}
```

We will also add a list of actions you can take and where the action will take you. If we have got to the end of the story there are no more actions.

```python
game_world = {
    "wilderness": {
        "title": "Wilderness",
        "description": "You stand alone in the barren wilderness. There is a castle in the distance",
        "actions": [
            ("Return home", "end"),
            ("Enter the castle", "castle")
        ]
    },
    "castle": {
        "title": "Castle",
        "description": "You enter the castle and are confronted by the evil dragon!",
        "actions": [
            ("Fight the dragon", "killed"),
            ("Run away", "wilderness")
        ]
    },
    "end": {
        "title": "The End",
        "description": "You return to your village"
    },
    "killed": {
        "title": "The End", 
        "description": "Without your own magic you are no match for the dragon!",
    }
}
```

**Your turn:** Make your own game_world and add in a few places and events that fit your story. Add in actions to link them together.

### Step 16 - The game loop

**Big Step:** This step is harder than usual - take your time and don't be afraid to get help

Next, we will program our game loop. Although the loop will be short and simple we can create exciting, complex adventures just by putting more into the game_world dictionary.

```python
# Set the player position to the beginning of adventure
player_position = "wilderness"

# Game status
keep_playing = True

# Game loop
while keep_playing:
    # Use player_position as a key to get the details of the place
    place=game_world[player_position]
    # Use keys to extract the details we want
    title=place["title"]
    description=place["description"]
    print(title)
    print("~~~~~~~~~~~~~~~~~~")
    print(description)
    print()
    if "actions" in place:
        # There is an action list so we can use it to ask the player what to do
        actions = place["actions"]
        print("What do you want to do next?")
        # Loop through the available actions. 
        # action_number will count up from 0 and stop depending on the number of available actions in the list.
        for action_number in range(len(actions)):
            # actions is our list of available actions.
            # actions[action_number] picks out one action
            # each actions has two parts.            
            (description, destination) = actions[action_number]
            print(action_number, ":", description)
        # Convert the player input into a number. The text "1" becomes the number 1
        choice = int(input("Type the action number >"))
        print()
        # actions[choice] picks out the chosen action
        # actions[choice][1] picks out the second part of the pair which will be the destination for the player
        player_position = actions[choice][1]
    else:
        # No actions so this must be the end of the game
        if input("Play again? > ") == "no":
            # Leave the game
            keep_playing=False
        else:
            # Go back to the start position
            player_position="wilderness"
print("Game over. Good luck!")
```

Things to notice:

- We've borrowed code from the quiz game. For example, the keep_playing variable and loop.
- We want to use the player's input as a number so we use the int() function to change the input
- How we are using the action list and the action_number loop
- An action contains two parts so we can access those with `(description, destination) = actions[action_number]`. At this point we don't use destination so we could have missed it out `(description, _) = actions[action_number]` or accessed just the description with an index `description = actions\[action_number][0]`

**Your turn:** Try your game world with this game loop. If your player ends up in the wrong place, try adding prints to check player_position and actions at the start of each loop.

>**Bonus challenge:** Have you noticed what happens if you don't type one of the valid action numbers? Can you design a helper function to fix these problems. The function will keep asking the player for an input until they enter something valid. It will then return the value as an integer. There are many different ways to do this in Python. You can use an internet search to find some examples and use these as clues to help you define the function and use it.

### Step 17 - Finding and using items in the adventure

The game is quite fixed at the moment. Each time you visit a place or get into a situation the actions and results will be the same. We can make the game more interesting by placing things in the game_world that the player can collect and use to change how the adventure unfolds. For example, a magic sword might help the player defeat the dragon and reach the next part of the adventure. Maybe we can make friends with the dragon with some food.

First, lets re-organise our game_world to include items. We can add in items and provide special actions if a player has an item.

```python
game_world = {
    # There is a magic sword in the wilderness. If you have the sword it changes what happens in the castle.
    "wilderness": {
        "title": "Wilderness",
        "description": "You stand alone in the barren wilderness. There is a castle in the distance",
        "item": "magic sword", # Give the player an extra action to collect the item
        "actions": [
            ("Return home", "end"),
            ("Enter the castle", "castle")
        ]
    },
    "castle": {
        "title": "Castle",
        "description": "You enter the castle and are confronted by the evil dragon!",
        "actions": [ # Use these actions if the player doesn't have the special item
            ("Fight the dragon", "killed"),
            ("Run away", "wilderness")
        ],
        "magic sword": [ # If the player has the magic sword use these actions instead
            ("Fight the dragon", "win"),
            ("Run away", "wilderness")
        ]
    },
    "end": {  # If there are no available actions we know the game has reached the end
        "title": "The End",
        "description": "You return to your village"
    },
    "killed": {
        "title": "The End", 
        "description": "Without your own magic you are no match for the dragon!",
    },
    "win": {  # New ending that requires the magic sword
        "title": "A New Hero",
        "description": "The dragon is powerful but with the magic sword you win the battle and save your village!",
    }
}
```

**Your turn:** Re-organise your game world to include one or two items.  Add in a special list of actions in the places where they will be used. Your program doesn't use this new information yet so let's fix that next.

### Step 18 - Collect items

We can use a list to keep track of the items that the player has.

```python
player_items = []
```

If a location has an item we can add a special action that lets us take it.

```python
if "item" in place:
    print(len(actions), ": Pick up the", place["item"])
```

We need to check if the player has picked this action and then take the item

```python
if choice==len(actions):
    player_items.append(place["item"])
    del place["item"]
else:
```

**Your turn:** Find the right places to add in this new code and try your game. You should be able to take the items and then they are no longer there. If you get stuck, you can look at the [examples](#examples---chapter-5) for some clues. You can't use the items yet, but we will do that next.

>**Bonus challenge:** You might notice that the first player gets the items. If you play again the items have gone. See if you can fix this. There are several ways you could try:
>
>- Find a way to take a copy of the whole game_world so you can reset everything for the next game
>- Load the game_world information from a file and reload it for each game
>- use a list to keep track of taken items and where they below so you can reset them before the next game.
>- Don't delete the items but instead add a `"taken" :True`. You can check for this to make sure you can't take something twice, but it is easy to remove all of these to reset the game.
>- Some other trick that you invent

### Step 19 - Use the items

Now we need to check if the items we have give us new possibilities.

```python
for carried_item in player_items:
    if carried_item in place:
        # There are special actions for one of the items we have. Let's use them instead.
        actions=place[carried_item]
        break
```

**Your turn:** Find the right place for this code and try your game. If you get stuck use the [examples](#examples---chapter-5) for clues.

### Step 20 - Invent and code your own features

Make a list of features you want in your adventure. Work out some small steps you can take to add in the code and check it works before adding the next small part. Here are some ideas:

- Add in items like medicine or potions that can only be used once or a limited number of times
- Limit what the player can carry. What happens if the player reaches a limit? Can they drop items and come back and collect them.
- Add in skills and abilities that the player can get and not just items
- Keep a track of achievements or rewards that unlock new parts of the adventure
- Let the player type in instructions like "move", "look", "search" and "use" instead of numbers. **Clue:** You have already coded something like this for your quiz game and you may be able to borrow some of that.
- Keep track of how strong or healthy the player is and change this depending upon what they do
- Use some randomness or timers so that game is not the same every time
- Add in non-player characters. Change what these characters do depending upon what the player does.
- Load the game_world from a file and create an editor programme to make it easier to create new worlds

## Chapter 6 - Graphics

In this chapter we will start making games with graphics. This will be the hardest chapter so far - don't worry it it takes longer. That just means you are learning more!

We will make use of a beginner's game library called pygame. There are many games libraries you can use which are good at different things. pygame is good at helping you to learn basic game skills and python coding. These are good skills you can keep using if you move on to more advanced game libraries or game engines like Unity.

Your python editor will have instructions for how to install libraries like pygame and or you can search for help and guides online. If you are using [Thonny](https://github.com/thonny/thonny/releases) there is a package manager under the tools menu so you can search for pygame and install it.

### Step 21 - A simple game template

Let's start with a basic game template. This project uses the example in the [pygame documents](https://www.pygame.org/docs/).

```python
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

# Setup the start position for the game

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Handle any user input

    # Perform other work such as game effects or non-player characters

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    # Draw your game screen

    # flip() the display to put your work on screen. Before this your work will be hidden
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```

**Your turn:** Run this template to check things are working. You will just see a purple game window and you can close the window to stop the game.

### Step 22 - Our first graphics game

Let's fill in some more of the template. This will draw a circle and let you move it around with the keyboard arrow keys.

```python
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

# Setup the start position for the game
player_pos = pygame.Vector2(screen.get_width()/2, screen.get_height()/2)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Handle any user input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        player_pos.y -= 40
    if keys[pygame.K_DOWN]:
        player_pos.y += 40
    if keys[pygame.K_LEFT]:
        player_pos.x -= 40
    if keys[pygame.K_RIGHT]:
        player_pos.x += 40

    # Perform other work such as game effects or non-player characters

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    # Draw your game screen
    pygame.draw.circle(screen, "red", player_pos, 40)

    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```

**Your turn:** Start with this simple example, experiment and make changes to learn about how things work. Here are some ideas:

- See what happens when you press pairs of arrow keys or all four at the same time
- Put a # at the beginning screen.fill("purple") line - this turns the line into a comment so that Python ignores it. Play the game again and see what happens. When you are done, you can remove the # and the game will be back to normal.
- Change the clock.tick(...) value. Try 5 and 60.
- Change the colours of the background and circle
- Change the size of the window and the circle
- Change the circle to a rectangle using `pygame.draw.rect(screen, "red", pygame.Rect(player_pos, (40,40)))`

### Step 23 - More game controls

Let's jump right in and keep experimenting. If you get stuck the pygame website has great help guides or check the [example](#examples---chapter-6) at the end of the project.

**Your Turn:**

- Change or add more keys to move around. You can use `pygame.K_w` for the 'W' key on the keyboard. Guess or lookup what the others are.
- Add in code so that pressing the 'Q' key quits the game.
- Add in code so you can use keys to switch the player shape and colours. **Hint:** you will need to add in shape and colour variables, set them at the start, and change them if the keys are pressed.
- Add this line into the game loop `player_pos=pygame.Vector2(pygame.mouse.get_pos())`. Remember to indent it correctly. What do you think this will do try it and see. Now try the arrow keys. Can you explain what is happening?

### Step 24 - Using images

Coloured shapes are ok to get basic games working but it can be fun to use images.

If you have an image file you can use it in pygame like this:

```python
your_image_variable = pygame.image.load("your_image_filename")
```

You can use the image as the screen background like this.

```python
screen.blit(your_image_variable, (0,0))
```

The (0,0) tells pygame where you want the top-left part of the image to appear on the screen. You can use the image as the player like this.

```python
screen.blit(your_image_variable, player_pos, pygame.Rect((0,0), (40,40)))
```

We have put the top-left part of the image at the player position. We've also given pygame a rectangle so that the image is cut down to our player size. We make rectangle with pygame.Rect and set the start position and size of the rectangle. pygame has functions to stretch and shrink images. Investigate `pygame.transform` if you need this.

**Your turn:**

- Find or make an image of a background that you like. Load the image and use it to cover the background of the game.
- Find or make an image for the player. Load the image to a variable in the same way that you did for the background and use it in place of the simple shapes.
- You can look at the pygame website or the [examples](#examples---chapter-6) at the end if you need help

## Chapter 7 - A catching and dodging game

We'll make a game where the player moves their piece on the screen to avoid or capture things. We will adapt the game you started in Chapter 6. This chapter explains the steps to take but doesn't tell you exactly how to make the changes. You will have to work things out, try things and fix problems. If you get stuck, the [examples](#examples---chapter-7) at the end of the project or an internet search should help you fix the problem.

### Step 25 - Get the player ready

We can set the player to start on the left-hand side of the screen, and we will use a rectangle to show their position. We could use a different shape, but a rectangle is good because we have already seen how to change this to an image if you wanted to improve the basic game later. Pygame also provides handy functions that work with rectangles.

```python
# Start position for player
# The top left of the player will be 80 steps across and halfway down the screen
# The player will be 80 steps wide and 80 steps high
player_pos = pygame.Rect((80,screen.get_height() / 2), (80,80))
```

We can draw the rectangle like this.

```python
pygame.draw.rect(screen, "white", player_pos)
```

**Your turn:** Make some more changes to the program so that we just have two keys which can move the player up and down. We won't move left of right in this game. It can be annoying if the player moves off the edge of the screen. If you want to stop this, you can "clamp" the player into the screen area using a pygame helper function like this:

```python
player_pos.clamp_ip(screen.get_rect())
```

### Step 26 - Send targets across the screen

Now we will set up another rectangle that will be a target we can send across the screen. We don't want the targets to be predictable so we can use randomness to make the game harder.

We can import the random module near the top of our game and use the `randint` function to set an unpredictable position.

```python
import random

    ...

target_pos = pygame.Rect((screen.get_width(),random.randint(0,screen.get_height())), (80,80))
```

Inside out game loop we can move the target a small amount each time and draw it. It will appear to move across the screen as the game runs.

```python
# Tells pygame to move the target some steps right and down. We use minus numbers to go left and up.
target_pos.move_ip((-1,0))

    ...

pygame.draw.rect(screen, "yellow", target_pos)
```

If the target gets to the other side of the screen, we can reset it to a new position.

```python
if target_pos.x < 0:
    target_pos = pygame.Rect((screen.get_width(), random.randint(0, screen.get_height())), (80,80))
```

**Your turn:** Add in the code for the target and check that it works. You may notice some things that are not quite right. Fixing these can be your **bonus challenge:**

- The target moves really slowly. Change the speed to make the game harder.
- The target starts again when it touches the edge of the screen. If you want it to leave the screen entirely you can check for `target_pos.right` instead of `target_pos.x`
- Sometime the target will start too low so it is not entirely on the screen. You can fix this by adjusting the randomint parameters. *Clue:* Think about how far down the screen the target can go before it touches the bottom.
- We have the same complicated code to set the target_pos in two different places. It would be neater to define a function which returns the position rectangle. Define and use a function to do this.
- If you want to check what is going on inside the program you can add in some prints so that you can see the values but take care. The game loops runs really fast so the prints might be too fast to read. Prints will work best where specific things happen like when rectangles collide or you can check for a special key and only print when the key is pressed.

### Step 27 - Catch the target and score points

Let's create a variable for our score.

```python
player_score = 0
```

To display the score we will use pygame fonts. There is a lot we can do with text in pygame, but we will start with something simple. Near the start of the game we need to setup the font we want to use.

```python
# None means we will let pygame choose the text style, 48 is the size of the text
score_font = pygame.font.SysFont(None, 48)
```

When we are creating our display in the game loop we can show the score

```python
    # Create a text message to show our score
    score_message = "Score: " + str(player_score)
    # Use our font to turn some text into an image
    score_image = score_font.render(score_message, True, "black")
    # Place the image on our screen
    screen.blit(score_image, (10,0))
```

Things to notice:

- font.render only accepts a single string to display so it isn't as flexible as python's print command which can handle lots of different parameters.
- We've used string addition to combine several parts into one
- String addition doesn't work with numbers so we have used the str() function to convert the score into text. This is the opposite of when we used int() to turn text input into a number.
- We could have used a template string to insert variables into our message like this:

    ```python
    score_message = f"Score: {player_score}"
    ```

When we hit a target we can add a point and reset the next target. We can use pygame's rectangle helper functions for this.

```python
# Check of the player and target rectangles have collided
if target_pos.colliderect(player_pos):
    player_score+=1
    target_pos = ....
```

**Your turn:** Update your game and watch your score go up as to catch the targets.

### Step 28 - Watch out for the hazard!

If we repeat the work we have done for the target, but with some very small changes we can add in a hazard that we must avoid:

- Set a position for the hazard
- Move it and draw it each turn
- check for a collision with the player
- If the hazard hits the player the game is over.

 **Your turn:** Add in a hazard piece. Perhaps it moves faster than the target. Check if it hits the player and end the games.

 >**Bonus challenge:** At the end of the game display a message and wait for the player to close the window. You can use a template string to include the final score in the game over message.

### Step 29 - Add your own features to the game

With the building blocks in this chapter, you can make almost any 2D or flat screen game. In the next chapter we will work through a snake game but almost anything is possible.

**Your turn:** Here are some things you could try yourself before we move on:

- Add in images. This could be a puzzle, sports game, space game, animal game, fantasy, an adventure or almost anything else with a different background and images instead of rectangles.
- As the game goes on speed up the movements or move the player closer to the other side of the screen so there is less time to react
- Gradually add multiple hazards at the same time to make them harder to avoid
- Add more types of things that have different effects, for example, make small, fast targets that are worth extra points
- Make things move diagonally, bounce or even randomly
- Make the hazards home in on the player
- Use the mouse to control things
- Give the player 3 lives and let them choose to play again
- Add an extra player. Maybe each player can fire hazards at the other or try to bounce a target between them.
- Show a clock and score points completing a challenge quickly or staying alive for longer
- Briefly show messages or encouragement when certain things happen
- Experiment with mixer to add sound effects
- Add in a ground layer or platforms and have the player drift down unless they jump or get a boost up.
- Swap things around so that the player slides across the bottom and the targets and hazards fall from the top
- Mix in the text style games from the earlier chapters. Setup a game_world as before but use the pygame graphics to show the player and the surroundings and pygame controls to move around the world and overcome the challenges.

## Chapter 8 - S N A K E !

In this chapter we will use the building blocks from our first simple game and make our own version of Snake - it is one of the first video games and is so old that your parents, or even your grand-parents, may have played it!

### Step 30 - Get a new game template ready

Go back to the first graphics game in [Step 22](#step-22---our-first-graphics-game). We will just have a circle that moves around with the keys.

Next use the instructions in [Step 25](#step-25---get-the-player-ready) to switch to using rectangles.

Now is a good time to tidy up some things. The code has lots of copies of numbers like 40 and 80. We will probably need to change the scale and speed of the game later. This is hard to do because we have to change the numbers in lots of places. We can set size variable and use that for graphics sizes and movements.

We can set and use the size like this. This is just a sample and there are several other places where you should swap out a number for our new variable:

```python
step_size = 20
player_pos = pygame.Rect((screen.get_width()/2, screen.get_height()/2), (step_size, step_size))

    ...

if keys[pygame.K_UP]:
    player_pos.y -= step_size
```

The first thing we will change is to make the rectangle keep moving in a direction. We will setup a direction variable and use it to move the rectangle.

```python
# Record direction as steps right and steps down. Negative numbers move left and up
snake_direction = pygame.Vector2(step_size,0)

    ...

player_pos.move_ip(snake_direction)
```

**Your turn:** Make these changes and test the game. You should have a square you can move but it drifts across the screen on its own

### Step 31 - Change direction

Now we will use keys to control the direction of the snake. We can setup some direction variables and use them to change the direction when the player presses the right keys. A dictionary can do this:

```python
directions = {
    "UP" : pygame.Vector2(0,-step_size)
    "DOWN" : pygame.Vector2(0, step_size)
    "LEFT" : pygame.Vector2(-step_size,0)
    "RIGHT" : pygame.Vector2(step_size,0)
}
```

We can use it like this:

```python
snake_direction = "RIGHT"

    ...

if keys[pygame.K_UP]:
    snake_direction = "UP"

    ...

player_pos.move_ip(directions[snake_direction])
```

**Your turn:** Add in a direction dictionary and change the player controls to set the direction.

### Step 32 - A longer snake

One square doesn't make a good snake so lets make a list of squares.

```python
# Set the initial size of the snake and the position of its head
initial_snake_length = 5
snake_head_pos = pygame.Rect((screen.get_width()/2, screen.get_height()/2, (step_size, step_size)))

# List to hold the snake
snake_body = []

# Build a list of rectangles to store our snake
for counter in range(1,initial_snake_length+1):
    snake_body.append(snake_head_pos.move(-snake_direction*counter))

    ...

# When needed draw the snake body
for body_part_rect in snake_body:
    pygame.draw.rect(screen, "grey", body_part_rect)
```

Things to notice:

- Sometimes we use the move_ip() function to change the position of a rectangle. This time we have used the move() function. This leaves the original rectangle where it is but gives us a new rectangle at the moved position.
- We've used -snake_direction so the body extends out behind the head. You can remove the - to see what happens if we didn't do this.
- Our loop counts up to the length of snake. Using *counter means we move each body part further out so they form a line.
- range() will normally count from 0 and stop before reaching initial_snake_length. We've adjusted the range so we get the right number of items and make sure the first body part doesn't sit on top of the head.

**Your turn:** Make these changes and get them working in your game. You game may still be moving and drawing player_pos so you should also make changes so that you are moving and drawing snake_head_pos. Now we have a body but the head leaves it behind when it moves! Lets fix that next.

### Step 33 - Body follow head

**Big Step:** This step is harder than usual - take your time and don't be afraid to get help

Now we move the body along behind the head. Every time the head moves we will add a copy of it to the front of the body and remove the end of the tail. We can use Python list functions like insert() and pop() to do this.

```python
    # Shift snake body
    snake_body.insert(0, snake_head_pos.copy())
    snake_body.pop()
```

**Your turn:** Find the right place to add in the new code and get the body to follow the head. Take care where this code goes. If you move the body after moving the head the body will overlap with the head. If you want to check what is going on you can add prints and you can also slow down the game `clock.tick(2)` to make it easier to spot problems

### Step 34 - Watch out, don't crash!

In the snake game you will lose if you crash into yourself or the sides of the screen. Lets add that to our game using the pygame rectangle helper functions.

```python
    # detect crash with your own body
    if snake_head_pos.collidelist(snake_body) == -1:
        pass
    else:
        running = False
    
    # detect crash with the edge of the screen
    if screen.get_rect().contains(snake_head_pos):
        pass
    else:
        running = False
```

Things to notice:

- collidelist() will return -1 if none of the body parts touches the head. In that case we pass and carry on. If not we stop the game.
- contains() will return True if the head is inside the screen. In that case we pass and carry on. If not we stop the game.

**Your turn:** Make the changes to game and test the game finishes correctly.

>**Bonus challenge:** Add a game over screen like you did for your previous game and give the player a chance to play again.

### Step 35 - Feed the snake

In this step we can add in some food for the snake to eat. We will place the food in a random place, making sure we don't drop it on top of the snake! If the snakes head reaches the food we will place some new food at another location, give the player a point and make the snake grow longer.

```python
# Make sure we import the random library
import random

    ...

# Function to get a safe place for the food
def find_food_pos():
    # Make a rectangle of the right size
    try_pos = pygame.Rect((0,0),(step_size, step_size))
    while True:
        # Set the rectangle to a random position
        try_pos.topleft = (
            random.randint(0, screen.get_width()-step_size),
            random.randint(0, screen.get_height()-step_size)
        )
        # Check for a collision
        if try_pos.collidelist(snake_body) == -1:
            # No collision so return this rectangle 
            return try_pos
    # We keep going around the loop trying random positions until we find one that doesn't collide

    ...

# Set the first food position
food_pos = find_food_pos()
# Start score at zero
player_score = 0

    ...


    # Check for food
    if snake_head_pos.colliderect(food_pos):
        player_score+=1
        # Copy the last part of the snake to make it longer
        snake_body.append(snake_body[-1].copy())
        food_pos = find_food_pos()

    ...


    # Draw the food
    pygame.draw.rect(screen, "green", food_pos)
```

Here are some things to notice. These are often good ideas when you are making your own programs:

- We've made a function to find a safe space to place the food so that we can use it in two places in our game.
- In some places we have long lines of code inside brackets and we have split these out over several lines to make them easier to read.
- Look at the structure of the function and how we have used the return statement to break out of the loop.
- Look at how we have copied the rectangle at the end of the list. Normally we use [0], [1] to count forward through a list. We can also use [-1], [-2] to count back from the end of the list.

**Your turn:** Work out how to add in this new code and test your game.

>**Bonus challenge:** Add in some more features to your game as you did in the earlier chapters. You could:
>
>- Show the score on the screen
>- Build a high score table

## Chapter 9 - A more realistic snake

Now we are going to change our rectangles into images. This will seem complicated but it is worth learning as you can use similar ideas if you want to make other types of games.

### Step 36 - Generate some images

First we need some images to use. In the [examples](#part-1---a-snake-image-generator) there is a program to which uses pygame to draw some images for our snake and save them to some files: one for the head and another for the body.

**Your turn:** Use the example program to generate the two image files. Open the files in a photo or image viewer so see what we have

>**Bonus challenge:** Modify the progam to change the images. For example you can use different colours.

### Step 37 - Use a single head and body image

I this step we will replace the head and body rectangles with images. At first, this won't look great as the head and body won't turn around as the snake moves but we can fix that later.

At the beginning of our program we can load our image and make any changes we need

```python
# Load the images from the image file
head_image=pygame.image.load("headimage.png")
body_image=pygame.image.load("bodyimage.png")

# Resize the images to the size we need. The files contain several tiles so we need to make room for these
head_image=pygame.transform.scale(head_image, (4 * step_size, step_size)) # Head has one row of 4 tiles
body_image=pygame.transform.scale(body_image, (3 * step_size, 2 * step_size)) # Body has two rows of 3 tiles

# Tell pygame about the background colour so it can remove this when we use the images
head_image.set_colorkey("white")
body_image.set_colorkey("white")
```

In our game loop we can replace our rectangles with images like this:

```python

    ...

        screen.blit(head_image, snake_head_pos, pygame.Rect((0,0),(step_size,step_size)))

    ...

        screen.blit(body_image, body_part_rect, pygame.Rect((0,0),(step_size,step_size)))

    ...

```

**Your turn:** Add the image code into your program and test to check your game is now using images.

>**Bonus challenge:** Find or make a background image for the game, load it, scale it and draw it in place of the purple background. The [example for Chapter 6](#examples---chapter-6) includes some code you can use to help you.

### Step 38 - Get the head  moving in the right direction

Let's get the head of the snake to turn in the right direction. The head_image contains 4 tiles for the four directions. We can use the direction to pick the right tile. One way to do this is with a dictionary that stores the position of the tile we want against the four directions.

```python
head_tiles = {
    "UP": (0,0),
    "LEFT": (step_size,0),
    "DOWN": (step_size*2,0),
    "RIGHT": (step_size*3,0)
}
```

We can use this to pick the right tile to show on the screen. We can change the code that draws the head to this:

```python
        tile_pos = head_tiles[snake_direction]
        screen.blit(head_image, snake_head_rect, pygame.Rect(tile_pos,(step_size,step_size)))
```

**Your turn:** Add in the code to show the right head tile and test your game. It might be quite hard to see what is going on. You can change the step_size = 40 and clock.tick(5) to have bigger images that change slowly.

### Step 39 - Draw the right body images

We will draw the body sections in the same way. The body is a bit more complicated because there are more tiles. First lets try to get the body right when the snake moves in a straight line. We can use another dictionary to hold the tile positions and change the body list to hold the body part position and the tile position together.

```python
body_tiles = {
    "UP": (0,0),
    "LEFT": (0,step_size),
    "DOWN": (0,0),
    "RIGHT": (0,step_size)
}
    ...

# List to hold the snake
snake_body = []
snake_tiles = []

# Build a list of rectangles to store our snake
for counter in range(1, initial_snake_length+1):
    snake_body.append(snake_head_pos.move(directions[snake_direction]*-counter))
    snake_tiles.append(body_tiles[snake_direction])

    ...

# Shift snake body
snake_body.insert(0, snake_head_pos.copy())
snake_tiles.insert(0, body_tiles[snake_direction]) 
snake_body.pop()
snake_tiles.pop()

    ...

# Copy the last part of the snake to make it longer
for counter in range(5):
    snake_body.append(snake_body[-1].copy())
    snake_tiles.append(snake_tiles[-1])

    ...

# Draw the body with the right tiles
for counter in range(len(snake_body)):
    screen.blit(body_image, snake_body[counter], pygame.Rect(snake_tiles[counter],(step_size,step_size)))

```

**Your turn:** Make the changes to pick better body image tiles and test your game

>**Bonus Challenge:** Find or make an image to use for the snake's food. Load and scale the image and use it in place of the food rectangle.

### Step 40 - Draw the snake corners

**Big Step:** This step is harder than usual - take your time and don't be afraid to get help

Finally we need to add in the corners. To pick the right tiles we need two bits of information - the direction of the snake body and the direction of the snake head. There are 16 combinations (4 body directions x 4 head directions) so we can make a bigger dictionary to store these.

The table below shows what each body segment should look like depending on the two directions. When both directions are the same the segment is straight. When they differ it needs to be a corner:

| | **Head → UP** | **Head → DOWN** | **Head → LEFT** | **Head → RIGHT** |
| --- | :---: | :---: | :---: | :---: |
| **Body was going UP** | │ straight | │ straight | ┐ corner | ┌ corner |
| **Body was going DOWN** | │ straight | │ straight | ┘ corner | └ corner |
| **Body was going LEFT** | └ corner | ┌ corner | ─ straight | ─ straight |
| **Body was going RIGHT** | ┘ corner | ┐ corner | ─ straight | ─ straight |

Each corner shape shows which two sides of the square the snake enters and exits from. For example, ┘ connects the **top** and **left** sides — so if the snake was going down (entering from the top) and then turns left (exiting to the left), ┘ is the right tile to use.

> **Note:** The `body_tiles` dictionary maps these combinations to pixel positions inside the body image file. If the corners look wrong when you run your game, check which tile is at which position in your image and adjust the pixel offsets to match.

```python
# Store combinations of body and head direction to pick the correct body tile
body_tiles = {
    "UP": {
        "UP":(0,0),
        "LEFT": (step_size*2,0),
        "DOWN": (0,0),
        "RIGHT":(step_size,0)
    },
    "LEFT": {
        "UP":(step_size, step_size),
        "LEFT": (0,step_size),
        "DOWN": (step_size,0),
        "RIGHT": (0,step_size)
    },
    "DOWN": {
        "UP":(0,0),
        "LEFT": (step_size*2,step_size),
        "DOWN": (0,0),
        "RIGHT": (step_size,step_size)
    },
    "RIGHT": {
        "UP":(step_size*2,step_size),
        "LEFT": (0,step_size),
        "DOWN": (step_size*2,0),
        "RIGHT": (0,step_size)
    }
}
```

We know what tile to pick at the start as the snake is in a line

```python

    ...

    snake_tiles.append(body_tiles[snake_direction][snake_direction])

    ...

```

As we play the game we can keep a note of the old directions and use that to pick the right tile

```python
# Setup the start position for the game
snake_direction = "RIGHT"
old_direction = snake_direction

    ...

# Save the old direction before we check which keys are pressed
old_direction = snake_direction

    ...

# Use the old and new directions to pick the tile
snake_tiles.insert(0, body_tiles[old_direction][snake_direction]) 

    ...

```

**Your turn:** Find the right places to change your code and check the snake curves around the corners in the right places

>**Bonus challenge:** Find or make an image of the food which has several tiles, e.g. a bug with moving legs. Keep changing the food tiles to make it look like the bug is wriggling!

### Step 41 - Give the snake a tail

This whole step is a kind of **bonus challenge**. You have all the building blocks needed in your code but you will need to work out what to change. Here are some suggestions for how to add the tail.

- Find or make an image for the tail. You could borrow the code from [step 36](#step-36---generate-some-images). You could use an image with four tiles like the head (the tail will always be straight) or eight images (to curve the tail as it goes through the corners)
- Load and prepare the image just like the others
- Show the right tail tile at the end of the snake body.

You might have to change some other things along the way.

- We keep lists of body rectangle and body tiles at the moment. You will also need to keep a list of the old and new direction pairs so that you can look them up when you need to find the right tail tile.
- When eat some food we add one or more parts by copying the last part of the snake. For a short while, before the snake moves on, these news parts fill the same space. That wasn't a problem as they all had the same image. If we add the tail we may have to hide those overlapping parts. You can use the colliderect helper function in pygame and only draw parts of the body that don't collide with the tail.

**Your turn:** Use what you have learnt to add the tail to the snake

## Chapter 10 - Physical effects like bouncing and gravity

We will leave the Snake game behind for a while and explore some features that will be useful in other types of game. Let's look at how to make things bounce and fall which we could use in platform type games.

### Step 42 - Bouncing off the walls

Starting with our simple game template from [step 22](#step-22---our-first-graphics-game). We will start the ball in a random position and get it moving in a random direction. Unlike in the snake game the ball can move diagonally too. When the it hits one of the walls we will flip the direction so that it bounces.

```python
# Import the random library
import random

    ...

# Setup the random start position and direction for the game
size = 20
max_speed = 40
player_pos = pygame.Vector2(
    random.randint(screen.get_width()/4, screen.get_width()/4*3), 
    random.randint(screen.get_height()/4, screen.get_height()/4*3)
)

player_direction = pygame.Vector2(
    random.randint(-max_speed, max_speed), 
    random.randint(-max_speed, max_speed)
)

    ...

# Update the position each time in the game loop
player_pos+=player_direction

# Detect if we've reached a wall and then bounce.
if (player_pos.x < 0 or
   player_pos.x > screen.get_width() or
   player_pos.y < 0 or
   player_pos.y > screen.get_height()):
    player_direction = -player_direction

    ...

# Draw the player
    pygame.draw.circle(screen, "red", player_pos, size)
```

Things to notice:

- The parameters for setting up player_pos and player_direction are very long. The check for hitting the wall is also very long. We can spread these out over several lines and make them easier to read because they are within a pair of brackets.
- We've used our own maths and comparisons instead of the pygame helper functions. With some small changes we could switch to using rectangles and the helper functions. It is good to understand both so you can use either of them when needed.
- You can make your own helper functions and get the best of both. As a **bonus challenge** create a `hit_wall` helper function which takes an x,y pair as a parameter and returns True if the point has hit the wall.

**Your turn:** Setup the simple game template. Find the right places for the new code and see what it does. You will notice there are a few things that aren't quite right. That's ok. We can fix them next.

The direction has two components. One for up-down motion and one for left-right motion. We should only flip one part of the direction depending upon what wall we hit. Also, we are checking the centre of the ball against the sides of the screen. We should consider the size of the ball too. Here is some better detect and bounce code

```python
# Detect if we've reached a wall and then bounce.
if (player_pos.y-size < 0 or
    player_pos.y+size > screen.get_height()):
    player_direction.y = -player_direction.y

if (player_pos.x-size < 0 or
       player_pos.x+size > screen.get_width()):
    player_direction.x = -player_direction.x
```

Things to notice:

- Instead of checking the centre of the ball we've adjusted by the radius of the ball (distance from centre to the edge of the ball)

**Your turn:** Make the changes and check the ball bounces more realistically

### Step 43 - Get down with gravity

Gravity makes things accelerate towards the ground. We can do something similar by making repeated small changes to the ball's direction.

```python
# Gravity level
gravity = 1

    ...

# Gravity effect
player_direction.y+=gravity
```

**Your turn:** Find the right places for this new code and see what happens.

**Bonus challenge:** Gravity physics is quite complicated and our simple code doesn't perfectly create the real effects. Your may see strange behaviour like the ball drifting off the bottom of the screen or the ball bouncing higher and higher over time. You can make things more realistic with some changes.

- If the ball has hit and edge adjust the position to make sure it doesn't move past the edge
- multiply the direction by a small amount like 0.9 as if there is some air resistance. Try other values
- multiply the direction by a small amount like 0.9 on each bounce as if some energy gets lost each time. Try other values
- experiment with applying these effects in different orders, before and after updating the player position.

### Step 44 - Throwing the ball

Our game template still has some code for handling key presses. Try these with your bouncing ball game. We can change this slightly so that we can throw the ball.

**Your turn:** Change you code so that the key presses change the ball direction instead of the ball position.

**Bonus Challenge:** Look at the code for the snake game. Use the code that makes a list for the body and follow the head as it moves. This will create a trail behind the ball.

### Step 45 - Throw with the mouse

pygame has functions for working with the mouse. Let's use these to throw the ball. Each time in our game loop we will remember the position of the mouse. If the player clicks the mouse button we can calculate how far the mouse has moved and use that to throw the ball.

```python
# Variable to remember the mouse position
old_mouse = pygame.Vector2(0,0)

    ...

# If mouse is clicked throw the ball
if pygame.mouse.get_pressed()[0]:
    new_mouse=pygame.Vector2(pygame.mouse.get_pos())
    player_direction = new_mouse - old_mouse

# Remember the new position
old_mouse=pygame.Vector2(pygame.mouse.get_pos())
```

**Your turn:** Add in the new code and test throwing the ball with a mouse click. You can use prints or pygame.font.render to display the mouse position if need to check the values

### Step 46 - Lots of balls

We can use a list to hold the position and direction of lots balls and use loops to update and draw all of them each time. We can even use a loop to throw all of them at the same time!

We can setup the balls like this:

```python
num_of_balls = 5
balls = []

for ball in range(num_of_balls):
    ball_pos = pygame.Vector2(
        random.randint(screen.get_width()/4, screen.get_width()/4*3),
        random.randint(screen.get_height()/4, screen.get_height()/4*3)
    )

    ball_direction = pygame.Vector2(
        random.randint(-max_speed, max_speed),
        random.randint(-max_speed, max_speed)
    )

    balls.append((ball_pos, ball_direction))
```

We can draw the balls like this

```python
for ball_position, ball_direction in balls:
    pygame.draw.circle(screen, "red", ball_position, size)
```

**Important:** In places where we are updating the position and direction we need to be careful. Look at these examples

```python
# Example 1
for ball_position, ball_direction in balls:
    new_position = ball_position+ball_direction
    ball_position = new_position  

# Example 2
for ball_position, ball_direction in balls:
    new_position = ball_position+ball_direction
    ball_position.x, ball_position.y = new_position.x, new_position.y
```

These look like they are just two ways to do the same thing but there is a difference that is hard to spot. Try them and see. In both examples ball_position points to a pygame.Vector2. To start with it points to one of the vectors in the list but in example 1 we change it to point to the new_position vector. The one in the list isn't updated, we just aren't pointing to it any more. In the second example we update the details inside the vector without changing ball_position so we are actually changing the vector in the list, which is what we want. pygame provides an update() function that works like the second example and so do the special *= and += operators.

```python
# Example 3 - works ok in pygame
for ball_position, ball_direction in balls:
    new_position = ball_position+ball_direction
    ball_position.update(new_position)

# Example 4 - works ok in pygame
for ball_position, ball_direction in balls:
    ball_position += ball_direction
```

**Your turn:** Use these clues to change your code to handle more balls. Anywhere that you see player_pos or player_direction in your code is a clue that you may need to wrap in inside a ball loop, just as we did for drawing the balls.

**Bonus challenge:**

- Use a list or some randomness to give the balls different colours
- Once you have wrapped some of your code inside a ball loop you may have some long lines and messy looking code. Move some of the code into helper functions to make things clearer and neater

### Step 47 - Bouncing against the balls

**Big Step:** This step is harder than usual - take your time and don't be afraid to get help

At the moment the balls ignore each other. Let's make them bump and bounce into each other. We will need to check each ball against the others. We can use a loop within a loop like this:

```python
for first_ball in balls:
    for second_ball in balls:
        # If first_ball hits second_ball then bounce them
```

This is almost right but there are a couple of problems:

- first_ball and second_ball could point to the same single ball and we don't want that to bounce off itself
- each ball will be compared to every other ball twice. That is a waste of effort an might mess up the bounce effects.

Here is a different way to manage the loops

```python
for first_index in range(len(balls)-1):
    for second_index in range(first_index+1, len(balls)):
        # If balls[first_index] hits balls[second_index] then bounce them
```

Next we need to find out if the balls touch. The distance from the centre of the ball to its edge is `size`. If the distance between the centre of two balls is less than `size * 2` they must have hit. Draw a diagram to help if this doesn't make sense. pygame provides some functions to help with this: `first_position.distance_to(second_position)`.

Finally we need create a bounce effect. The precise way to do this is complicated. We can create a fake bounce by reflecting the direction of the ball in the direction of the line between the balls. It won't be scientifically correct but it should look ok for a simple game.

**Your turn:** With these clues see if you can use the double loop, check if the two balls have hit and swap their directions if they do. You can play the game with just two balls and add in some prints to check things are working as you expect. If you get stuck you can check the [example](#examples---chapter-10) at the end of the project.

**Bonus challenge:** When the balls hit adjust their positions so they don't overlap inside each other

### Step 48 - Get creative

Think of a game that might use motion like this and have a try a making it. Start with something while this is still new. Here are some ideas you could try.

- Put a ball at one side of the screen and some targets at the other. Let the player set a direction for the ball with the mouse or keys and see if they can hit the targets and score points. You can replace the ball with images of sports balls, stones or energy ball. The targets could have images like a goal, castle or alien space ship. Perhaps the target moves or there are other obstacles that get in the way like crazy golf.
- Have a ball and player piece. Fire the ball randomly and the player tries to catch it or deflect it. Using images can give the game a different feel.
- Use two players and one ball for a simple tennis or squash game.

**Your turn:** Make a simple game using what you have learnt and the examples in this chapter.

## Chapter 11 - Another classic game: Pac-Man

In this chapter we will learn some more game building blocks my making a classic Pac-Man game. You can look online to see some images of what the game looks like and some of the common rules.

### Step 49 - A map of tiles

Once again we can start with simple game template from [step 22](#step-22---our-first-graphics-game)

We can setup a map as a grid of letters and use different letters to represent different things e.g.

- 'w' for a wall
- ' ' for an empty space
- '.' a space with a dot for pacman to eat
- 'o' a space with a power up pellet
- 'x' for the door to the ghosts

We can setup the map in a list of strings:

```python
game_map = [
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",    
    "w............ww............w",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "wow  w.w   w.ww.w   w.w  wow",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "w..........................w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w......ww....ww....ww......w",
    "wwwwww.wwwww.ww.wwwww.wwwwww",
    "     w.wwwww.ww.wwwww.w     ",
    "     w.ww..........ww.w     ",
    "wwwwww.ww.wwwxxwww.ww.wwwwww",
    "      ....w      w....      ",
    "wwwwww.ww.wwwwwwww.ww.wwwwww",
    "     w.ww..........ww.w     ",
    "     w.wwwww.ww.wwwww.w     ",
    "wwwwww.wwwww.ww.wwwww.wwwwww",
    "w......ww....ww....ww......w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w..........................w",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "wow  w.w   w.ww.w   w.w  wow",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "w............ww............w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
]
```

When we draw our game screen we can use the map to draw the right shapes, symbols or images in the right place. Here is part of the code to do this.

```python
for row_num in range(len(game_map)):
    for column_num in range(len(game_map[row_num])):
        topleft = pygame.Vector2(column_num*tile_size, row_num*tile_size)
        match game_map[row_num][column_num]:
            case ' ':
                pygame.draw.rect(
                    screen,
                    "black",
                    pygame.Rect(topleft, (tile_size, tile_size))
                )                
            case 'w':
                pygame.draw.rect(
                    screen,
                    "blue",
                    pygame.Rect(topleft, (tile_size, tile_size))
                )
            case '.':
                grid_rect = pygame.Rect(topleft, (tile_size, tile_size))
                pygame.draw.rect(
                    screen,
                    "black",
                    grid_rect
                )
                pygame.draw.circle(
                    screen,
                    "white",
                    grid_rect.center,
                    tile_size/4
                )

                ...
```

Things to notice:

- pygame screen and images are a list of columns and each one is a list of points. We reference points with (column, row). The game_map is a list of rows and each one is a list of characters so we access it with `[row][column]`. It is easy to mix these up.
- We are using a match case block. Python checks what is on the match line and runs the code in each case block which fits the pattern. We could do the same thing with if-elif-else blocks. It is good to practice with both so that can use either way when you need to. **Note:** match-case blocks were added into Python version 3.10. If you have an older version you will get an error. You can use if-elif-else blocks instead or get a newer version of Python.
- We have case blocks inside a match block inside a pair of for blocks. We've split the pygame.draw parameters across several lines to make it easier to read. It would be better to move some of this code into helper functions.
- We want to draw the dot in the centre of the rectangle so we can use the pygame helper `center` (USA spelling!) to get this.

**Your turn:** Use the simple game template to setup and draw the game_map. Add in the missing symbols to complete the map.

>**Bonus challenge:**
>
>- Calculate the size of the screen you need from the map and use that in the display.set_mode function.
>- Change the player circle to a nice pac-man yellow.
>- Move some of the code inside the loops into helper functions to make the code clearer and neater.

### Step 50 - Move the player on the grid

**Important note:** Keep a copy of your game from Step 50 as we will need it later.

At the moment the player can move anywhere, through wall or off the board completely. One way we can fix this is set our player position using a map position and then convert them into pygame positions. We do something like this to draw the game map. Here are some hints about the code to use.

```python
# Set the player position to a space on the map. Pick a start point in your map that isn't a wall!
player_pos = pygame.Vector2(13,17)

    ...


# Calculate a new position when keys are pressed
        new_pos = player_pos+pygame.Vector2(-1,0) # Move left

# Handle any portals where we reach the edge and jump over to the other side
if new_pos.x < 0:
    new_pos.x = len(game_map[0])-1
if new_pos.x == len(game_map[0]):
    new_pos.x=0
if new_pos.y < 0:
    new_pos.y = len(game_map)-1
if new_pos.y == len(game_map):
    new_pos.y=0

    ...

# Only use the new position if we do not end up in a wall
# pygame.Vector2 can hold numbers with fractions
# game_map indexes must be integers so we use int() to make sure.
if game_map[int(new_pos.y)][int(new_pos.x)]!='w':
    player_pos.update(new_pos)

    ...

# Convert the position and draw the player
player_topleft = player_pos*tile_size
player_centre = player_topleft+pygame.Vector2(tile_size,tile_size)/2
pygame.draw.circle(screen, "yellow", player_centre, tile_size/2)
```

The code is already getting quite messy so it would be a good idea to use some helper functions like this:

```python
def moved_position(x,y):
    return player_pos+pygame.Vector2(x,y)

def left_position():
    return moved_position(-1,0)
```

This can make you main code easier like this:

```python
if keys[pygame.K_LEFT]:
    new_pos = left_position()
```

You can also make similar small helpers to wrap around the edges, check what is in the map and draw the player.

**Your turn:** Use the hints to update the code and test the way the player moves.

### Step 51 - Smooth player moves

The player moves between the wall but it is quite fast and jerky. We can make smaller smoother moves using pygame positions but will have to take care as the players piece could cross over more than one tile on the game map. Let's work through this in some small steps.

Go back to your game from step 50 that you saved earlier. We can set up the player position as a pygame rectangle and use that to draw it.

```python
# Helper function to find the rectangle for a map position.
# You may have made something like this already so you can keep using it instead
def map_tile_rect(map_pos):
    x,y = map_pos
    return pygame.Rect((x*tile_size, y*tile_size), (tile_size,tile_size))

# Setup initial player position. Make sure it is not in a wall!
player_pos = map_tile_rect((13,17))

# function to draw the player
def draw_pacman():
    pygame.draw.circle(screen, "yellow", player_pos.center, tile_size/2)

    ...

# Use the function after drawing the map
    draw_pacman()
```

Next we can start to make a functions that will move the pacman and keep all the complex code in one place.

**Your turn:** Check the player starts in a good place and moves smoothly. You can increase the clock.tick() and reduce the how much we add or subtract on the key presses to get the effect you want. The player will run through the walls but we will fix that later.

### Step 52 - Make things organised and simple

Next we can make some functions to handle moves. Initially these won't do very much but when we add in more checks and calculations we only have to do them in one place.

```python
move_size = 3
directions={
    "UP": (0,-move_size),
    "DOWN": (0, move_size),
    "LEFT": (-move_size,0),
    "RIGHT": (move_size,0)
}

player_direction = "RIGHT"

def can_move(current_pos, direction):
    return True

def move_pacman(dir):
    player_pos.move_ip(directions[dir])
```

You can use these functions when you check which keys are pressed like this:

```python
if keys[pygame.K_LEFT] and can_move(player_pos, "LEFT"):
    player_direction = "LEFT"    
```

And keep moving the player like this:

```python
if can_move(player_pos, player_direction):
    move_pacman(player_direction)
```

**Your turn:** Make these changes and test what happens. The player will keep moving in the direction we want but still go through walls.

### Step 53 - Avoiding the walls

Let's start to add in the wall checks and wrap the player at the edges of the screen. We can update the move_pacman function once and it will work for all the moves we make. We will just use the top left corner of the player to start with. This isn't quite right but it is a good start. We will need to convert from pygame position (dots on the screen) to game map position (tiles on the map). We can do this with integer division.

```python
def pos_map_tile(pos):
    return (pos.x//tile_size, pos.y//tile_size)

def get_map_tile(map_pos):
    x,y=map_pos
    return game_map[y][x]

def wrap_pos_ip(pos):
    if pos.x < 0:
        pos.x+= screen.get_width()
    if pos.x >= screen.get_width():
        pos.x = pos.x-screen.get_width()
    if pos.y < 0:
        pos.y+= screen.get_height()
    if pos.y >= screen.get_height():
        pos.y = pos.y-screen.get_height()

def moved_pos(current_pos, dir):
    new_pos = current_pos.move(directions[dir])
    wrap_pos_ip(new_pos)
    return new_pos

def can_move(current_pos, dir):
    if get_map_tile(pos_map_tile(moved_pos(current_pos, dir)))=='w':
        return False
    else:
        return True

def move_pacman(dir):
    player_pos.update(moved_pos(player_pos, dir))
```

**Your turn:** Find the right places for this code and test the game. The player can still drift a little over the wall but the top left should stay within the playing area. Add in some prints of font.render to see some of the values if you are not sure what is going on inside the functions.

Finally, we can check the four corners of the pacman to make sure they are valid positions.

```python
corners=[
    (0,0),
    (0,tile_size-1),
    (tile_size-1,0),
    (tile_size-1, tile_size-1)
]

def can_move(current_pos, dir):
    new_pos = moved_pos(current_pos, dir)
    for corner_move in corners:
        corner_pos = new_pos.move(corner_move)
        wrap_pos_ip(corner_pos)
        if get_map_tile(pos_map_tile(corner_pos))=='w':
            return False
    return True
```

Things to notice:

- We have used a list to hold the positions of the corners. We can't just use size as that will pick up the neighbouring parts of the map.
- If we find a wall we can return early (break out of the function). If we leave the function early we wont update the player position and we might not check all the corners.

**Your turn:** Make the changes and pacman should smoothly move inside the maze.

>**Bonus challenge:** When the player wraps around the screen it moves smoothly off the right hand side of the screen but pops in and out on the left side. Can you fix this so that when the player is half off the side of the screen the other part of them appears on the other side. **Clue:** Sometime you draw the player twice with different positions!

### Step 54 - Collect the dots

Lets add another feature. When the player passes over one of the small dots they score a point and the dot is removed. We've already covered displaying a scope in [step 27](#step-27---catch-the-target-and-score-points) so you can go back and get a reminder if you need it. We can put all of our dot code in a function and use it in our game loop. We are only going to let the player have the dot if they are perfectly on the right square and not while they are moving between squares. We can use more integer division to check this - the % gives the remainder from integer division. Use print to try some examples if you are not sure what this means.

```python
# Function to update a position in the map
def set_map_tile(map_pos, code):
    x,y=map_pos
    game_row = game_map[y]
    game_map[y] = game_row[:x]+code+game_row[x+1:]

# If the player is on a dot remove the dot and update the score
def check_dots():
    global player_score
    # Check if player is fully on one square.
    if player_pos.x % tile_size == 0 and player_pos.y % tile_size == 0:
        # Check if the player is on a dot
        if get_map_tile(pos_map_tile(player_pos)) == '.':
            # Update score and remove dot
            set_map_tile(pos_map_tile(player_pos), ' ')
            player_score+=1

# Draw score function. Don't forget to setup your score variable and load the font at the start
def draw_score():
    # Use our font to turn some text into an image
    score_image = score_font.render(
        f"Score: {player_score}",
        True,
        "white"
    )
    # Place the image on our screen
    screen.blit(score_image, map_tile_rect((1,1)))
```

Things to notice:

- We have stored our map as a list of strings. When we update the map we need to keep most of the row and just change one character. We can use the special [:] notation to get the parts of the row we want to keep.
- Our check dots function might need to update the player_score so we have used the global statement to tell python we are working with the main player_score and not a local variable that has the same name.
- We have used a template string with the f"" notation to make a score message.

**Your turn:** Add in the new feature and check that it works.

### Step 55 - Win a level

**Big Step:** This step is harder than usual - take your time and don't be afraid to get help

If pacman eats all of the dots we win the round move on to the next level. The steps we need to take are:

- Move the game loop into a function and use it in a game levels loop (that could also be a function in a loop if we let the player play again)
- Build game map from a template so we can restart each level. We will also change the structure slightly to make it easier to use.
- Keep count of the dots so we know when they are all gone
- Keep a count of levels and display these - we'll draw a shape for now but can swap to images that the classic pacman uses later
- End the level when all the dots are gone.

Here are some hints about what changes to make.

We will need to add in some variables for the new things we need like dots, levels and a working copy of the map.

```python
# Variables for the state of the game
playing = True
game_level = 1
dots_remaining = 0
working_map = []
```

We will need to refresh the working copy of the map and get things ready for a new level

```python
# Function to reset the level and build the working map
def reset_working_map():
    global dots_remaining, working_map
    dots_remaining = 0
    working_map = []
    for row in game_map:
        # Convert the string into a list of characters and add it to working_map
        working_map.append(list(row))
        # Check each character in the row and count the dots
        for code in row:
            if code == '.':
                dots_remaining+=1
```

Lots of our code is working with the game_map but this is now our template and not the working copy. In most cases we can swap game_map for working_map but in some places we will need to make other changes e.g. set_map_tile can be simpler now

```python
def set_map_tile(map_pos, code):
    x,y = map_pos
    working_map[y][x]=code
```

We will need to show the player what level they are on. We could write a number with font.render. The original pacman game used images so we can do something similar.

```python
# Draw levels
def draw_levels():
    drawing_row = len(working_map)-2
    drawing_col = len(working_map[drawing_row])-2
    level_rect = map_tile_rect((drawing_col, drawing_row))
    for level in range(game_level):
        pygame.draw.rect(screen, "red", level_rect)
        level_rect.move_ip(-tile_size, 0)
```

As the player moves we can keep track of how may dots are left

```python
# Update dot count when updating the score
def check_dots():
    global player_score, dots_remaining
    # Check if player is fully on one square.
    if player_pos.x % tile_size == 0 and player_pos.y % tile_size == 0:
        # Check if the player is on a dot
        if get_map_tile(pos_map_tile(player_pos)) == '.':
            # Update score and remove dot
            set_map_tile(pos_map_tile(player_pos), ' ')
            player_score+=1
            dots_remaining-=1
```

The level will be over when the dots are all gone

```python
# Finish the level when the dots are gone
if dots_remaining == 0:
    running = False
```

Most of our code will need to be put into a function for playing a level and then used in a level loop

```python
def play_level():
    # Our main game loop code will move in here

    ...

# Main loop for the levels
while playing:
    play_level()
    if dots_remaining == 0:
        # Finished a level 
        game_level+=1
    else:
        # Must have been some other reason for finishing the level so stop
        playing = False

pygame.quit()

```

**Your turn:** Use the hints to add in game levels

### Step 56 - Add in a ghost

Now we can add in the ghosts to hunt the player, although to start with they won't be very clever hunters. We already have lots of the building blocks we need from the code to handle the players.

The components for the ghosts will be:

- a list of rectangles for the positions and a colour - later this can become an image
- when a ghost is on a map tile (moving between tiles) we pick them at random until we find a valid one and take that
- if a ghost touches a player level is over

Here are some hints for the code:

```python
# Variables for the ghost information
ghosts = []

    ...

# Helper function to setup ghosts
def new_ghost(pos, colour, direction):
    return {
        "pos": map_tile_rect(pos),
        "col": colour,
        "dir": direction
    }

    ...

# Setup ghosts whe we reset a level. Carefully pick the start column and row to fit with your game map
def reset_working_map():

    ...

    global ghosts
    ghosts = []
    ghosts.append(new_ghost((13,13), "red", "LEFT"))
    ghosts.append(new_ghost((12,15), "cyan", "RIGHT"))
    ghosts.append(new_ghost((13,15), "pink", "UP"))
    ghosts.append(new_ghost((14,15), "orange", "DOWN"))

    ...


# Function to find a new valid direction for the ghosts
def get_random_direction(ghost):
    # Make a list of directions
    dir_list = list(directions)
    # Mix the list of directions
    random.shuffle(dir_list)
    # Now pick the first valid one
    for dir in dir_list:
        if can_move(ghost["pos"], dir):
            return dir

# Function we can use in our game loop to move the ghosts. Return true if we touch the player
def move_ghosts():
    for ghost in ghosts:
        pos = ghost["pos"]
        dir = ghost["dir"]
        if pos.x % tile_size == 0 and pos.y % tile_size == 0:
            # Fully on a tile so check directions
            dir = get_random_direction(ghost)
        # Keep moving
        if can_move(pos, dir):
            pos.update(moved_pos(pos, dir))
        # Check for player
        if pos.colliderect(player_pos):
            return True
        #save the direction for next time
        ghost["dir"]=dir
    return False

    ...

# Draw the ghosts
def draw_ghosts():
    for ghost in ghosts:
        pygame.draw.rect(screen, ghost["col"], ghost["pos"])

    ...

# Use the functions in the game loop
if move_ghosts():
    running = False

draw_ghosts()
```

**Your turn:** Uses these hints to add randomly moving ghosts into your game

### Step 57 - Better looking pacman and ghosts

We'll make the ghosts a bit smarter later. First lets get rid of the boring shapes and use better images. We have already seen how to use images in the [Snake game](#chapter-9---a-more-realistic-snake) and change the image based on direction. We will go further this time and use multiple images to animate our characters.

First we need to find or make some images. You can use the program in the [examples](#part-1---pacman-image-generator) to create a basic image file. The single file has 6 sets of images. 1 for pacman and 5 for ghosts. Each set has four rows for the four directions and each row has four variants to show in sequence to animate the characters.

Look back at [chapter 9](#step-38---get-the-head--moving-in-the-right-direction) to see how we can pick out an image from a set and draw it instead of a plain rectangle. Use those steps as a guide.

**Your turn:**

- Load and scale the image so that the images tiles are the right size for your game.
- Work out the position for the top-left image for each set and use this to draw that image instead of the rectangles. If you use the example image generator the first pacman image will be at (0,0). The red ghost will be at (0, 8*tile_size). You may need to experiment a little to find the right positions to use. The characters won't point in the correct direction yet but this is a good first building block.
- Add a dictionary of directions and offsets so you can pick out the row in the set that is looking in the right direction and draw that. If you use the example image generator the offset for RIGHT will be (0,0), the offset for UP will be (0,tile_size). Now the player and ghosts will point in the correct direction but won't have any animated effects like pacman eating.
- Finally use a variable to count each time you go through the game loop and use that to work along the image rows to create an animation (e.g. pacman will open and close his mouth). **Hint:** `loop_count % 4` will create a repeating pattern of 0,1,2,3 which you can use to pick out one of the four animated images in each row. **Hint:** If the animation effect is too fast you can use integer division for a slower effect e.g. `(loop_count // 10) % 4`
- Put some of these steps into functions to make them easier to use e.g. `def calc_image_rect(first_image_offset, direction, animation_step):`
- If you get stuck you can use prints, font.render or blit so show what is going on inside the code. You can also get ideas from the [example](#examples---chapter-11).

### Step 58 - Smarter ghosts

Now let's make the ghost moves a bit smarter.

The first thing we can improve is to stop the ghosts hovering over the same spot. There are many things we could do but here is a simple one to try first. If the ghosts current direction is clear we can remove the opposite direction before shuffling.

```python
# dictionary of opposite directions
opposite_dir = {
    "UP": "DOWN",
    "DOWN": "UP",
    "LEFT": "RIGHT",
    "RIGHT": "LEFT"
}

def get_random_direction(ghost):
    # Make a list of directions
    dir_list = list(directions)

    # Remove opposite direction if the current direction is clear
    if can_move(ghost["pos"], ghost["dir"]):
        dir_list.remove(opposite_dir[ghost["dir"]])

    # Mix the list of directions
    random.shuffle(dir_list)

    # Now pick the first valid one
    for dir in dir_list:
        if can_move(ghost["pos"], dir):
            return dir
```

**Your turn:** Try these changes and check that the ghost movements are better

We can make the ghosts even smarter by getting them to aim at the player. We can do that by calculating a score for each direction and picking the one with best score. The score could be the vertical distance + horizontal distance to the player. The smaller the distance the better. Here are some hints for this sort of code.

```python
def rect_distance(rect1, rect2):
    return abs(rect1.x - rect2.x)+abs(rect1.y - rect2.y)

def dir_sort_key(item):
    dir, score = item
    return score

    dir_list = list(directions)
    
    # Remove opposite direction if the current direction is clear
    if can_move(ghost["pos"], ghost["dir"], ghost["speed"]):
        dir_list.remove(opposite_dir[ghost["dir"]])
    
    # Get a list of valid directions with their distance scores
    dist_list = []
    for dir in dir_list:


def get_shortest_direction(ghost):
    dir_list = list(directions)
    
    # Remove opposite direction if the current direction is clear
    if can_move(ghost["pos"], ghost["dir"], ghost["speed"]):
        dir_list.remove(opposite_dir[ghost["dir"]])
    
    # Get a list of valid directions with their distance scores
    dist_list = []
    for dir in dir_list:
        if can_move(ghost["pos"], dir):
            dist_list.append((dir, rect_distance(player_pos, moved_pos(ghost["pos"], dir))))

    # Sort by distance
    dist_list.sort(key=dir_sort_key)

    # Return the shorted direction
    dir,_ = dist_list[0]
    return dir
```

Things to notice:

- We've used the abs() function. This is short for absolute and makes sure the distance is a positive value.

**Your turn:** Make the changes and test your smarter ghosts. Are they too smart and spoil the game?

**Bonus challenge:** Try out some adjustments to make the game challenging but not too hard to win. Here are some ideas:

- Give some or all of the ghosts a smaller move_size so the player has more chance to escape. Perhaps the ghosts can get faster at higher levels
- Use different functions for the ghosts e.g. some use the random one, some use the shortest distance or maybe a mixture. Perhaps you can use the game_level to make the ghosts start dumb and get smarter at higher levels.
- Use the loop_counter or pygame.time functions to delay when the ghosts can move out of their start area. Maybe the smart ghosts wait longer than the random ones. Perhaps the delay is shorter for higher levels.

### Step 59 - Lives, power-ups and game states

This step is like a big **bonus challenge**. Add more features to your game by re-using the building blocks that you already have. Here are some suggestions but you can invent your own.

- Give the player 3 lives. When a ghost catches them they lose a life but can restart the level.
- Find or make images to use to indicate the level and number of lives
- Start with an instructions screen and end with a game-over screen.
- Use different maps for different levels
- Find or make images to draw more interesting maps e.g. curved corners.
- Add in the power pellets. When the player eats one of the four power pellets they get a power boost for a short time which means they can eat ghosts. Perhaps there are bonus points for the pellet and for eating a ghost. The ghosts can change image (e.g. use the blue image from the example images) and run away from the player (make a longest_distance function). Display a count down or warning when the power boost is out of time. Perhaps the power boost is shorter or random at higher levels.
- Add more images for smoother animation e.g. sequence of 8 images for pacmans mouth

## Chapter 12 - Mazes, rules and problem solving

In previous chapters we have made maps and mazes, used simple game rules and solved problems such as getting the ghosts to chase or escape from the pacman player. In this chapter we will add in more advanced examples such as:

- automatically generating mazes
- move complex rules that you might find in board games or card games
- automatic problem solving such as escaping from a maze or playing a board game against the player.

### Step 60 - A plan for a game with mazes

Let's start with the simple game template back from [step 22](#step-22-our-first-graphics-game) and use a grid of tiles for our maze. We'll keep things simple by drawing shapes but later we can swap these for the images that reflect the game e.g. stone for the wall of a dungeon adventure or trees and shrubs for a wilderness or jungle.

**Your turn:** We haven't given you any hints yet or example code so try to use what you have learnt from the other chapters. Make a list of small steps you could take such as:

- What information do you need to have?
- Is this simple information like a score or more complex like a map?
- What helper functions would be useful?
- What job does the helper function need to do?
- What information would you pass into the functions with parameters and what would come back with a return?
- What are the main steps that happen before the game loop?
- What are the main steps that need to happen inside the game loop?

You can put this list into the game template as comments like this:

```python
# Variables needed
# ----------------
# size of the tiles in the maze
# width and height of the maze e.g. how many tiles across and how many tiles down

# Helper functions
# ----------------
# use the map of the maze to draw a grid on screen with gaps if there is a path between the tiles
```

**Bonus challenge:** Keep going and start to put in the code that you need. If you need more help you can look at the next steps but, remember, there are many different ways to code this maze game. The next steps are just examples and they are not better or more correct than the code you make for yourself.

### Step 61 - Building blocks for a game with mazes

You can skip this step if you have already have your own working code from step 60.

Here are some examples you could use for the variables we need. It's ok if your own variables have different names or a structure. For example, you could hold the map size as a pair of values `(10,10)` or as a pygame.Vector2.

```python
tile_size = 60
wall_thickness = 5
door_width = 40
maze_width = 10
maze_height = 10
maze_map = []
wall_colour = "grey"
floor_colour = "white"
player_colour = "red"
player_pos = pygame.Vector2(0,0)

directions = {
    "UP": pygame.Vector2(0,-1),
    "DOWN": pygame.Vector2(0,1),
    "LEFT": pygame.Vector2(-1,0),
    "RIGHT": pygame.Vector2(1,0),
}

opposites = {
    "DOWN": "UP",
    "UP": "DOWN",
    "LEFT": "RIGHT",
    "RIGHT": "LEFT"
}
```

Here are some helper functions. It's ok if you have made different helper functions with different names and parameters.

```python
def maze_tile_rect(x,y):
    return pygame.Rect((x*tile_size, y*tile_size), (tile_size, tile_size))

def tile_floor_rect(x,y):
    return pygame.Rect((
        x*tile_size+wall_thickness,
        y*tile_size+wall_thickness
    ), (
        tile_size-2*wall_thickness,
        tile_size-2*wall_thickness
    ))

def tile_door_rect(x,y,dir):
    tile_rect = maze_tile_rect(x,y)
    door_edge = (tile_size-door_width)//2
    match dir:
        case "UP":
            tile_rect.width=door_width
            tile_rect.height=wall_thickness
            return tile_rect.move((door_edge,0))
        case "DOWN":
            tile_rect.width=door_width
            tile_rect.height=wall_thickness
            return tile_rect.move((door_edge,tile_size-wall_thickness))
        case "LEFT":
            tile_rect.width=wall_thickness
            tile_rect.height=door_width
            return tile_rect.move((0,door_edge))
        case "RIGHT":
            tile_rect.width=wall_thickness
            tile_rect.height=door_width
            return tile_rect.move((tile_size-wall_thickness,door_edge))

def make_initial_map():
    # Make a list of columns
    # Each column has a row of tiles
    # Each tile shows if there is a door (True or False) in each direction
    for column in range(maze_width):
        row_list = []
        for row in range(maze_height):
            tile_details={}
            for dir in directions:
                tile_details[dir]=False
            row_list.append(tile_details)
        maze_map.append(row_list)

def inside_maze(x,y):
    if x<0 or y<0:
        return False
    if x>=maze_width or y>=maze_height:
        return False
    return True

def can_move(x,y,dir):
    return maze_map[x][y][dir]

def make_door(x,y,dir):
    next_x, next_y = directions[dir]
    # Set the door for the tile to True
    maze_map[int(x)][int(y)][dir]=True
    # If the other side is in the maze also set that to True
    if inside_maze(x+next_x, y+next_y):
        maze_map[int(x+next_x)][int(y+next_y)][opposites[dir]]=True

def draw_maze():
    for column in range(maze_width):
        for row in range(maze_height):
            pygame.draw.rect(screen, wall_colour, maze_tile_rect(column, row))
            pygame.draw.rect(screen, floor_colour, tile_floor_rect(column, row))
            for dir in directions:
                if maze_map[column][row][dir]:
                    pygame.draw.rect(screen, floor_colour, tile_door_rect(column, row, dir))

def draw_player():
    x,y=player_pos
    player_tile = maze_tile_rect(x,y)
    pygame.draw.circle(screen, player_colour, player_tile.center, tile_size/3)
```

**Your turn:** If you need to, add these variables and functions into your simple game template and use them to create a maze, draw it and let the player move around. Use make_door() a few times, otherwise the player will be stuck on one tile with nowhere to go!

### Step 62 - First attempt at a random maze

We can make a maze by randomly picking tiles and directions and making doors. Try the hints below and see what the maze is like to explore

```python
import random

    ...

number_of_doors = 50

    ...

def design_maze():
    for door in range(number_of_doors):
        dir_list = list(directions)
        make_door(random.randrange(maze_width), random.randrange(maze_height), dir_list[random.randrange(4)])
```

**Your turn:** Experiment with the random maze. Try different numbers of doors to see what happens.

### Step 63 - Better maze maker

Our first attempt made some interesting patterns but sometime the player will be stuck in a dead end and lots of the tiles are cut-off and can't be reached from the players position. Let's try something else. Instead of picking the tiles at random we'll start at the players positions and follow through the random doors to the next tile. We can keep note of which tiles we visit so that we don't go back into the same tile twice.

```python
def make_tile_tracker():
    tiles=[]
    for col in range(maze_width):
        col=[]
        for row in range(maze_width):
            col.append(False)
        tiles.append(col)
    return tiles

def explore_tile(pos,tracker):
    tracker[int(pos.x)][int(pos.y)]=True
    dir_list = list(directions)
    random.shuffle(dir_list)
    for dir in dir_list:
        next_pos = pos+directions[dir]
        # Only visit the next tile if it is inside the maze
        if inside_maze(next_pos.x, next_pos.y):
            # Only visit if we haven't already been there
            if not tracker[int(next_pos.x)][int(next_pos.y)]:
                # Make a door and explore further
                make_door(pos.x, pos.y, dir)
                explore_tile(next_pos, tracker)

def design_maze():
    tiles_visited=make_tile_tracker()
    start_pos=pygame.Vector2(0,0)
    explore_tile(start_pos, tiles_visited)
```

**Your turn:** Add in these updates and see what the maze looks like now

Things to notice:

- design_maze doesn't do very much work. It just sets up the start position and then lets explore_tile do all the work.
- Inside explore_tile we use explore_tile again. A function which uses itself. like this, is called recursive. This can be a very powerful technique but it can be quite hard to understand. To help see what is going on we can create a helper function and use it inside the dir loop in explore tile

```python

def animate_designer(pos):
    for event in pygame.event.get():
        pass
    draw_maze()
    pygame.draw.circle(screen, "white", maze_tile_rect(pos.x, pos.y).center, tile_size/4)
    pygame.display.flip()
    clock.tick(60) 

    ...

    random.shuffle(dir_list)
    for dir in dir_list:
        animate_designer(pos)
        next_pos = pos+directions[dir]
        # Only visit the next tile if it is inside the maze
```

- With the helper function you can see how each time we use explore_tile we are looking at a new part of the maze and, as we run out of valid moves, it back-tracks to the first tile and the first time we use explore_tile.

**Your turn:**

- Add in the helper function and see how the maze is built up
- Add in some prints or use font.render to count how many times explore_tile is used and how many tiles we visit.
- Is every tile covered?
- Change the start_pos in design_maze(). Does it make much difference?
- See what happens if you remove the `random.shuffle(dir_list)`. Can you explain what is going on?
- Put back random.shuffle but now use `random.seed(10)` at the beginning of your program. What do you notice? Try different random seeds and go back to 10 again. Can you see you can have some control over the randomness if you needed it.

### Step 64 - A maze solver

With some small changes we can turn our maze designer into a maze solver. First we will make a random solver and then use recursion to make something smarter.

The first step is to use something called a generator to automatically make moves for our player. A generator is a special type of function. Normal functions just produce one result. Generators produce a list of results. Here is a simple random move generator

```python
# A function with a yield statement defines a generator
def move_generator():
    dir_list = list(directions)
    while True:
        yield dir_list[random.randrange(4)]

# We actually get a generator we can use by calling the function
player_move = move_generator()

# We can also get the next move when we want
dir = next(player_move)
```

**Your turn:** Setup the move generator before the game loop and then use next() to get the moves inside the game loop. Check that the move is valid before moving the player.

Our random solver doesn't get very far as it moves back in the maze as often as it moves forward. Let's use something smarter as we did for making the maze.

```python
def explorer_generator(pos, tracker):
    tracker[int(pos.x)][int(pos.y)]=True
    dir_list = list(directions)
    random.shuffle(dir_list)
    for dir in dir_list:
        # Only visit the next tile if there is a door
        if can_move(dir):
            next_pos = pos+directions[dir]
            # Only visit if we haven't already been there
            if not tracker[int(next_pos.x)][int(next_pos.y)]:
                # move and explore further
                yield dir
                yield from explorer_generator(next_pos, tracker)
                yield opposites[dir]    

def move_generator():
    tiles_visited=make_tile_tracker()
    start_pos=pygame.Vector2(0,0)
    yield from explorer_generator(start_pos, tiles_visited)
```

Things to notice:

- The code looks very similar to our maze designer functions
- Like design_maze, move_generator doesn't do much work. It sets things up and uses `yield from` to let the explorer do everything
- The new explorer doesn't make doors now but checks if a door way is open before exploring further.
- If there is a doorway there are three yields. The first moves through the door, the next one explores further and finally we move back through the door

**Your turn:** Update your game with the smarter generator and see what

**Bonus challenge:** You may notice that the player explores the whole map, gets back to the beginning and then produces an error. We haven't given the player any way to win. Change the game so that far corner of the maze from where the player starts is the exit. Check if the player has reached the exit and leave the game.

### Step 65 - Have fun with mazes and solvers

What games could you make with these building blocks? Here are some ideas that you can try out

- Replace the rectangles and circles with some images to create games with different themes such as a rabbit warren, a haunted mansion, space station or magical forest.
- Use small, smooth moves as we did in the pacman game.
- Add some random doors to create short-cuts and loops in the maze.
- Place treasure or other items to collect in the map as you did for our text adventure game. Maybe you can only exit the maze if you have the right key, tool or spell
- Add some more codes to the maze_map. Instead of just having True or False for open doorways and wall you could have letter or number codes for different things e.g. closed doors, secret doors or completely open walls to make larger rooms or chambers that cover several tiles
- Add opponents that start at the far side of the maze and use move generators to let them search the maze or hunt for the player. Perhaps the player has to race the computer opponents to get the prize in the centre of the maze and escape.
- Maybe the opponents can sense the direction of the player or player leaves foot prints or scent in the maze which the opponents can track. **Hint:** Instead of shuffling the list of directions they could be sorted as we did for the ghosts in the pacman game.
- Perhaps the maze has floors with stairways between them. **Hint:** You may need a list of maze_maps and add `UPSTAIRS` and `DOWNSTAIRS` as possible directions.

## Examples - Chapter 1

```python
# Make a quiz list
quiz = [
    ("What is Batman's favourite colour", "black"),
    ("What is Barbie's favourite colour", "pink")
]

# A function to ask a question and give points
def quiz_question( question, correct_answer):
    player_answer=input(question + "? > ")
    if player_answer==correct_answer:
        print("Well done!")
        return 1
    else:
        print("Wrong!")
        return 0

# Start with no points
total_score=0
# Ask the questions using a loop:
for (question, answer) in quiz:
    total_score+=quiz_question(question, answer)

# Only use the word points if there is more than one
message = "points"
if total_score==1:
    message = "point"
print("You got", total_score, message)
```

## Examples - Chapter 2

```python
# Make a quiz list
quiz = [
    ("What is Batman's favourite colour", "black"),
    ("What is Barbie's favourite colour", "pink")
]

# A function to ask a question and give points
def quiz_question( question, correct_answer):
    player_answer=input(question + "? > ")
    if player_answer=="leave":
        print("OK. Come back and play another time.")
        return (0,"leave")
    elif player_answer=="pass":
        print("OK. Skip this question")
        return (0, "pass")
    elif player_answer==correct_answer:
        print("Well done!")
        return (1, "answer")
    else:
        print("Wrong! You lose a point")
        return (-1, "answer")

# Start with no points
total_score=0

# Ask the questions using a loop:
for (question, answer) in quiz:
    (points, instruction)=quiz_question(question, answer)
    total_score+=points
    # Finish early if the player users the leave instruction
    if instruction=="leave":
        break

# Only use the word points if there is more than one
message = "points"
if total_score==1:
    message = "point"
print("You got", total_score, message)
```

## Examples - Chapter 3

```python
# Make a quiz list
quiz = [
    ("What is Batman's favourite colour", "black"),
    ("What is Barbie's favourite colour", "pink")
]

# Start with an empty scoreboard list
scoreboard = []

# A function to ask a question and give points
def quiz_question( question, correct_answer):
    player_answer=input(question + "? > ")
    if player_answer=="leave":
        print("OK. Come back and play another time.")
        return (0,"leave")
    elif player_answer=="pass":
        print("OK. Skip this question")
        return (0, "pass")
    elif player_answer==correct_answer:
        print("Well done!")
        return (1, "answer")
    else:
        print("Wrong! You lose a point")
        return (-1, "answer")

# Show the scoreboard
def scoreboard_sort_key(sb):
    (gamer_tag, score) = sb
    return score

def show_scoreboard():
    if len(scoreboard) > 0:
        print("Top Scores")
        position = 1
        scoreboard.sort(reverse=True, key=scoreboard_sort_key)
        for (gamer_tag, score) in scoreboard:
            print (position, ":",gamer_tag,"=",score)
            position+=1
            if position > 10:
                break
    else:
        print("No top score yet")

def add_new_score(gamer_tag, score):
    global scoreboard
    scoreboard.append((gamer_tag, score))

def quiz_round():
    # Start with no points
    total_score=0

    # Ask the questions using a loop:
    for (question, answer) in quiz:
        (points, instruction)=quiz_question(question, answer)
        total_score+=points
        # Finish early if the player users the leave instruction
        if instruction=="leave":
            break

    # Only use the word points if there is more than one
    message = "points"
    if total_score==1:
        message = "point"
    print("You got", total_score, message)
    return total_score

keep_playing=True
while keep_playing:
    print("Welcome to the amazing quiz game!")
    show_scoreboard()
    gamer_tag = input("Type in your gamer tag > ")
    print("OK,", gamer_tag, "let's play.")
    player_score=quiz_round()
    add_new_score(gamer_tag, player_score)
    show_scoreboard()
    if input("Is there another player? > ")=="no":
        keep_playing=False
```

## Examples - Chapter 4

```python
import csv

# Make a quiz list
quiz = [
    ("What is Batman's favourite colour", "black"),
    ("What is Barbie's favourite colour", "pink")
]

# Start with an empty scoreboard list
scoreboard = []

def load_scoreboard():
    global scoreboard
    try:
        with open("quiz-scores.csv", "r") as file:
            scoreboard=[]
            reader=csv.reader(file)
            for (gamer_tag, score) in reader:
                scoreboard.append((gamer_tag, int(score)))
    except FileNotFoundError:
        # No scoreboard file so start a new board
        scoreboard=[]  

def save_scoreboard():
    with open("quiz-scores.csv", "w", newline="") as file:
        writer=csv.writer(file)
        writer.writerows(scoreboard)

# A function to ask a question and give points
def quiz_question( question, correct_answer):
    player_answer=input(question + "? > ")
    if player_answer=="leave":
        print("OK. Come back and play another time.")
        return (0,"leave")
    elif player_answer=="pass":
        print("OK. Skip this question")
        return (0, "pass")
    elif player_answer==correct_answer:
        print("Well done!")
        return (1, "answer")
    else:
        print("Wrong! You lose a point")
        return (-1, "answer")

# Show the scoreboard
def scoreboard_sort_key(sb):
    (gamer_tag, score) = sb
    return score

def show_scoreboard():
    if len(scoreboard) > 0:
        print("Top Scores")
        position = 1
        scoreboard.sort(reverse=True, key=scoreboard_sort_key)
        for (gamer_tag, score) in scoreboard:
            print (position, ":",gamer_tag,"=",score)
            position+=1
            if position > 10:
                break
    else:
        print("No top score yet")

def add_new_score(gamer_tag, score):
    scoreboard.append((gamer_tag, score))

def quiz_round():
    # Start with no points
    total_score=0

    # Ask the questions using a loop:
    for (question, answer) in quiz:
        (points, instruction)=quiz_question(question, answer)
        total_score+=points
        # Finish early if the player users the leave instruction
        if instruction=="leave":
            break

    # Only use the word points if there is more than one
    message = "points"
    if total_score==1:
        message = "point"
    print("You got", total_score, message)
    return total_score

keep_playing=True
load_scoreboard()
while keep_playing:
    print("Welcome to the amazing quiz game!")
    show_scoreboard()
    gamer_tag = input("Type in your gamer tag > ")
    print("OK,", gamer_tag, "let's play.")
    player_score=quiz_round()
    add_new_score(gamer_tag, player_score)
    show_scoreboard()
    if input("Is there another player? > ")=="no":
        keep_playing=False
        save_scoreboard()

```

## Examples - Chapter 5

```python
game_world = {
    # There is a magic sword in the wilderness. If you have the sword it changes what happens in the castle.
    "wilderness": {
        "title": "Wilderness",
        "description": "You stand alone in the barren wilderness. There is a castle in the distance",
        "item": "magic sword", # Give the player an extra action to collect the item
        "actions":[
            ("Return home", "end"),
            ("Enter the castle", "castle")
        ]
    },
    "castle": {
        "title": "Castle",
        "description": "You enter the castle and are confronted by the evil dragon!",
        "actions": [ # Use these actions if the player doesn't have the special item
            ("Fight the dragon", "killed"),
            ("Run away", "wilderness")
        ],
        "magic sword": [ # If the player has the magic sword use these actions instead
            ("Fight the dragon", "win"),
            ("Run away", "wilderness")
        ]
    },
    "end" : {  # If there are no available actions we know the game has reached the end
        "title": "The End",
        "description": "You return to your village"
    },
    "killed" : {
        "title": "The End", 
        "description": "Without your own magic you are no match for the dragon!",
    },
    "win": {  # New ending that requires the magic sword
        "title": "A New Hero",
        "description": "The dragon is powerful but with the magic sword you win the battle and save your village!",
    }
}

def get_choice(max_choice):
    while True:
        response=input("Type the action number> ")
        if response.isdigit():
            choice = int(response)
            if choice <= max_choice:
                return choice
        print("Enter a number between 0 and", max_choice)

# Set the player position to the beginning of adventure
player_position = "wilderness"
player_items=[]

# Game status
keep_playing = True

# Game loop
while keep_playing:
    place=game_world[player_position]
    title=place["title"]
    description=place["description"]
    print(title)
    print("~~~~~~~~~~~~~~~~~~")
    print(description)
    print()
    if "actions" in place:
        actions = place["actions"]
        for (carried_item, location) in player_items:
            if carried_item in place:
                # There are special actions for one of the items we have. Let's use them instead.
                actions=place[carried_item]
                break
        print("What do you want to do next?")
        # Loop through the available actions.
        # action_number will count up from 0 and stop depending on the number of available actions in the list.
        for action_number in range(len(actions)):
            # actions is our list of available actions.
            # actions[action_number] picks out one action
            # actions[action_number][0] picks out the first part of the pair which will be the action description
            print(action_number, ":", actions[action_number][0])
        max_action = len(actions)-1
        if "item" in place:
            print(len(actions), ": Pick up the", place["item"])
            max_action = len(actions)
        # Convert the player input into a number. The text "1" becomes the number 1
        choice = get_choice(max_action)
        print()
        # actions[choice] picks out the chosen action
        # actions[choice][1] picks out the second part of the pair which will be the destination for the player
        # This code includes the bonus challenge.
        # The position of the item is saved so that they can be reset before the next game
        if choice==len(actions):
            player_items.append((place["item"],player_position))
            del place["item"]
        else:
            player_position = actions[choice][1]
    else:
        # No actions so this must be the end of the game
        if input("Play again? > ")=="no":
            # Leave the game
            keep_playing=False
        else:
            # Go back to the start position
            for (item, location) in player_items:
                game_world[location]["item"]=item
            player_position="wilderness"
print("Game over. Good luck!")
```

## Examples - Chapter 6

```python
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

# Setup the start position for the game
player_pos = pygame.Vector2(screen.get_width()/2, screen.get_height()/2)

# Set the shape and colour at the start
shape="circle"
colour="red"

# Load a background and player image to use
background_image=pygame.image.load("background.jpg")
player_image=pygame.image.load("player.jpg")

# Optional - resize the player image
player_image=pygame.transform.scale(pygame.image.load("player.jpg"), (160,80))

# Optional - remove and unwanted background colour from the image
player_image.set_colorkey("white")

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Jump to the mouse position while the mouse button is pressed
    if pygame.mouse.get_pressed()[0]:
        player_pos=pygame.Vector2(pygame.mouse.get_pos())
        
    # Handle any user input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        player_pos.y -= 40
    if keys[pygame.K_DOWN]:
        player_pos.y += 40
    if keys[pygame.K_LEFT]:
        player_pos.x -= 40
    if keys[pygame.K_RIGHT]:
        player_pos.x += 40
        
    # q or ESC quits the game
    if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
        running=False
        
    # c switches the circle colour
    if keys[pygame.K_c]:
        if colour=="red":
            colour="blue"
        else:
            colour="red"
            
    # s switches the shape
    if keys[pygame.K_s]:
        if shape=="circle":
            shape="image"
        else:
            shape="circle"

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    # Draw your game screen
    screen.blit(background_image, (0,0))

    # Check the shape variable and draw the correct player
    if shape == "circle":
        pygame.draw.circle(screen, colour, player_pos, 40)
    else:
        screen.blit(player_image, player_pos-(40,40), pygame.Rect((0,0),(80,80)))

    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```

## Examples - Chapter 7

```python
import pygame
import random

# Game settings
icon_size = 80
default_screen = (1280, 720)
target_speed = 20
hazard_speed = 40

# pygame setup
pygame.init()
screen = pygame.display.set_mode(default_screen)
clock = pygame.time.Clock()
running = True

def reset_target():
    return pygame.Rect(
        (screen.get_width(),random.randint(0,screen.get_height() - icon_size)),
        (icon_size, icon_size)
    )
# Setup the start position for the game
player_pos = pygame.Rect((icon_size, screen.get_height() / 2), (icon_size, icon_size))
target_pos = reset_target()
hazard_pos = reset_target()

score_font = pygame.font.SysFont(None, 48)
player_score = 0

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
    # Handle any user input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        player_pos.y -= 40
    if keys[pygame.K_DOWN]:
        player_pos.y += 40
    if keys[pygame.K_LEFT]:
        pass # ignore left
    if keys[pygame.K_RIGHT]:
        pass # ignore right
    
    player_pos.clamp_ip(screen.get_rect())
    # q or ESC quits the game
    if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
        running=False
    
    hazard_pos.move_ip((-hazard_speed,0))
    if hazard_pos.right < 0:
        hazard_pos = reset_target()
    if hazard_pos.colliderect(player_pos):
        running = False

    target_pos.move_ip((-target_speed,0))
    if target_pos.x < 0:
        target_pos = reset_target()
    if target_pos.colliderect(player_pos):
        player_score+=1
        target_pos = reset_target()
    
    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    pygame.draw.rect(screen, "yellow", target_pos)
    pygame.draw.rect(screen, "red", hazard_pos)
    pygame.draw.rect(screen, "white", player_pos)
    score_message = "Score: "+str(player_score)
    score_image=score_font.render(score_message, True, "black")
    screen.blit(score_image, (10,0))

    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

over_image = score_font.render("GAME OVER", True, "black")
screen.blit(
    over_image,
    ((screen.get_width()-over_image.get_rect().width)/2,
    (screen.get_height()-over_image.get_rect().height)/2)
)
pygame.display.flip()
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
             running = False
             
    keys = pygame.key.get_pressed()
    if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
        running = False
pygame.quit()
```

## Examples - Chapter 8

```python
import pygame
import random

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

step_size = 20

directions={
    "UP": pygame.Vector2(0,-step_size),
    "DOWN": pygame.Vector2(0, step_size),
    "LEFT": pygame.Vector2(-step_size,0),
    "RIGHT": pygame.Vector2(step_size,0)
}
    
# Setup the start position for the game
snake_direction = "RIGHT"

# Set the initial size of the snake and the position of its head
initial_snake_length = 5
snake_head_pos = pygame.Rect((screen.get_width()/2, screen.get_height()/2), (step_size, step_size))

# List to hold the snake
snake_body = []

# Build a list of rectangles to store our snake
for counter in range(1,initial_snake_length+1):
    snake_body.append(snake_head_pos.move(directions[snake_direction]*-counter))
    
def find_food_pos():
    try_pos = pygame.Rect((0,0),(step_size, step_size))
    while True:
        try_pos.topleft = (
            random.randint(0, screen.get_width()-step_size),
            random.randint(0, screen.get_height()-step_size)
        )
        if try_pos.collidelist(snake_body) == -1:
            return try_pos

food_pos = find_food_pos()

score_font = pygame.font.SysFont(None, 48)
player_score = 0

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Handle any user input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        snake_direction = "UP"
    if keys[pygame.K_DOWN]:
        snake_direction = "DOWN"
    if keys[pygame.K_LEFT]:
        snake_direction = "LEFT"
    if keys[pygame.K_RIGHT]:
        snake_direction = "RIGHT"

    # Perform other work such as game effects or non-player characters
        
    # Shift snake body
    snake_body.insert(0, snake_head_pos.copy())
    snake_body.pop()
    
    snake_head_pos.move_ip(directions[snake_direction])
    
    # detect crash with your own body
    if snake_head_pos.collidelist(snake_body) == -1:
        pass
    else:
        running = False
    
    # detect crash with the edge of the screen
    if screen.get_rect().contains(snake_head_pos):
        pass
    else:
        running = False

    if snake_head_pos.colliderect(food_pos):
        player_score+=1
        # Copy the last part of the snake to make it longer
        for counter in range(5):
            snake_body.append(snake_body[-1].copy())
        food_pos = find_food_pos()

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    # Draw your game screen
    for body_part_rect in snake_body:
        pygame.draw.rect(screen, "grey", body_part_rect)
    pygame.draw.rect(screen, "white", snake_head_pos)
    pygame.draw.rect(screen, "green", food_pos)
    
    score_message = "Score: "+str(player_score)
    score_image=score_font.render(score_message, True, "black")
    screen.blit(score_image, (10,0))


    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```

## Examples - Chapter 9

### Part 1 - A snake image generator

```python
import pygame
from math import pi

# Initialize pygame
pygame.init()

# Set the height and width of the screen
tile_size=200
screen_size = [tile_size*4, tile_size*3]
screen = pygame.display.set_mode(screen_size)

pygame.display.set_caption("Snake game image maker")

# Loop until the user clicks the close button.
done = False
clock = pygame.time.Clock()

def make_head_images(size):
    img = pygame.Surface((size,size))
    img.fill("white")
    pygame.draw.ellipse(img, "green", [size/4,size/4,size/2,size/2*3])
    pygame.draw.polygon(img, "yellow", [[size*(.5-.05),size],[size/2,size/2],[size*(.5+.05),size]])
    pygame.draw.ellipse(img, "red", [size/20*6,size/2,size/20*3,size/20*6])
    pygame.draw.ellipse(img, "red", [size/20*11,size/2,size/20*3,size/20*6])
    pygame.draw.arc(img, "black", [0,0,size/2,size/2], 0, pi/2, int(size/20))
    pygame.draw.arc(img, "black", [size/2,0,size/2,size/2], pi/2, pi, int(size/20))
    imgs = pygame.Surface((size*4,size))
    imgs.blit(img,[0,0])
    imgs.blit(pygame.transform.rotate(img, 90), [size,0])
    imgs.blit(pygame.transform.rotate(img, 180), [size*2,0])
    imgs.blit(pygame.transform.rotate(img, 270), [size*3,0])
    imgs.set_colorkey("white")
    return imgs

def make_body_images(size):
    imgs = pygame.Surface((size*3,size*2))
    imgs.fill("white")
    
    
    pygame.draw.circle(imgs, "green", [size*2,size], int(size/4)*3, int(size/2))
    
    
    pygame.draw.circle(imgs, "yellow", [size*2,size], int(size/2+int(size/20)), int(size/10))
    
    pygame.draw.rect(imgs, "green", [size/4,0, size/2, size])
    pygame.draw.rect(imgs, "yellow", [size/2-int(size/20),0, size/10, size])
    
    pygame.draw.rect(imgs, "green", [0,size+size/4, size, size/2])
    pygame.draw.rect(imgs, "yellow", [0,size+size/2-int(size/20), size, size/10])
    imgs.set_colorkey("white")
    return imgs

head_images = make_head_images(tile_size)
body_images = make_body_images(tile_size)

pygame.image.save(head_images, "headimages.png")
pygame.image.save(body_images, "bodyimages.png")

while not done:
    # This limits the while loop to a max of 60 times per second.
    # Leave this out and we will use all CPU we can.
    clock.tick(60)

    for event in pygame.event.get():  # User did something
        if event.type == pygame.QUIT:  # If user clicked close
            done = True  # Flag that we are done so we exit this loop

    # Clear the screen and set the screen background
    screen.fill("purple")

    # This draws a triangle using the polygon command
    screen.blit(head_images, (0,0))
    screen.blit(body_images, (0,head_images.get_rect().height))
    
    pygame.display.flip()

# Be IDLE friendly
pygame.quit()
```

### Part 2 - Snake with images

```python
import pygame
import random

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

step_size = 20

# Load the images from the image file
head_image=pygame.image.load("headimages.png")
body_image=pygame.image.load("bodyimages.png")

# Resize the images to the size we need. The files contain several tiles so we need to make room for these
head_image=pygame.transform.scale(head_image, (4 * step_size, step_size)) # Head has one row of 4 tiles
body_image=pygame.transform.scale(body_image, (3 * step_size, 2 * step_size)) # Body has two rows of 3 tiles

# Tell pygame about the background colour so it can remove this when we use the images
head_image.set_colorkey("white")
body_image.set_colorkey("white")

score_font = pygame.font.SysFont(None, 48)

directions={
    "UP": pygame.Vector2(0,-step_size),
    "DOWN": pygame.Vector2(0, step_size),
    "LEFT": pygame.Vector2(-step_size,0),
    "RIGHT": pygame.Vector2(step_size,0)
}

head_tiles = {
    "UP": (0,0),
    "LEFT": (step_size,0),
    "DOWN": (step_size*2,0),
    "RIGHT": (step_size*3,0)
}

body_tiles = {
    "UP": {
        "UP":(0,0),
        "LEFT": (step_size*2,0),
        "DOWN": (0,0),
        "RIGHT":(step_size,0)
    },
    "LEFT": {
        "UP":(step_size, step_size),
        "LEFT": (0,step_size),
        "DOWN": (step_size,0),
        "RIGHT": (0,step_size)
    },
    "DOWN": {
        "UP":(0,0),
        "LEFT": (step_size*2,step_size),
        "DOWN": (0,0),
        "RIGHT": (step_size,step_size)
    },
    "RIGHT": {
        "UP":(step_size*2,step_size),
        "LEFT": (0,step_size),
        "DOWN": (step_size*2,0),
        "RIGHT": (0,step_size)
    }
}

def find_food_pos(snake_body):
    try_pos = pygame.Rect((0,0),(step_size, step_size))
    while True:
        try_pos.topleft = (
            random.randint(0, screen.get_width()-step_size),
            random.randint(0, screen.get_height()-step_size)
        )
        if try_pos.collidelist(snake_body) == -1:
            return try_pos

def play_game():
    # Setup the start position for the game
    snake_direction = "RIGHT"
    old_direction = snake_direction

    # Set the initial size of the snake and the position of its head
    initial_snake_length = 5
    snake_head_pos = pygame.Rect((screen.get_width()/2, screen.get_height()/2), (step_size, step_size))

    # List to hold the snake
    snake_body = []
    snake_tiles = []

    # Build a list of rectangles to store our snake
    for counter in range(1, initial_snake_length+1):
        snake_body.append(snake_head_pos.move(directions[snake_direction]*-counter))
        snake_tiles.append(body_tiles[snake_direction][snake_direction])
        
    food_pos = find_food_pos(snake_body)

    player_score = 0

    running = True
    while running:
        # poll for events
        # pygame.QUIT event means the user clicked X to close your window
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Save the old direction before we check which keys are pressed
        old_direction = snake_direction
        
        # Handle any user input
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP]:
            snake_direction = "UP"
        if keys[pygame.K_DOWN]:
            snake_direction = "DOWN"
        if keys[pygame.K_LEFT]:
            snake_direction = "LEFT"
        if keys[pygame.K_RIGHT]:
            snake_direction = "RIGHT"

        # Perform other work such as game effects or non-player characters
        # Shift snake body
        snake_body.insert(0, snake_head_pos.copy())
        snake_tiles.insert(0, body_tiles[old_direction][snake_direction]) 
        snake_body.pop()
        snake_tiles.pop()

        snake_head_pos.move_ip(directions[snake_direction])
        
        # detect crash with your own body
        if snake_head_pos.collidelist(snake_body) == -1:
            pass
        else:
            running = False
        
        # detect crash with the edge of the screen
        if screen.get_rect().contains(snake_head_pos):
            pass
        else:
            running = False

        if snake_head_pos.colliderect(food_pos):
            player_score+=1
            # Copy the last part of the snake to make it longer
            for counter in range(5):
                snake_body.append(snake_body[-1].copy())
                snake_tiles.append(snake_tiles[-1])
            food_pos = find_food_pos(snake_body)

        # Fill the screen with a colour to wipe away anything from last frame
        screen.fill("purple")

        # Draw your game screen
        for counter in range(len(snake_body)):
            screen.blit(
                body_image,
                snake_body[counter],
                pygame.Rect(snake_tiles[counter],(step_size,step_size))
            )
        tile_pos = head_tiles[snake_direction]
        screen.blit(head_image, snake_head_pos, pygame.Rect(tile_pos,(step_size,step_size)))
        pygame.draw.rect(screen, "green", food_pos)
        
        score_message = "Score: "+str(player_score)
        score_image=score_font.render(score_message, True, "black")
        screen.blit(score_image, (10,0))


        # flip() the display to put your work on screen
        pygame.display.flip()

        # Control how fast your game updates.
        # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
        clock.tick(20)
    return player_score

def create_text_image(message_list):
    max_width = 0
    total_height = 0
    image_list = []
    for message,colour in message_list:
        next_image = score_font.render(message, True, colour)
        image_list.append(next_image)
        max_width = max(max_width, next_image.get_rect().width)
        total_height+=next_image.get_rect().height + 10
    whole_image = pygame.Surface((max_width, total_height), flags=pygame.SRCALPHA)
    whole_image.fill((0,0,0,0))
    current_y=0
    for image in image_list:
        whole_image.blit(image, ((max_width - image.get_rect().width)/2,current_y))
        current_y+=image.get_rect().height + 10
    return whole_image
    
def show_final_screen(score):        
    over_image = create_text_image([
        ("GAME OVER", "black"),
        ("Final Score: "+str(score), "blue"),
        ("Play Again? Y/N", "red")
    ])
    screen.blit(
        over_image,
        ((screen.get_width()-over_image.get_rect().width)/2,
        (screen.get_height()-over_image.get_rect().height)/2)
    )
    pygame.display.flip()
        
running = True
while running:
    final_score = play_game()
    show_final_screen(final_score)
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                 running = False
                 waiting = False
             
        keys = pygame.key.get_pressed()
        if keys[pygame.K_q] or keys[pygame.K_ESCAPE] or keys[pygame.K_n]:
            running = False
            waiting = False
        if keys[pygame.K_y]:
            waiting = False

pygame.quit()
```

## Examples - Chapter 10

```python
import pygame
import random
import math

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()

# Status of the game
running = True
old_mouse = pygame.Vector2(0,0)
use_gravity = True
use_friction = True
use_collision = True

# Game settings
size = 40
max_speed = 40
gravity = 5
num_of_balls = 20

# Empty list of balls
balls = []

# Reset function
def reset():
    global balls
    
    balls=[]
    for ball in range(num_of_balls):
        ball_pos = pygame.Vector2(
            random.randint(screen.get_width()/4, screen.get_width()/4*3),
            random.randint(screen.get_height()/4, screen.get_height()/4*3)
        )

        random_right = 
        random_down = 
        ball_direction = pygame.Vector2(
            random.randint(-max_speed, max_speed),
            random.randint(-max_speed, max_speed)
        )

        balls.append((ball_pos, ball_direction))

#Setup the game
reset()

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
    # Handle any user input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
        running = False
    if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
        running = False
    if keys[pygame.K_r]:
        reset()
    if keys[pygame.K_g]:
        use_gravity = not use_gravity
    if keys[pygame.K_f]:
        use_friction = not use_friction
    if keys[pygame.K_c]:
        use_collision = not use_collision

    # Perform other work such as game effects or non-player characters

    # Work repeated for every ball is inside this loop
    for ball_position, ball_direction in balls:    

        if use_friction:
            ball_direction*=0.98
        if use_gravity:
            ball_direction.y+=gravity

        ball_position+=ball_direction

        # Detect if we've reached a wall and then bounce
        if (ball_position.y-size < 0 or
            ball_position.y+size > screen.get_height()):
            ball_direction.y = -ball_direction.y

        if (ball_position.x-size < 0 or
               ball_position.x+size > screen.get_width()):
            ball_direction.x = -ball_direction.x
            
        # Don't let the ball go outside the edges
        if ball_position.y+size > screen.get_height():
            ball_position.y = screen.get_height()-size
        if ball_position.y-size < 0:
            ball_position.y = size
        if ball_position.x+size > screen.get_width():
            ball_position.x = screen.get_width()-size
        if ball_position.x-size < 0:
            ball_position.x = size
        
            
        # If mouse is clicked throw the ball
        if pygame.mouse.get_pressed()[0]:
            new_mouse=pygame.Vector2(pygame.mouse.get_pos())
            ball_direction.update(new_mouse - old_mouse)
        
    if use_collision:
        # Loop in a loop to check each pair of balls once
        for first_index in range(len(balls)-1):
            for second_index in range(first_index+1, len(balls)):
                # If balls[first_index] hits balls[second_index] then bounce them
                first_pos, first_dir = balls[first_index]
                second_pos, second_dir = balls[second_index]
                distance = first_pos.distance_to(second_pos)
                overlap = size*2-distance
                if overlap > 0:
                    # Balls overlap so they must have hit
                    
                    # Swap directions
                    old_first_dir = first_dir.copy()
                    first_dir.update(second_dir)
                    second_dir.update(old_first_dir)

                    # Make sure the balls don't overlap
                    # Get a line between the centre of the balls
                    shift_vector = first_pos-second_pos
                    # If the balls have the same centre add some randomness
                    if shift_vector.length()==0:
                        shift_vector=pygame.Vector2(
                            random.randint(1,max_speed),
                            random.randint(1, max_speed)
                        )
                    # Move each one away by half the overlap
                    shift_vector.scale_to_length(overlap/2)
                    first_pos+=shift_vector
                    second_pos-=shift_vector

    # Remember the new position
    old_mouse=pygame.Vector2(pygame.mouse.get_pos())

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")

    # Draw your game screen
    for ball_position, ball_direction in balls:
        pygame.draw.circle(screen, "red", ball_position, size)


    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```

## Examples - Chapter 11

### Part 1 - Pacman image generator

```python
import pygame
from math import pi

# Initialize pygame
pygame.init()

# Set the height and width of the screen
tile_size=50
screen_size = [tile_size*4, tile_size*24]
screen = pygame.display.set_mode(screen_size)

pygame.display.set_caption("Pacman image maker")

# Loop until the user clicks the close button.
done = False
clock = pygame.time.Clock()

def make_pacman_image(size, mouth_angle, open_factor):
    img = pygame.Surface((size,size))
    img.fill("purple")
    pygame.draw.circle(
        img,
        "yellow",
        (size/2, size/2),
        size/2
    )
    pygame.draw.polygon(
        img,
        "purple",
        [
            (size/2, size/2),
            (size, size/2*(1-open_factor)),
            (size, size/2*(1+open_factor))
        ]
    )
    return pygame.transform.rotate(img, mouth_angle)

def make_pacman_images(size):
    imgs = pygame.Surface((size*4,size*4))
    img = pygame.Surface((size,size))
    img.fill("purple")
    x=0
    y=0
    for ag in [0,90,180,270]:
        for of in [0,.5,1,.5]:
            imgs.blit(make_pacman_image(size, ag, of),[x,y])
            x+=size
        y+=size
        x=0
    imgs.set_colorkey("purple")
    return imgs

def draw_eyes(img, size, eye_offset):
    down=.4*size
    out=.15*size
    x,y=eye_offset
    pygame.draw.circle(
        img,
        "white",
        (size/2-out, down),
        size/6
    )
    pygame.draw.circle(
        img,
        "black",
        (size/2-out+x, down+y),
        size/8
    )
    pygame.draw.circle(
        img,
        "white",
        (size/2+out, down),
        size/6
    )
    pygame.draw.circle(
        img,
        "black",
        (size/2+out+x, down+y),
        size/8
    )

def draw_skirt(img, size, skirt_offset):
    ripple=.1*size
    out=.15*size
    pygame.draw.circle(
        img,
        "purple",
        (size/2-out+skirt_offset, size),
        ripple
    )
    pygame.draw.circle(
        img,
        "purple",
        (size/2+out+skirt_offset, size),
        ripple
    )
        
    
def make_ghost_image(size, colour, eye_offset, skirt_offset):
    img = pygame.Surface((size,size))
    img.fill("purple")
    pygame.draw.circle(
        img,
        colour,
        (size/2, size/3),
        size/3
    )
    pygame.draw.rect(
        img,
        colour,
        ((size/6,size/3),(size*2/3, size*4/6))
    )
    draw_eyes(img, size, eye_offset)
    draw_skirt(img, size, skirt_offset)
    return img

def make_ghost_images(size, colour):
    imgs = pygame.Surface((size*4,size*4))
    img = pygame.Surface((size,size))
    img.fill("purple")
    x=0
    y=0
    for eox, eoy in [(1,0),(0,-1),(-1,0),(0,1)]:
        for so in [0,size/10,0,-size/10]:
            imgs.blit(make_ghost_image(size, colour, (eox*size/15, eoy*size/15), so),[x,y])
            x+=size
        y+=size
        x=0
    imgs.set_colorkey("purple")
    return imgs

def make_ghosts_images(size):
    imgs = pygame.Surface((size*4, size*24))
    imgs.fill("purple")
    for y,colour in [
        (4, "blue"),
        (8, "red"),
        (12, "cyan"),
        (16, "pink"),
        (20, "orange")]:
        imgs.blit(make_ghost_images(size, colour), (0,y*size))
    imgs.set_colorkey("purple")
    return imgs

game_images = pygame.Surface(screen_size)
game_images.fill("purple")
game_images.blit(make_pacman_images(tile_size), (0,0))
game_images.blit(make_ghosts_images(tile_size), (0, 0))

pygame.image.save(game_images, "pacmanimages.png")

while not done:
    # This limits the while loop to a max of 60 times per second.
    # Leave this out and we will use all CPU we can.
    clock.tick(60)

    for event in pygame.event.get():  # User did something
        if event.type == pygame.QUIT:  # If user clicked close
            done = True  # Flag that we are done so we exit this loop

    # Clear the screen and set the screen background
    screen.fill("purple")

    # This draws a triangle using the polygon command
    screen.blit(game_images, (0,0))
    
    pygame.display.flip()

# Be IDLE friendly
pygame.quit()
```

### Part 2 - Pacman Game

```python
import pygame
import os
import random

# Game settings
# =============

tile_size=30
player_move_size = 3
game_FPS = 60
power_up_duration = 15

# Game map
game_map = [
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w............ww............w",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "wow  w.w   w.ww.w   w.w  wow",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "w..........................w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w......ww....ww....ww......w",
    "wwwwww.wwwww.ww.wwwww.wwwwww",
    "     w.wwwww.ww.wwwww.w     ",
    "     w.ww..........ww.w     ",
    "wwwwww.ww.wwwxxwww.ww.wwwwww",
    "      ....wggggggw....      ",
    "wwwwww.ww.wwwwwwww.ww.wwwwww",
    "     w.ww..........ww.w     ",
    "     w.wwwww.ww.wwwww.w     ",
    "wwwwww.wwwww.ww.wwwww.wwwwww",
    "w......ww....ww....ww......w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w.wwww.ww.wwwwwwww.ww.wwww.w",
    "w..........................w",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "wow  w.w   w.ww.w   w.w  wow",
    "w.wwww.wwwww.ww.wwwww.wwww.w",
    "w............ww............w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
]

directions={
    "UP": (0,-1),
    "DOWN": (0, 1),
    "LEFT": (-1,0),
    "RIGHT": (1,0)
}

opposite_dir = {
    "UP": "DOWN",
    "DOWN": "UP",
    "LEFT": "RIGHT",
    "RIGHT": "LEFT"
}

corners=[
    (0,0),
    (0,tile_size-1),
    (tile_size-1,0),
    (tile_size-1, tile_size-1)
]

# pygame setup
# ============

# pygame uses SDL, tell SDL to create the game window in the middle of the display
os.environ['SDL_VIDEO_CENTERED'] = '1'

pygame.init()
screen = pygame.display.set_mode((tile_size*len(game_map[0]), tile_size*len(game_map)))
clock = pygame.time.Clock()


# Game assets and resources
# =========================

# Load font
score_font = pygame.font.SysFont(None, tile_size-2)

# Load the images from the image file
game_images=pygame.image.load("pacmanimages.png")

# Resize the images to the size we need. The files contain several tiles so we need to make room for these
game_images=pygame.transform.scale(game_images, (4 * tile_size,24 * tile_size))

# Tell pygame about the background colour so it can remove this when we use the images
game_images.set_colorkey("purple")

# Game state
# ==========

player_direction="RIGHT"
animation_offset=0
player_pos=pygame.Rect((0,0),(0,0))
player_score=0
playing=True
game_level=1
player_lives=3
dots_remaining=0
working_map=[]
ghosts=[]
power_up = 0

# Map helper functions
# ====================

def map_tile_rect(map_pos):
    x,y=map_pos
    return pygame.Rect((x*tile_size, y*tile_size),(tile_size,tile_size))

def get_map_tile(map_pos):
    x,y = map_pos
    return working_map[y][x]

def draw_grid_tile(pos):
    match get_map_tile(pos):
        case 'w':
            pygame.draw.rect(screen, "blue", map_tile_rect(pos))
        case '.':
            rect = map_tile_rect(pos)
            pygame.draw.rect(screen, "black", rect)
            pygame.draw.circle(screen, "white", rect.center, tile_size/8)
        case 'o':
            rect = map_tile_rect(pos)
            pygame.draw.rect(screen, "black", rect)
            pygame.draw.circle(screen, "pink", rect.center, tile_size/3)
        case 'x':
            rect = map_tile_rect(pos)
            pygame.draw.rect(screen, "black", rect)
            pygame.draw.rect(screen, "grey", rect.inflate(0,-tile_size/2))
        case _:
            pygame.draw.rect(screen, "black", map_tile_rect(pos))                

def draw_map():
    for row_num in range(len(working_map)):
        for column_num in range(len(working_map[row_num])):
            draw_grid_tile((column_num, row_num))
            
def pos_map_tile(pos):
    return (pos.x//tile_size, pos.y//tile_size)

def set_map_tile(map_pos, code):
    x,y=map_pos
    working_map[y][x]=code

def wrap_pos_ip(pos):
    if pos.x < 0:
        pos.x+= screen.get_width()
    if pos.x >= screen.get_width():
        pos.x = pos.x-screen.get_width()
    if pos.y < 0:
        pos.y+= screen.get_height()
    if pos.y >= screen.get_height():
        pos.y = pos.y-screen.get_height()

def moved_pos(curr_pos, dir, size):
    x,y=directions[dir]
    new_pos = curr_pos.move((x*size, y*size))
    wrap_pos_ip(new_pos)
    return new_pos

def can_move(curr_pos, dir, size, block="wx"):
    new_pos = moved_pos(curr_pos, dir, size)
    for corner_move in corners:
        corner_pos = new_pos.move(corner_move)
        wrap_pos_ip(corner_pos)
        if get_map_tile(pos_map_tile(corner_pos)) in block:
            return False
    return True

def rect_distance(rect1, rect2):
    return abs(rect1.x - rect2.x)+abs(rect1.y - rect2.y)

# Image helper functions
# ======================

def calc_image_rect(first_image_offset, direction, animation_step):
    return pygame.Rect(
        (animation_step*tile_size, first_image_offset+dir_offset[direction]),
        (tile_size,tile_size)
    )

dir_offset={
    "RIGHT": 0,
    "UP": tile_size,
    "LEFT": 2*tile_size,
    "DOWN": 3*tile_size
}

def create_text_image(message_list):
    max_width = 0
    total_height = 0
    image_list = []
    for message,colour in message_list:
        next_image = score_font.render(message, True, colour)
        image_list.append(next_image)
        max_width = max(max_width, next_image.get_rect().width)
        total_height+=next_image.get_rect().height + 10
    whole_image = pygame.Surface((max_width, total_height), flags=pygame.SRCALPHA)
    whole_image.fill((0,0,0,0))
    current_y=0
    for image in image_list:
        whole_image.blit(image, ((max_width - image.get_rect().width)/2,current_y))
        current_y+=image.get_rect().height + 10
    return whole_image
    
# Setup functions
# ===============

def new_ghost(pos, image_offset, direction, type, speed):
    return {
        "pos": map_tile_rect(pos),
        "img": image_offset,
        "dir": direction,
        "type": type,
        "speed": speed
    }

def reset_working_map():
    global dots_remaining, working_map, ghosts
    dots_remaining = 0
    working_map = []
    for row in game_map:
        # Convert the string into a list of characters and add it to working_map
        working_map.append(list(row))
        # Check each character in the row and count the dots
        for code in row:
            if code == '.':
                dots_remaining+=1
                
    ghosts = []
    ghosts.append(new_ghost((13,13), 8*tile_size, "LEFT", "random", 2))
    ghosts.append(new_ghost((12,15), 12*tile_size, "RIGHT", "random", 3))
    ghosts.append(new_ghost((13,15), 16*tile_size, "UP", "shortest", 1))
    ghosts.append(new_ghost((14,15), 20*tile_size, "DOWN", "shortest", 2))

# Game functions
# ==============

def draw_score():
    # Use our font to turn some text into an image
    score_image = score_font.render(
        f"Score: {player_score}",
        True,
        "white"
    )
    # Place the image on our screen
    screen.blit(score_image, map_tile_rect((1,1)))
    
def move_pacman(dir):
    player_pos.update(moved_pos(player_pos, dir, player_move_size))
    
# function to draw the player
def draw_pacman():
    screen.blit(game_images, player_pos, calc_image_rect(0, player_direction, animation_step))
    if screen.get_width()-player_pos.x<tile_size:
        screen.blit(
            game_images,
            player_pos.move((-screen.get_width(),0)),
            calc_image_rect(0, player_direction, animation_step)
        )
    if screen.get_height()-player_pos.y<tile_size:
        screen.blit(
            game_images,
            player_pos.move((0, -screen.get_height())),
            calc_image_rect(0, player_direction, animation_step)
        )
    
def check_dots():
    global player_score, dots_remaining
    # Check if player is fully on one square.
    if player_pos.x % tile_size == 0 and player_pos.y % tile_size == 0:
        # Check if the player is on a dot
        if get_map_tile(pos_map_tile(player_pos)) == '.':
            # Update score and remove dot
            set_map_tile(pos_map_tile(player_pos), ' ')
            player_score+=1
            dots_remaining-=1
            
def check_pellets():
    global player_score, power_up
    
    if player_pos.x % tile_size == 0 and player_pos.y % tile_size == 0:
        # Check if the player is on a pellet
        if get_map_tile(pos_map_tile(player_pos)) == 'o':
            # Update score and remove dot
            set_map_tile(pos_map_tile(player_pos), ' ')
            player_score+=10
            power_up = power_up_duration * game_FPS
                
def draw_levels():
    drawing_row = len(working_map)-2
    drawing_col = len(working_map[drawing_row])-2
    level_rect = map_tile_rect((drawing_col, drawing_row))
    pygame.draw.rect(
        screen,
        "black",
        pygame.Rect(level_rect.move((-4*tile_size,0)).topleft, (5*tile_size, tile_size))
    )
    for level in range(game_level):
        pygame.draw.circle(screen, "red", level_rect.center, tile_size/2)
        level_rect.move_ip(-tile_size, 0)
        
def draw_lives():
    drawing_row = len(working_map)-2
    drawing_col = 1
    level_rect = map_tile_rect((drawing_col, drawing_row))
    pygame.draw.rect(screen, "black", pygame.Rect(level_rect.topleft, (3*tile_size, tile_size)))
    for level in range(player_lives):
        pygame.draw.circle(screen, "yellow", level_rect.center, tile_size/2)
        level_rect.move_ip(tile_size, 0)
        
def draw_power_up():
    if power_up > 0:
        power_col = "red"
        if power_up > 5 * game_FPS:
            power_col = "orange"
        power_image = score_font.render(
            str(power_up*10//game_FPS/10),
            True,
            power_col
        )
        # Place the image on our screen
        screen.blit(power_image, map_tile_rect((len(game_map[0])-3,1)))
        
        
def get_random_direction(ghost):
    # Make a list of directions
    dir_list = list(directions)
    # Remove opposite direction if the current direction is clear
    if can_move(ghost["pos"], ghost["dir"], ghost["speed"]):
        dir_list.remove(opposite_dir[ghost["dir"]])
    # Mix the list of directions
    random.shuffle(dir_list)
    # Now pick the first valid one
    for dir in dir_list:
        if can_move(ghost["pos"], dir, ghost["speed"]):
            return dir
        
def dir_sort_key(item):
    dir, score = item
    return score

def get_by_distance(ghost, rev):
    dir_list = list(directions)
    
    # Remove opposite direction if the current direction is clear
    if can_move(ghost["pos"], ghost["dir"], ghost["speed"]):
        dir_list.remove(opposite_dir[ghost["dir"]])
    
    # Get a list of valid directions with their distance scores
    dist_list = []
    for dir in dir_list:
        if can_move(ghost["pos"], dir, ghost["speed"]):
            dist_list.append((dir, rect_distance(player_pos, moved_pos(ghost["pos"], dir, ghost["speed"]))))
    # Sort by distance
    dist_list.sort(reverse=rev, key=dir_sort_key)
    # Return the shorted direction
    dir,_ = dist_list[0]
    return dir

def get_shortest_direction(ghost):
    return get_by_distance(ghost, False)

def run_away_direction(ghost):
    return get_by_distance(ghost, True)

def move_ghosts():
    global player_score
    
    for ghost in ghosts:
        pos = ghost["pos"]
        dir = ghost["dir"]
        if pos.x % tile_size == 0 and pos.y % tile_size == 0:
            # Fully on a tile so check directions
            # Leave the centre area first
            if get_map_tile(pos_map_tile(pos)) in "gx" and can_move(pos, "UP", ghost["speed"],"w"):
                dir = "UP"
            # Run away during power ups
            elif power_up > 0:
                dir = run_away_direction(ghost)
            # Use the ghost type
            elif ghost["type"]=="random":
                dir = get_random_direction(ghost)
            else:
                dir = get_shortest_direction(ghost)
        # Keep moving
        if can_move(pos, dir, ghost["speed"], "w"):
            pos.update(moved_pos(pos, dir, ghost["speed"]))
        # Check for player
        if pos.colliderect(player_pos):
            if power_up > 0:
                # Eaten by player in power up mode
                player_score += 50
                ghost["pos"]=map_tile_rect((13,15))
            else:
                # Catch player, end this round
                return True
        #save the direction for next time
        ghost["dir"]=dir
    return False

def draw_ghosts():
    for ghost in ghosts:
        image = ghost["img"]
        if power_up > 0:
            image = 4*tile_size
        screen.blit(game_images, ghost["pos"], calc_image_rect(image, ghost["dir"], animation_step))
        
def show_game_over():        
    over_image = create_text_image([
        ("GAME OVER", "white"),
        ("Final Score: "+str(player_score), "cyan"),
        ("Play Again? Y/N", "yellow")
    ])
    screen.blit(
        over_image,
        ((screen.get_width()-over_image.get_rect().width)/2,
        (screen.get_height()-over_image.get_rect().height)/2)
    )
    draw_lives()
    pygame.display.flip()

# Main game loop
# ==============

def play_level():
    global player_pos, player_direction, animation_step, power_up
    # Setup initial player position. Make sure it is not in a wall!
    player_pos = pygame.Rect((13*tile_size, 17*tile_size), (tile_size,tile_size))
    player_direction = "RIGHT"
    running = True
    reset_working_map()
    loop_count=0
    power_up=0
    
    while running:
        loop_count+=1
        if power_up > 0:
            power_up-=1
        animation_step = (loop_count//10)%4
        # poll for events
        # pygame.QUIT event means the user clicked X to close your window
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Handle any user input
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            if can_move(player_pos, "UP", player_move_size):
                player_direction = "UP"
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            if can_move(player_pos, "DOWN", player_move_size):
                player_direction = "DOWN"
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            if can_move(player_pos, "LEFT", player_move_size):
                player_direction = "LEFT"
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            if can_move(player_pos, "RIGHT", player_move_size):
                player_direction = "RIGHT"
        if keys[pygame.K_q] or keys[pygame.K_ESCAPE]:
            running = False

        # Perform other work such as game effects or non-player characters
        if can_move(player_pos, player_direction, player_move_size):
            move_pacman(player_direction)
        
        check_dots()
        check_pellets()
        if dots_remaining == 0:
            running = False
            
        if move_ghosts():
            running = False

        
        # Fill the screen with a colour to wipe away anything from last frame
        screen.fill("purple")

        # Draw your game screen
        draw_map()
        
        draw_ghosts()
                
        draw_pacman()
        
        draw_score()
        
        draw_levels()
        
        draw_lives()
        
        draw_power_up()
        
        # flip() the display to put your work on screen
        pygame.display.flip()

        # Control how fast your game updates.
        # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
        clock.tick(game_FPS)
        
# Main loop for the levels
# ========================

while playing:
    play_level()
    if dots_remaining == 0:
        game_level+=1
    else:
        player_lives-=1
        if player_lives == 0:
            show_game_over()
            waiting = True
            while waiting:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                         playing = False
                         waiting = False
                     
                keys = pygame.key.get_pressed()
                if keys[pygame.K_q] or keys[pygame.K_ESCAPE] or keys[pygame.K_n]:
                    playing = False
                    waiting = False
                if keys[pygame.K_y]:
                    waiting = False
                    game_level=1
                    player_lives=3
                    player_score=0

pygame.quit()
```

## Examples - Chapter 12

```python
import pygame
import random

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

tile_size = 40
wall_thickness = 5
door_width = 10
maze_width = 30
maze_height = 20
maze_map = []
wall_colour = "black"
floor_colour = "grey"
player_colour = "red"
player_pos = pygame.Vector2(0,0)

directions = {
    "DOWN": (0,1),
    "RIGHT": (1,0),
    "UP": (0,-1),
    "LEFT": (-1,0)
}

opposites = {
    "DOWN": "UP",
    "UP": "DOWN",
    "LEFT": "RIGHT",
    "RIGHT": "LEFT"
}

# pygame setup
pygame.init()
screen = pygame.display.set_mode((maze_width*tile_size, maze_height*tile_size))
clock = pygame.time.Clock()
running = True

def maze_tile_rect(x,y):
    return pygame.Rect((x*tile_size, y*tile_size), (tile_size, tile_size))

def tile_floor_rect(x,y):
    return pygame.Rect((
        x*tile_size+wall_thickness,
        y*tile_size+wall_thickness
    ), (
        tile_size-2*wall_thickness,
        tile_size-2*wall_thickness
    ))

def tile_door_rect(x,y,dir):
    tile_rect = maze_tile_rect(x,y)
    door_edge = (tile_size-door_width)//2
    match dir:
        case "UP":
            tile_rect.width=door_width
            tile_rect.height=wall_thickness
            return tile_rect.move((door_edge,0))
        case "DOWN":
            tile_rect.width=door_width
            tile_rect.height=wall_thickness
            return tile_rect.move((door_edge,tile_size-wall_thickness))
        case "LEFT":
            tile_rect.width=wall_thickness
            tile_rect.height=door_width
            return tile_rect.move((0,door_edge))
        case "RIGHT":
            tile_rect.width=wall_thickness
            tile_rect.height=door_width
            return tile_rect.move((tile_size-wall_thickness,door_edge))

def make_initial_map():
    # Make a list of columns
    # Each column has a row of tiles
    # Each tile shows if there is a door (True or False) in each direction
    for column in range(maze_width):
        row_list = []
        for row in range(maze_height):
            tile_details={}
            for dir in directions:
                tile_details[dir]=False
            row_list.append(tile_details)
        maze_map.append(row_list)

def inside_maze(x,y):
    if x<0 or y<0:
        return False
    if x>=maze_width or y>=maze_height:
        return False
    return True

def can_move(dir):
    return maze_map[int(player_pos.x)][int(player_pos.y)][dir]

def make_door(x,y,dir):
    next_x, next_y = directions[dir]
    # Set the door for the tile to True
    maze_map[int(x)][int(y)][dir]=True
    # If the other side is in the maze also set that to True
    if inside_maze(x+next_x, y+next_y):
        maze_map[int(x+next_x)][int(y+next_y)][opposites[dir]]=True

def draw_maze():
    for column in range(maze_width):
        for row in range(maze_height):
            pygame.draw.rect(screen, wall_colour, maze_tile_rect(column, row))
            pygame.draw.rect(screen, floor_colour, tile_floor_rect(column, row))
            for dir in directions:
                if maze_map[column][row][dir]:
                    pygame.draw.rect(screen, floor_colour, tile_door_rect(column, row, dir))

def draw_player():
    x,y=player_pos
    player_tile = maze_tile_rect(x,y)
    pygame.draw.circle(screen, player_colour, player_tile.center, tile_size/3)

def make_tile_tracker():
    tiles=[]
    for col in range(maze_width):
        col=[]
        for row in range(maze_width):
            col.append(False)
        tiles.append(col)
    return tiles

def animate_designer(pos):
    for event in pygame.event.get():
        pass
    draw_maze()
    pygame.draw.circle(screen, "white", maze_tile_rect(pos.x, pos.y).center, tile_size/4)
    pygame.display.flip()
    clock.tick(60)    

def explore_tile(pos,tracker):
    tracker[int(pos.x)][int(pos.y)]=True
    dir_list = list(directions)
    random.shuffle(dir_list)
    for dir in dir_list:
        animate_designer(pos)
        next_pos = pos+directions[dir]
        # Only visit the next tile if it is inside the maze
        if inside_maze(next_pos.x, next_pos.y):
            # Only visit if we haven't already been there
            if not tracker[int(next_pos.x)][int(next_pos.y)]:
                # Make a door and explore further
                make_door(pos.x, pos.y, dir)
                explore_tile(next_pos, tracker)

def design_maze():
    tiles_visited=make_tile_tracker()
    start_pos=pygame.Vector2(0,0)
    explore_tile(start_pos, tiles_visited)

make_initial_map()
design_maze()

# A function with a yield statement defines a generator
def explorer_generator(pos, tracker):
    tracker[int(pos.x)][int(pos.y)]=True
    dir_list = list(directions)
    random.shuffle(dir_list)
    for dir in dir_list:
        # Only visit the next tile if there is a door
        if can_move(dir):
            next_pos = pos+directions[dir]
            # Only visit if we haven't already been there
            if not tracker[int(next_pos.x)][int(next_pos.y)]:
                # move and explore further
                yield dir
                yield from explorer_generator(next_pos, tracker)
                yield opposites[dir]    

def move_generator():
    tiles_visited=make_tile_tracker()
    yield from explorer_generator(player_pos, tiles_visited)

# We actually get a generator we can use by calling the function
player_move = move_generator()

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    dir = next(player_move)
    if can_move(dir):
        player_pos+=directions[dir]
        if player_pos.x==maze_width-1 and player_pos.y==maze_height-1:
            running=False
    else:
        print("Error. Tried to move:", dir)

    # Perform other work such as game effects or non-player characters

    # Fill the screen with a colour to wipe away anything from last frame
    screen.fill("purple")
    
    draw_maze()

    draw_player()

    # flip() the display to put your work on screen
    pygame.display.flip()

    # Control how fast your game updates.
    # 20 frames per second is quite slow for modern games but is easier to control when we are starting.
    clock.tick(20)

pygame.quit()
```
