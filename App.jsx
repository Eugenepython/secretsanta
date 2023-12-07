// App.jsx
import React from 'react';
import { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Yourpage from './Yourpage';
import Secretsanta from './Secretsanta';
import CreateEmails from './CreateEmails';
import Groups from './Groups';

import { EmailsLoadedProvider } from './EmailsLoadedContext';





const App = () => {




    return (
        <Router>
            <div>
                <EmailsLoadedProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/yourpage" element={<Yourpage />} />
                        <Route path="/secretsanta" element={<Secretsanta />} />
                        <Route path="/createemails" element={<CreateEmails />} />
                        <Route path="/groups" element={<Groups />} />


                    </Routes>
                </EmailsLoadedProvider>
            </div>
        </Router>
    );
};

export default App;

