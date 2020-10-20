function ageInDays() {
    var birthday = prompt("What year were you born...Good friend?");
    var ageInDayss = (2020 - birthday) * 365;
    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode("You are: " + ageInDayss + " day");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
    document.getElementById("ageInDays").remove();
}

//Challenge 2

function generateCat() {
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3

function rpsGame(yourChoice) {
    console.log(yourChoice);

    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log("Computer choice: " + botChoice);
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    console.log(results);
    message = finalMessage(results); // "You won!"
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ["rock", "paper", "scissors"] [number];
}

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        "rock": {"scissors": 1, "rock": 0.5, "paper": 0},
        "paper": {"rock": 1, "paper": 0.5, "scissors": 0},
        "scissors": {"paper": 1, "scissors": 0.5, "rock": 0}
    };

    var yourScore = rpsDatabase[yourChoice][botChoice];
    var botScore = rpsDatabase[botChoice][yourChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return {"message": "You lost!", "color": "red"};
    } else if (yourScore === 1) {
        return {"message": "You won!", "color": "green"};
    } else {
        return {"message": "You tied!", "color": "yellow"};
}
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage) {
    var imagesDatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src
    };

    // remove all the items
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src ='" + imagesDatabase[humanImgChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage["color"] + "; font-size: 60px; padding: 30px; 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src ='" + imagesDatabase[botImgChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons

var all_buttons = document.getElementsByTagName("button");
var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(all_buttons);
//console.log(copyAllButtons);
function buttonColorChange(cambio) {
    if (cambio === "red") {
        for (let i = 0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add("btn-danger");
        }
    }
    if (cambio === "green") {
        for (let i = 0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add("btn-success");
        }
    }
    if (cambio === "reset") {
        for (let i = 0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copyAllButtons[i]);
//            console.log(copyAllButtons[i]);
        }
    }
    if (cambio === "random") {
        for (let i = 0; i < all_buttons.length; i++) {
            var botones = [
                "btn-primary",
                "btn-danger",
                "btn-success",
                "btn-warning"

            ];
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            var randomNumber = (Math.floor(Math.random() * 4));
            all_buttons[i].classList.add(botones[randomNumber]);
        }
    }
}

