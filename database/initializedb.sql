CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(12),
	PRIMARY KEY(user_id)
);

CREATE TABLE blackjack_game(
	blackjack_game_id INT NOT NULL AUTO_INCREMENT,
    deck VARCHAR(780),
    in_play VARCHAR(780),
    player_hand VARCHAR(780),
    dealer_hand VARCHAR(780),
    PRIMARY KEY(poker_game_id)
);

CREATE TABLE user_poker_game(
	user_id INT NOT NULL,
    blackjack_game_id INT NOT NULL,
	PRIMARY KEY(user_id, blackjack_game_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (blackjack_game_id) REFERENCES blackjack_game(blackjack_game_id)
);