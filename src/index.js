import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-block-ui/style.css';


axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://demo-drillholes-backend.herokuapp.com/v1/' : 'http://localhost:5000/v1';
const baseURL = process.env.PUBLIC_URL || '';

ReactDOM.render(
    <Router basename={baseURL}>
        <App />
    </Router>,
    document.getElementById('root')
);
