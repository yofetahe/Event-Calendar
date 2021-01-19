import React from 'react'

import './Calendar.css';

const EventForm = ({ eventDate, closeForm, addEvent, eventTitle, setEventTitle, deleteEvent, eventsPerDay }) => {

    return (
        <div className="Form-Content">
            <div>
                <h2>Add Your Event</h2>
                <div className="Form-Input">
                    <label for='eventDate'>Date:</label>
                    <input type="text" name="eventDate" value={eventDate} readOnly />
                </div>
                <div className="Form-Input">
                    <label for="eventTitle">Title:</label>
                    <input
                        type="text"
                        value={eventTitle}
                        name="eventTitle"
                        onChange={e => setEventTitle(e.target.value)}
                    />
                </div>
                <div className="Form-Buttons">
                    <button onClick={e => addEvent(e)} type="button">
                        Add
                    </button>
                    <button onClick={e => closeForm(e)} type='button'>
                        Close
                    </button>
                </div>
            </div>
            <div className='Events-List'>
                {eventsPerDay.map(evt => {
                    return (
                        <div className="Event">
                            <span className="Event-Delete" onClick={(e) => deleteEvent(e, evt)}> X </span> - {evt.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EventForm;