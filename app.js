const fetch = require("node-fetch");
const webhookEndpoint = "https://discordapp.com/api/webhooks/772648141471481857/DWF1sn_3tvvfy_o82oiPBxDW8a8CEmVuKQEiKngUTz9r09Aji2TLqkPltxyVZ300n0F8";

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