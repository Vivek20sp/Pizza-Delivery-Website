import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import AuthonicationProvider from './Context/AuthonicationProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthonicationProvider><App /></AuthonicationProvider>);