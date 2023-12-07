
//EmailsLoadedContext.jsx
import React from 'react';
import { createContext, useContext, useState } from 'react';

const EmailsLoadedContext = createContext();

export const EmailsLoadedProvider = ({ children }) => {
    const [emailsLoaded, setEmailsLoaded] = useState(false);
    const [theUser, setTheUser] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [emails, setEmails] = useState([]);

    return (
        <EmailsLoadedContext.Provider value={{
            emailsLoaded, setEmailsLoaded, theUser, setTheUser, groupName, setGroupName,
            emails, setEmails
        }}>
            {children}
        </EmailsLoadedContext.Provider>
    );
};

export const useEmailsLoaded = () => {
    const context = useContext(EmailsLoadedContext);
    if (!context) {
        throw new Error('useEmailsLoaded must be used within an EmailsLoadedProvider');
    }
    return context;
};
