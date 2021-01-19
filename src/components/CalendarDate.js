import React from 'react'
import './CalendarDate.css';

function CalendarDate({events, date, openForm, today, deleteEvent}) {
    return (
        <div 
            className={date && date.dateStr === today ? 'Date-Cell Today-Date-Cell' : date ? 'Date-Cell Active-Date-Cell' : 'Date-Cell Inactive-Date-Cell'} 
            onClick={() => openForm(date, events)}>
            <div className='CalendarDay'>{date ? date.day : '-'}</div>
            <div className={events.length && 'Events'}>
                {events.map(event => (
                    <div className="Event">
                        <span className="Event-Title"> {event.title} </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarDate