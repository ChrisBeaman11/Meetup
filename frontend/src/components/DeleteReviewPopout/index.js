import React from "react"

export default function DeleteReviewPopout(){

    return(
        <>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this review?</p>
        <button className = "yesButton">Yes (Delete Review)</button>
        <button className = "noButton">No (Keep Review)</button>
        </>
    )
}
