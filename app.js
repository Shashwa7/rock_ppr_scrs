const selectElement = (element) => document.querySelector(element)

const action = selectElement("#app >div#gameConsole> div.players.Prsn > div")
const cmpAction = selectElement(".cmpAction")
const result = selectElement("#result")
const plyrStatus = selectElement("#plyrStatus")
const cmpStatus = selectElement("#cmpStatus")
const expandInstructions= selectElement("#expand")
const newGame = selectElement("#newGame") 


//Global vars 
var plyrScore = []
var cmpScore = []
var winner = 0; //1 - ply, 2 = cmp
var turns = 5

//realtime Scoreboard
realTimeScores = () => {
    plyrStatus.innerText = ""
    cmpStatus.innerText = ""

    plyrScore.forEach(score => {
        plyrStatus.innerText += ` ${score}`
    })
    cmpScore.forEach(score => {
        cmpStatus.innerText += ` ${score}`
    })
}
//generate icon
const generateIcon = (code) => {

    switch (code) {

        case 4:
            cmpAction.innerHTML = `<div class="action">
            <i class="far fa-hand-rock" id="4"></i>
            <p>Rock</p></div>`;
            break;
        case 3:
            cmpAction.innerHTML = `<div class="action">
            <i class="far fa-hand-paper" id="3"></i>
            <p>Paper</p></div>`;
            break;
        case 2:
            cmpAction.innerHTML = `<div class="action">
            <i class="far fa-hand-peace" id="2"></i>
            <p>Scissors</p></div>`;
            break;
        case 1:
            cmpAction.innerHTML = `<div class="action">
            <i class="far fa-hand-lizard" id="1"></i>
            <p>Lizard</p></div>`;
            break;
        case 0:
            cmpAction.innerHTML = `<div class="action">
            <i class="far fa-hand-spock" id="0"></i>
            <p>Spock</p></div>`;
            break;
        default:
            cmpAction.innerText = ""; break;

    }
}


//decide winner func
const decideWinner = (p, cmp) => {

    generateIcon(cmp)

    console.log(p, cmp)
    if (p === cmp)
        winner = 0
    else {
        if (p === 4 && (cmp === 2 || cmp === 1))
            winner = 1
        else if (p === 3 && (cmp === 4 || cmp === 0))
            winner = 1
        else if (p === 2 && (cmp === 3 || cmp === 1))
            winner = 1
        else if (p === 1 && (cmp === 3 || cmp === 0))
            winner = 1
        else if (p === 0 && (cmp === 4 || cmp === 2))
            winner = 1
        else winner = 2
    }

}
//restart Game
const restartGame = () => {
    const gameStatus = selectElement("#gameStatus")
    plyrScore = []
    cmpScore = []
    winner = 0; //1 - ply, 2 = cmp
    turns = 5
    generateIcon("none")
    gameStatus.innerText = "New Game Started!"
    realTimeScores()
}

action.addEventListener("click", (event) => {
    const plyr = event.target

    //styling action
    if (plyr.tagName === "I") {
        plyr.classList.add("active")
        setTimeout(() => {
            plyr.classList.remove("active")
        }, 670)

    }

    //intializing actions
    let plyrAction = parseInt(plyr.getAttribute('id'))
    let cmpAction = Math.floor(Math.random() * 5) //0- 4 random num



    //determining result
    if (!isNaN(plyrAction) && turns > 0) {

        decideWinner(plyrAction, cmpAction)

        if (winner === 0){
            result.innerText = "Tie"
            plyrScore.push(0)
            cmpScore.push(0)
        }
        else if (winner === 1) {
            result.innerText = "You Won!"
            plyrScore.push(1)
            cmpScore.push(0)
        }
        else {
            result.innerText = "You Lose!"
            cmpScore.push(1)
            plyrScore.push(0)
        }

        realTimeScores()

        turns--
        console.log("turns left: ", turns)


    }

    //determinigFinal Result
    if (turns === 0) {
        console.log("no turns left")
        let plyrTotal = plyrScore.reduce((total, score) => {
            total += score
            return total
        }, 0)
        let cmpTotal = cmpScore.reduce((total, score) => {
            total += score
            return total
        }, 0)

        console.log(`PlayerTotal: ${plyrTotal} ComputerTotal: ${cmpTotal}`)

        if (plyrTotal > cmpTotal)
            result.innerText = "🦄 You Won! 🎉"
        else if (plyrTotal === cmpTotal)
            result.innerText = "🐨 Draw! 🎭"
        else
            result.innerText = "👾 Computer Won! 🙀"
        
    }
})

expandInstructions.addEventListener('click',() =>{
 
    const instructions = selectElement(".how2play")
    instructions.classList.toggle("active")
})

newGame.addEventListener('click',()=>{
    result.innerText = ""
    restartGame()
})
