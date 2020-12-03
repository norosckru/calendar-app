//import moment from 'moment';
import { types } from '../types/types';

/*
{
        id: d4s5da6s4d65465d,
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //como ahcer un newDate en js
        end: moment().add(2, 'hours').toDate(),
        notes: 'Comprar el Pastel',
        user: {
            _id: '123',
            name: 'Norberto'
        }
    }
*/

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return{
                ...state,
                events:[
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }


        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            };

        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            };

        case types.eventLoaded:
            return{
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            return{
                ...initialState
            }


        default:
            return state;
    }

}