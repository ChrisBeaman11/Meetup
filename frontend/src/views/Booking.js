import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
const Booking = () =>{
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return(
        <div>
            <h1>Confirm your stay</h1>
            <DatePicker selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
            <DatePicker selected={endDate} onChange={(endDate) => setEndDate(endDate)} />
        </div>
)

}


export default Booking
