import React, { useEffect, useState } from 'react';

import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

/*evento hardcoreado
const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //como ahcer un newDate en js
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el Pastel',
    user: {
        _id: '123',
        name: 'Norberto'
    }
}]*/

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    //todo: leer del store, los eventos
    const {events, activeEvent} = useSelector(state => state.calendar)

    //leer uid de user
    const {uid} = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
       
        dispatch(eventStartLoading())

    }, [dispatch])

    //eventos
    const onDoubleClick = (e) => {
        //console.log('onDoubleClick', e)
        dispatch( uiOpenModal() )  
    }

    const onSelectEvent = (e) => {
        //console.log('onSelectEvent',e)
        dispatch(eventSetActive(e))
        
    }

    const onViewChange = (e) => {
        //console.log('onViewChange',e)
        setLastView(e)
        localStorage.setItem('lastView', e)
    }


    const onSelectSlot = (e) => {
        //console.log(e)
        dispatch( eventClearActiveEvent() )
    }

    //se sispara con ciertos argumentos son disparados en el calendario    
    const eventStyleGetter = (event, start, end, isSelected) => {
        //console.log(event, start, end, isSelected)

        //console.log(event)

    const style = {
        backgroundColor: ( uid === event.user._id) ? '#367CF7' : '#465660',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
    }

        return {
            style
        }
    };


    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

                <AddNewFab/>

                {
                    (activeEvent) && <DeleteEventFab />
                }
                
                <CalendarModal />

        </div>
    )
}
