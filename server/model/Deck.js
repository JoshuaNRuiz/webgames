module.exports =  class Deck {

    cards = [];

    constructor(count) {
        this.cards = this.buildDeck(count);
    }

    buildDeck = (count) => {
        let deck = [];
        for (let i = 0; i < count; i++) {
            for (let i = 1; i <= 13; i++) {
                deck.push(i + 'c');
                deck.push(i + 's');
                deck.push(i + 'h');
                deck.push(i + 'd');
            }
        }
        this.shuffle(deck);
        return deck;
    }

    shuffle = (deck) => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    toString = () => {
        return (this.cards.join(""));
    }
}