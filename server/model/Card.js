export default class Card {
    constructor(cardString) {
        [this.value, this.suit] = cardString.split(/\d+g/);
    }

    getValue = () => {
        return this.value;
    }

    getSuit = () => {
        return this.value;
    }
}