// Challenge 5: Blackjack
let blackjackGame = {
    "you": {"scoreSpan": "#your-result", "div": ".your-box", "score": 0},
    "dealer": {"scoreSpan": "#dealer-result", "div": ".dealer-box", "score": 0}
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("img/sounds/swish.m4a");
const winSound = new Audio("img/sounds/cash.mp3");
const lossSound = new Audio("img/sounds/aww.mp3");

document.querySelector("#blackjack-hit").addEventListener("click", blackjackHit);
document.querySelector("#blackjack-deal").addEventListener("click", blackjackDeal);
document.querySelector("#blackjack-stand").addEventListener("click", dealerLogic);
document.querySelector("#userMoney").addEventListener("keyup", function () {
    desabilitarApostar(this.value);
});
document.querySelector("#apostar").addEventListener("click", apostar);
document.querySelector("#double-btn").addEventListener("click", doblar);

var cartas = [
    "img/images/A.png",
    "img/images/2.jpg",
    "img/images/3.jpg",
    "img/images/4.jpg",
    "img/images/5.jpg",
    "img/images/6.jpg",
    "img/images/7.jpg",
    "img/images/8.jpg",
    "img/images/9.jpg",
    "img/images/10.jpg",
    "img/images/J.png",
    "img/images/K.png",
    "img/images/Q.png"
];
var valor = [
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
];

var isHit = false;
var isStand = false;
var isOver = false;
var segundoHit = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var plataApostada = 0;
var aposto = false;
var money = 1000;

function desabilitarApostar(valores) {
    if (aposto === false) {
        if (valores < 50 || valores > money) {
            document.querySelector("#apostar").disabled = true;
        } else if (valores >= 50 && valores <= money) {
            document.querySelector("#apostar").removeAttribute("disabled");
            plataApostada = parseInt(valores);
        }
    }
}

function apostar() {
    document.querySelector("#userMoney").value = "";
    document.querySelector("#apostar").disabled = true;
    document.querySelector("#plataApostar").textContent = plataApostada;
    document.querySelector("#money").textContent = money - plataApostada;
    aposto = true;
}

async function blackjackHit() {
    if (isStand === false && aposto === true) {
        showCard(YOU);
        segundoHit++;
        if (segundoHit === 1) {
            await sleep(1000);
            showCard(DEALER);
        }
        isHit = true;
    } else if (aposto === false){
        var advertencia = document.getElementById("alerta");
        advertencia.classList.remove("hide");
        advertencia.style.display = "block";
        await sleep(1500);
        advertencia.classList.add("hide");
        await sleep(1000);
        advertencia.style.display = "none";
    }
}

function showCard(activePlayer) {
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("img");
        var randomNumber = Math.floor(Math.random() * 13);
        var RN;
        cardImage.src = cartas[RN = randomNumber];
        cardImage.className = "cartaUsuario";
        updateScore(activePlayer, RN);
        showScore(activePlayer);
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (isOver === true) {
        let yourImages = document.querySelector(YOU["div"]).querySelectorAll("img");
        let dealerImages = document.querySelector(DEALER["div"]).querySelectorAll("img");

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU["score"] = 0;
        DEALER["score"] = 0;

        document.querySelector(YOU["scoreSpan"]).textContent = 0;
        document.querySelector(DEALER["scoreSpan"]).textContent = 0;
        document.querySelector("#blackjack-result").textContent = "Let's play!";
        document.querySelector("#blackjack-result").style.color = "black";

        showScore(YOU);
        showScore(DEALER);

        isHit = false;
        isStand = false;
        isOver = false;
        aposto = false;
        vecesYOU = 0;
        plataApostada = 0;
        segundoHit = 0;
    }
}

var vecesYOU = 0;

function updateScore(activePlayer, RN) {
    // Si añadimos 11 me deja debajo de 21, añadir 11. Si no, añadir 1.
    var cardValue = valor[RN];
    if (activePlayer["score"] > 10 && cardValue === 11) {
        cardValue = 1;
    }
    if (vecesYOU === 0 && cardValue === 11) {
        document.querySelector("#double-btn").style.display = "block";
    }
    if (activePlayer === YOU) {
        vecesYOU++;
    }
    activePlayer["score"] += cardValue;
}

async function doblar() {
    if (money >= plataApostada + plataApostada) {
        document.querySelector("#double-btn").style.display = "none";
        plataApostada += plataApostada;
        document.querySelector("#money").textContent = money - plataApostada;
        document.querySelector("#plataApostar").textContent = plataApostada;
        document.querySelector("#double-btn").style.display = "none";
        let cardImage = document.createElement("img");
        cardImage.src = "img/images/cartaDadaVuelta.jpg";
        cardImage.id = "cartaSinRevelar";
        document.querySelector(YOU["div"]).appendChild(cardImage);
        hitSound.play();
        await sleep(500);
        while (DEALER["score"] < 17) {
            await sleep(1500);
            showCard(DEALER);
        }
        await sleep(1500);
        revelarCarta(YOU);
        await sleep(1500);
        dealerLogic();
    }
    
    document.querySelector("#double-btn").style.display = "none";
}

async function revelarCarta(activePlayer) {
    let cardImage = document.createElement("img");
    var randomNumber = Math.floor(Math.random() * 13);
    var RN;
    cardImage.src = cartas[RN = randomNumber];
    document.querySelector("#cartaSinRevelar").classList.add("esconder");
    await sleep(500);
    document.querySelector("#cartaSinRevelar").src = cardImage.src;
    document.querySelector("#cartaSinRevelar").classList.remove("esconder");
    await sleep(500);
    updateScore(activePlayer, RN);
    showScore(activePlayer);
}

function showScore(activePlayer) {
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
        if (YOU["score"] > 21) {
            dealerLogic();
        }
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
        document.querySelector(activePlayer["scoreSpan"]).style.color = "white";
    }
}

async function dealerLogic() {
    if (isHit === true && isStand === false) {
        isStand = true;
        while (DEALER["score"] < 17) {
            showCard(DEALER);
            await sleep(1000);
        }
        var ganador = winner();
        modificarTabla(ganador);
        moneyLogic(ganador);
        isOver = true;
    }
}

function winner() {
    let winner;
    if (YOU["score"] <= 21) {
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            winner = 1;
        } else if (YOU["score"] < DEALER["score"]) {
            winner = 0;
        } else if (YOU["score"] === DEALER["score"]) {
            winner = 0.5;
        }
    } else {
        if (DEALER["score"] > 21) {
            winner = 0.5;
        } else if (DEALER["score"] <= 21) {
            winner = 0;
        }
    }

    return winner;
}

var wins = 0;
var losses = 0;
var draws = 0;

function modificarTabla(ganador) {
    var results = "#blackjack-result";
    let message, messageColor;
    if (ganador === 1) {
        wins++;
        document.querySelector("#wins").textContent = wins;
        message = "You won!";
        messageColor = "green";
        winSound.play();
    } else if (ganador === 0) {
        losses++;
        document.querySelector("#losses").textContent = losses;
        message = "You lost!";
        messageColor = "red";
        lossSound.play();
    } else if (ganador === 0.5) {
        draws++;
        document.querySelector("#draws").textContent = draws;
        message = "You drew!";
        messageColor = "black";
    }

    document.querySelector(results).textContent = message;
    document.querySelector(results).style.color = messageColor;
}

function moneyLogic(ganador) {
    if (ganador === 1) {
        document.querySelector("#plataApostar").textContent = 0;
        money += plataApostada;
        if (vecesYOU === 2 && YOU["score"] === 21) {
            money += plataApostada;
            document.querySelector("#money").textContent += " Double!";
        }
    } else if (ganador === 0) {
        document.querySelector("#plataApostar").textContent = 0;
        money -= plataApostada;
    } else {
        document.querySelector("#plataApostar").textContent = 0;
    }
    document.querySelector("#money").textContent = money;
}
