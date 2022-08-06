import React from 'react';
import SignedOutHeader from '../components/SignedOutHeader';

const Landing = () => {
    return (
        <div>
            <SignedOutHeader />
            <h1>Welcome to Issue Tracker</h1>
        </div>
    );
};

export default Landing;