import React, { useState, useEffect } from 'react';

import './Calendar.css';
import CalendarDate from './CalendarDate';
import EventForm from './EventForm';

import { months, weekDays, weekRows, weekColumns } from './Constants.js';

const fakeEvents = [
    { date: "1/20/2021", title: "Do stuff" },
    { date: "1/25/2021", title: "Do some stuff" },
    { date: "1/29/2021", title: "Don't do stuff" },
    { date: "2/1/2021", title: "Do some stuff" }
];

function Calendar() {

    const [year, setYear] = useState(new Date().getFullYear());
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [monthName, setMonthName] = useState('');
    const [monthDays, setMonthDays] = useState([]);
    const [events, setEvents] = useState(fakeEvents);
    const [today, setToday] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        const todayArray = (today+"").split(" ");
        const mon = todayArray[1];
        let mIndex = -1;
        for(let i = 0; i < months.length; i++) {
            if(months[i].startsWith(mon)){
                mIndex = i + 1;
                break;
            }
        }        
        const todayStr = `${mIndex}/${todayArray[2]}/${todayArray[3]}`;
        setToday(todayStr);
    }

    const getCurrentMonthAndYear = () => {
        setMonthName(months[monthIndex]);
        getMonthDays(year, monthIndex);
    }

    const getMonthDays = (yearVal, monthIndexVal) => {

        const dt = new Date(yearVal, monthIndexVal);
        const dtArray = (dt + "").split(' ');
        const monthInitialDay = weekDays.indexOf(dtArray[0]);
        const maxDays = new Date(yearVal, monthIndexVal + 1, 0).getDate();

        let rowCounter = 0;
        let columnCounter = 0;
        const daysRslt = [];
        for (let i = 0, j = 1; i < 42; i++) {
            const key = `${rowCounter}${columnCounter}`;
            if (i < monthInitialDay || i > (monthInitialDay + maxDays) - 1) {
                daysRslt[key] = null;
            } else {
                daysRslt[key] = { day: j, dateStr: `${monthIndexVal + 1}/${j}/${year}` };
                j++;
            }
            if (columnCounter === 6) {
                rowCounter++;
                columnCounter = 0;
            } else {
                columnCounter++;
            }
        }
        setMonthDays(daysRslt);
    }

    const setInfo = (monthIndexVal, yearVal) => {
        setYear(yearVal);
        setMonthIndex(monthIndexVal);
        setMonthName(months[monthIndexVal]);
        getMonthDays(yearVal, monthIndexVal);
    }

    const getPreviousMonth = () => {
        let month = monthIndex - 1;
        let yr = year;
        if (monthIndex === 0) {
            month = 11;
            yr = year - 1;
        }
        setInfo(month, yr);
    }

    const getNextMonth = () => {
        let month = monthIndex + 1;
        let yr = year;
        if (monthIndex === 11) {
            month = 0;
            yr = year + 1;
        }
        setInfo(month, yr);
    }


    const [formStatus, setFormStatus] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventsPerDay, setEventsPerDay] = useState([]);

    const openForm = (selectedDate, events) => {
        setFormStatus(true);        
        setEventDate(selectedDate.dateStr);
        setEventsPerDay(events);
        console.log(events);
    }

    const closeForm = () => {
        console.log("close")
        setFormStatus(false);
        setEventTitle('');
        setEventDate('');
    }

    const addEvent = (e) => {
        e.preventDefault();
        console.log(eventDate, eventTitle);
        if (eventDate && eventTitle) {
            const e = [...events, { date: eventDate, title: eventTitle }];
            setEvents(e);
            closeForm();
        }
    }

    const deleteEvent = (e, delEvent) => {
        const filteredEvents = fakeEvents.filter(ev => ev.dateStr !== delEvent.date && ev.title !== delEvent.title);
        const filteredEventsPerDay = eventsPerDay.filter(ev => ev.dateStr !== delEvent.date && ev.title !== delEvent.title);
        setEvents(filteredEvents);
        setEventsPerDay(filteredEventsPerDay);
    }


    useEffect(() => {
        getCurrentMonthAndYear();
        getTodayDate();
    }, []);

    return (
        <div className='Calendar'>
            <div className='Header'>
                <div className='Header-Month-Name'>{monthName} {year}</div>
                <div className='Header-Navigation'>
                    <span onClick={getPreviousMonth}> Previous </span>
                    <span onClick={getNextMonth}> Next </span>
                </div>
            </div>
            {weekRows.map(week => {
                return (
                    <div key={week}>
                        {weekColumns.map(day => {
                            const k = `${week}${day}`;
                            const e = events.filter(event => monthDays[k] && event.date === monthDays[k].dateStr);
                            return <CalendarDate key={k} date={monthDays[k]} events={e} openForm={openForm} today={today} />
                        })}
                    </div>
                );
            })}
            <div className={formStatus ? 'Display-Form' : 'Hide-Form'} >
                <div className='Form-Control'>
                    <EventForm 
                        eventDate={eventDate} 
                        eventTitle={eventTitle} 
                        setEventTitle={setEventTitle} 
                        addEvent={addEvent} 
                        closeForm={closeForm}
                        deleteEvent={deleteEvent} 
                        eventsPerDay={eventsPerDay} />
                </div>
            </div>
        </div>
    )
}

export default Calendar;