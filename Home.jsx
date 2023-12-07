import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        // Redirect to the "login" page
        navigate('/login');
    };

    return (
        <div className='wholeThing'>
            <h1>Home</h1>
            <button className='funButton' onClick={handleLoginRedirect}>Go to Login</button>
        </div>
    );
}

export default Home;
