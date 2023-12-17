import React from "react";

function Dice(props) {

    function handleClick() {
        props.holdDice(props.id)
    }

    return (
        <div className="dice" onClick={handleClick} style={{ backgroundColor: props.isHeld && "#59E391" }}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Dice;