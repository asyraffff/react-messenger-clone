import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './Message.css';

// props.text
const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;
    return (
        // all the user will use the message component
        // but, if it is admin itself(person who login) , he/she will use 'message__user' component
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <span className="message__username">{!isUser && `${message.username || 'Unknown User'}`}</span>
                    <Typography
                        className="message__userMessage"
                        variant="h5"
                        component="h2"
                    >
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
