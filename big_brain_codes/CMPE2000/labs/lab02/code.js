
const takeAChanceText = ["Second Place in Beauty Contest: $10", "Bank Pays You Dividend of $50",
    "Repair your Properties. You owe $250", "Speeding Fine: $15", "Holiday Fund Matures: Receive $100",
    "Pay Hospital Fees: $100"];
const takeAChanceMoney = [10, 50, -250, -15, 100, -100];
let fees = [60, 0, 60, 200, 200, 100, 0, 100, 120, 50, 140, 150, 140, 160, 200, 180, 0, 180, 200, 
    0, 220, 0, 220, 240, 200, 260, 260, 150, 280, 0, 300, 300, 0, 320, 200, 0, 350, 100, 400];
let rr = [0,0];

let player1Pos = 0;
let player2Pos = 0;
let turn = 1;
let player1Cash = 3000;
let player2Cash = 3000;
let currR = 0;
let total;

const p1 = document.getElementById('player1');
const p2 = document.getElementById('player2');

const p1icon = '<div><img id="p1-image" src="../lab01/monopoly/images/player1.png" alt="player 1 image" style="width:50px;height:auto;">';
const p2icon = '<div><img id="p2-image" src="../lab01/monopoly/images/player2.png" alt="player 2 image" style="width:50px;height:auto;">';

p1.innerHTML = `<h2 style="margin-bottom: -5px;">Player 1</h2><br><img id="p1icon" src="../lab01/monopoly/images/player1.png" alt="player 1 image" style="width: 80px">`;
p2.innerHTML = `<h2 style="margin-bottom: -5px;">Player 2</h2><br><img id="p2icon" src="../lab01/monopoly/images/player2.png" alt="player 1 image" style="width: 80px">`;

document.getElementById('die1').innerHTML = `<img class="die" src="./images/1.png">`
document.getElementById('die2').innerHTML = `<img class="die" src="./images/1.png">`

let section = document.querySelectorAll('section');
section[0].innerHTML += '<div><img id="p1-image" src="../lab01/monopoly/images/player1.png" alt="player 1 image" style="width: 50px;height:auto;"><img id="p2-image" src="../lab01/monopoly/images/player2.png" alt="player 1 image" style="width: 50px;height:auto;"></div>';
document.getElementById(`p${turn}icon`).style.border = "3px dashed red";

section.forEach(function (section) {
    let suite = section.getAttribute('suite');
    let value = section.getAttribute('val');
    section.setAttribute("rented", 0);

    if (value > 0) {
        section.innerHTML += '<div class="value">$' + value + '</div>';
    }
    section.style.gridRow = suite[0] + suite[1];
    section.style.gridColumn = suite[2] + suite[3];

    if (section.classList.contains('brown') || section.classList.contains('lightblue')) {
        section.classList.add('top');
    }
    else if (section.classList.contains('red') || section.classList.contains('yellow')) {
        section.classList.add('bottom');
    }
    else if (section.classList.contains('orange') || section.classList.contains('purple')) {
        section.classList.add('right');
    }
    else if (section.classList.contains('green') || section.classList.contains('blue')) {
        section.classList.add('left');
    }
});

document.getElementById('RollDice').onclick = function () {
    let die1Val = diceRoll();
    let die2Val = diceRoll();
    total = die1Val + die2Val;

    document.getElementById(`p${turn}icon`).style.border = "none";

    document.getElementById('die1').innerHTML = `<img class="die" src="./images/` + die1Val + `.png">`;
    document.getElementById('die2').innerHTML = `<img class="die" src="./images/` + die2Val + `.png">`;

    if (player1Cash > 0 && player2Cash > 0) {
        if (turn == 1) {
            document.getElementById('p1-image').remove();
            player1Pos += total;
            if (player1Pos >= 40) {
                player1Pos -= 40;
                player1Cash += 200;
            }
            checkPos(player1Pos);
            section[player1Pos].innerHTML += p1icon;
            if (player1Pos == 30) {
                alert("Go to jail!");
                document.getElementById('p1-image').remove();
                section[10].innerHTML += p1icon;
                player1Pos = 10;
                turn = 2;
            }
            if (die1Val == die2Val) {
                turn = 1;
            }
            else {
                turn = 2;
            }
        }
        else if (turn == 2) {
            document.getElementById('p2-image').remove();
            player2Pos += total;
            if (player2Pos >= 40) {
                player2Pos -= 40;
                player2Cash += 200;
            }
            checkPos(player2Pos);
            section[player2Pos].innerHTML += p2icon;
            if (player2Pos == 30) {
                alert("Go to jail!");
                document.getElementById('p2-image').remove();
                section[10].innerHTML += p2icon;
                player2Pos = 10;
                turn = 1;
            }
            if (die1Val == die2Val) {
                turn = 2;
            }
            else {
                turn = 1;
            }
        }
    }
    else {
        alert("GAME OVER");
        location.reload();
    }
    document.getElementById(`p${turn}icon`).style.border = "3px dashed red";
}

