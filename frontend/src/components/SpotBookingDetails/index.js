import React from "react"
import './SpotBookingDetails.css';
const SpotBookingDetails = () => {

    return (
        <div className="detailsPane">
            <div className="topCont">
            <div className="displayImage">
                <img src="https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=" alt="" />
            </div>
            <div className="rightSideDisplay">
                    <h2>Name</h2>
                    <p>City, State</p>
                </div>
            </div>
            <div className="priceDetails">
                <h3>Price Details</h3>
                <div className="nightAndPrice">
                    <p>$173.40 x 5 nights</p>
                    <p>$867.00</p>
                </div>
                <hr />
                <div className="taxAddition">
                    <p>Taxes</p>
                    <p>$52.02</p>
                </div>
                <hr />
                <div className="totalPrice">
                    <p>Total(USD)</p>
                    <p>$919.02</p>
                </div>
            </div>
        </div>
    )
}

export default SpotBookingDetails;
