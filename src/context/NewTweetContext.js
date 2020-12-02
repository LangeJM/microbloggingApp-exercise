import React from 'react';

export const NewTweetContext = React.createContext({
    newTweet: {
        date: '',
        content: '',
        key: '',
        username: '',
    },
    setNewTweet: (newTweet) => {}
});


