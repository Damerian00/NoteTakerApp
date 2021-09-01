const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific tip
  notes.get('/:tip_id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((tip) => tip.tip_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
      });
  });
  
  // DELETE Route for a specific tip
  notes.delete('/:tip_id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.tip_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  

  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, noteText} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        noteText,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note saved successfully 🚀`);
    } else {
      res.error('Error in saving note');
    }
  });




module.exports = notes;