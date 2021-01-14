require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Deck = require('./model/Deck');
const e = require('express');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_TARGET
});

app.post('/api/new-game', (req, res) => {
    const userId = req.body.user_id;
    const deckCount = req.body.deck_count
    const deck = new Deck(deckCount).toString();

    try {
        const createGameSql = `INSERT INTO blackjack_game (user_id, deck) VALUES (${userId},"${deck.toString()}")`;
        connection.query(createGameSql, (error, result) => {
            if (!error) {
                console.log("new blackjack game created");
            } else {
                throw error;
            }
        });
    } catch (error) {
        console.log(error);
    } 

    res.send();
});

app.post('/api/draw', (req, res) => {
    const quantity = req.body.quantity;
    const userId = req.body.user_id;
    const hand = req.body.hand;

});

const draw = (userId) => {
    const hand = 'player_hand';
    let retrieveDeckSql = `SELECT deck, ${hand} FROM blackjack_game 
        JOIN users ON blackjack_game.user_id = users.user_id 
        WHERE users.user_id = ${userId}`;

    try {
        connection.query(retrieveDeckSql, (error, result) => {
            if (!error) {
                let [deck, card] = result[0].deck.split(/(\d+[a-z]$)/)
                const currentHand = hand == "player_hand" ? 
                // x_hand

                // const newHand = result[0].player_hand ? result[0].player_hand + card : card;
                console.log(newHand);

                const updateBlackjackGameSql = `UPDATE blackjack_game SET deck = "${deck}", ${hand} = "${newHand}" WHERE user_id = ${userId}`;
                connection.query(updateBlackjackGameSql, (error, result) => {
                    if (!error) {
                        console.log("success");
                    } else {
                        throw error;
                    }
                })
            } else {
                throw error;
            }
        })
    } catch (error) {
        console.log(error)
    }
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.listen(8000, () => {
    console.log('listening on port 8000');

});