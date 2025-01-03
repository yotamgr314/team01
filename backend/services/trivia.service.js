// File: backend/services/trivia.service.js
const http = require('http');
const https = require('https');

// Fetch 10 random questions from Open Trivia API
const fetchTriviaQuestions = (category, difficulty) => {
    return new Promise((resolve, reject) => {
        const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
        https.get(url, (res) => {
            let data = '';

            // A chunk of data has been received.
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            res.on('end', () => {
                const parsedData = JSON.parse(data);
                if (parsedData.response_code !== 0) {
                    reject(new Error('Failed to fetch trivia questions'));
                } else {
                    resolve(parsedData.results);
                }
            });
        }).on('error', (err) => {
            reject(new Error('Unable to retrieve trivia questions: ' + err.message));
        });
    });
};

module.exports = { fetchTriviaQuestions };

//---------------------------------------------------------------
