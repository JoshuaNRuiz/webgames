require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { connect } = require('http2');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_TARGET
});

const draw = (userId, quantity) => {
    // open connection to database
    con.connect(err => {
        if (err) throw err;
        const sql = "SELECT deck FROM blackjack_game WHERE ";
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Result: " + result[0].username + result[0].user_id);
        })
    })
    // get the deck that the user is using
    // take off the last [2-3] characters and make
    // card object with that
}

const buildDeck = () => {
    let deck = [];
    for (let i = 1; i <= 13; i++) {
        deck.push(i + 'c');
        deck.push(i + 's');
        deck.push(i + 'h');
        deck.push(i + 'd');
    }
    shuffleArray(deck);
    return deck.join('');
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

app.post('/api/new-game', (req, res) => {
    const userId = req.body.user_id;
    const deck = buildDeck();

    try {
        con.connect(err => {
            if (err) throw err;
            const sql = "INSERT INTO blackjack_game (deck, in_play, player_hand, dealer_hand) VALUES ?";
            const values = [[deck, "", "", ""]];
            con.query(sql, [values], (err, result) => {
                if (err) throw err;
                const game_id = result.insertId;
                const updateUserGame = `INSERT INTO user_blackjack_game (user_id, blackjack_game_id) VALUES (${userId},${game_id})`;
                con.query(updateUserGame, (err, result) => {
                    if (err) throw err;
                    console.log("association made");
                })
                console.log("one entry inserted");
            });
        })
    } catch (e) {
        console.log(e);
    } finally {
        
    }
    res.send({message: "success"});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.listen(8000, () => {
    console.log('listening on port 8000');
    console.log(buildDeck());
});