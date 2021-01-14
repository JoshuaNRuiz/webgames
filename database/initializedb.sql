DROP TABLE users,blackjack_game;

CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(12),
	PRIMARY KEY(user_id)
);

CREATE TABLE blackjack_game(
	blackjack_game_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    deck VARCHAR(500),
    player_hand VARCHAR(500),
    dealer_hand VARCHAR(500),
    PRIMARY KEY(blackjack_game_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- CREATE TABLE user_blackjack_game(
-- 	user_id INT NOT NULL,
--     blackjack_game_id INT NOT NULL,
-- 	PRIMARY KEY(user_id, blackjack_game_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     FOREIGN KEY (blackjack_game_id) REFERENCES blackjack_game(blackjack_game_id)
-- );

INSERT INTO users(username) VALUES ("tokyo");
INSERT INTO users(username) VALUES ("ruiz");

