const fetch = require("node-fetch");
const webhookEndpoint = require("./config").webhookEndpoint;

let lastFact = new Date("1970-01-01");

async function loadDailyFact(){
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => response.json())
    .then(json => {
        body = {
            username: "Random fact of the day!",
            content: json.text
        }
        fetch(webhookEndpoint, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    });
    
}

function sendFactAtNoon(){
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const day = time.getDay();
    const lastFactDay = lastFact.getDay();
    if(hour === 12 && minute === 00 && lastFactDay !== day){
        lastFact = time;
        loadDailyFact();
    }
}

setInterval(sendFactAtNoon, 1000);

