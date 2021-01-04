import React from 'react';

const Card = (props) => {
    const {value, suit} = props;
    const filename = value + suit;

    return (
        <div className='card'>
        </div>
    )
}

export default Card;