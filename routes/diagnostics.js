const diagnostics = require('express').Router();
const { fstat } = require('fs');
const { v4: uuidv4 } = require('uuid');
const { moveMessagePortToContext } = require('worker_threads');
const { router } = require('.');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);
  const { isValid, errors } = req.body;

  const newDiagnostic = {
      time: Date.now(),
      error_id: uuidv4(),
      errors,
    };

    if (!isValid){
      readAndAppend(newDiagnostic, './db/diagnostics.json');
      res.json('Diagnostic logged. 🐱‍🏍');

    } else {
      res.error({
        message: "Diagnostic error. 💢",
        error_id: newDiagnostic.error_id
      })
    }
});

module.exports = diagnostics;
