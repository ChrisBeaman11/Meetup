import React from "react"

export default function DeleteSpotPopout(){

    return(
        <>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <button className = "yesButton">Yes (Delete Spot)</button>
        <button className = "noButton">No (Keep Spot)</button>
        </>
    )
}
