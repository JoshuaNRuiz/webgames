import react, { useState, useEffect } from 'react';
import Card from '../../component/Card/Card';
import Hand from '../../component/Hand/Hand';
import Deck from '../../component/Deck/Deck';

const Blackjack = (props) => {

    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [playerId, setPlayerId] = useState(null)
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);

    const deal = () => {
        
    }

    const draw = () => {
        // hit the api to get a card
        // return from api the card
        // give the card to the current player
        const card = '1d';

        const hand = isPlayerTurn ? playerHand : dealerHand;
        const setHand = isPlayerTurn ? setPlayerHand : setDealerHand;

        setHand(() => [...hand, card]);
        calculateHandValue(hand);

        setIsPlayerTurn(!isPlayerTurn);

    }

    const calculateHandValue = (hand) => {
        let total = 0;
        for (const card in hand) {
            const value = card.split(/\d+g/);
            total += value[0]
        }
        return total;
    }

    return (
        <div className='blackjack-game'>
            <Hand />
            <Deck />
            <Hand />
        </div>
    )
}

export default Blackjack;