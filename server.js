const express = require('express');
const mongoose = require('mongoose');

const app = express(); 
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(epxress.urlencoded({exnteded: true}));
app.use(express.static('public'));
app.use(require('/'))
