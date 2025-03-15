// netlify/functions/server.js
exports.handler = async (event, context) => {
  // Just return a success for any API request
  // Since our game uses in-memory storage and doesn't require 
  // persistent backend functionality for core gameplay
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Success",
      data: {
        highScores: [] // Empty as we're using in-memory storage
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};