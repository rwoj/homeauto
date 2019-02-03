import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND } from '@giantmachines/redux-websocket'

export const wsConnect = () => (
    {
        type: WEBSOCKET_CONNECT, 
        payload: {
            url: 'ws://192.168.0.209:8080'
        }
    })

export const wsDisconnect = () => ( 
    {
        type: WEBSOCKET_DISCONNECT,
    })    

export const wsSend = (payload) => (
    {
        type: WEBSOCKET_SEND,
        payload
    })