function checkPos(playerPos) {
    let section = document.querySelectorAll('section');
    let currentSpace = section[playerPos];

    if (currentSpace.classList.contains('chance') || currentSpace.classList.contains('cc')) {
        let random = chance();
        alert(takeAChanceText[random]);
        if (turn == 1) {
            player1Cash += takeAChanceMoney[random];
        }
        else {
            player2Cash += takeAChanceMoney[random];
        }
    }
    else if (currentSpace.classList.contains('tax')) {
        alert(`You must pay` + ` $${currentSpace.getAttribute('val')} for tax.`)
        if (turn == 1) {
            player1Cash -= currentSpace.getAttribute('val');
        }
        else {
            player2Cash -= currentSpace.getAttribute('val');
        }
    }
    else if (currentSpace.classList.contains('jail')) {
        alert("You've stepped in jail. Pay $50.");
        if (turn == 1) {
            player1Cash -= 50;
        }
        else {
            player2Cash -= 50;
        }
    }
    else if (!currentSpace.classList.contains('corner')) {
        if (!currentSpace.classList.contains('rented')) {
            if (turn == 1) {
                currentSpace.style.background = 'lightgreen';
                player1Cash -= currentSpace.getAttribute('val');
                currentSpace.classList.add('rented');
                if (currentSpace.classList.contains('rr')) {
                    rr[0]++;
                }
            }
            else {
                currentSpace.style.background = 'violet';
                player2Cash -= currentSpace.getAttribute('val');
                currentSpace.classList.add('rented');
                if (currentSpace.classList.contains('rr')) {
                    rr[1]++;
                }
            }
        }
        else if (currentSpace.classList.contains('rr')) {
            if (currentSpace.style.background == 'lightgreen' && turn == 2) {
                currentRent = Math.ceil(25 * rr[0]);
                alert(`You pay player 1 $${currentRent}.`)
                player1Cash += currentRent;
                player2Cash -= currentRent;
            }
            else if (currentSpace.style.background == 'violet' && turn == 1) {
                currentRent = Math.ceil(25 * rr[1]);
                alert(`You pay player 2 $${currentRent}.`)
                player1Cash -= currentRent;
                player2Cash += currentRent;
            }
        }
        else if (currentSpace.classList.contains('utility')) {
            if (currentSpace.style.background == 'lightgreen' && turn == 2) {
                currentRent = Math.ceil(total * 5);
                alert(`You pay player 1 $${currentRent} for utilities.`)
                player1Cash += currentRent;
                player2Cash -= currentRent;
            }
            else if (currentSpace.style.background == 'violet' && turn == 1) {
                currentRent = Math.ceil(total * 5);
                alert(`You pay player 2 $${currentRent} utilities.`)
                player1Cash -= currentRent;
                player2Cash += currentRent;
            }
        }
        else {
            currentRent = Math.ceil(0.10 * fees[playerPos-1]);
            if (currentSpace.style.background == 'lightgreen' && turn == 2) {
                alert(`You pay player 1 $${currentRent}.`)
                player1Cash += currentRent;
                player2Cash -= currentRent;
                fees[playerPos-1] += Math.floor(0.20 * fees[playerPos-1]);
            }
            else if (currentSpace.style.background == 'violet' && turn == 1) {
                alert(`You pay player 2 $${currentRent}.`)
                player1Cash -= currentRent;
                player2Cash += currentRent;
                fees[playerPos-1] += Math.floor(0.20 * fees[playerPos-1]);
            }
        }
    }
    document.getElementById('player1amt').innerHTML = `$${player1Cash}`
    document.getElementById('player2amt').innerHTML = `$${player2Cash}`
}

function diceRoll() {
    return Math.floor(Math.random() * 6) + 1;
}

function chance() {
    return Math.floor(Math.random() * 6);
}