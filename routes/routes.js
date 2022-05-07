const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {


        app.get('/api/notes', function(req, res) {
            
            fs.readFile('db/db.json', 'utf8', (err, data) => {

                if (err) throw err;
                var notes = JSON.parse(data);
                res.json(notes);
            });
        });

        // app.post('/api/notes', function(req,res) {
        //     let newNote = req.body;
        //     notes.push(newNote);
        //     updateDb();
        //     return console.log('Added new note');
        // });

        // POST request to add a review
        app.post('/api/notes', (req, res) => {
            // Log that a POST request was received
            console.info(`${req.method} request received to add a review`);
  
            // Destructuring assignment for the items in req.body
            const { title, text } = req.body;
  
            // If all the required properties are present
            if (title && text) {
                // Variable for the object we will save
                const newNote = {
                    title,
                    text,
                    note_id: uuidv4(),
                };
  
                // Obtain existing reviews
                fs.readFile('./db/db.json', 'utf8', (err, data) => {
                    if (err) {
                    console.error(err);
                    } else {
                        // Convert string into JSON object
                        const parsedNotes = JSON.parse(data);
        
                        // Add a new review
                        parsedNotes.push(newNote);
        
                        // Write updated reviews back to the file
                        fs.writeFile(
                            './db/db.json',
                            JSON.stringify(parsedNotes, null, 4),
                            (writeErr) =>
                            writeErr
                                ? console.error(writeErr)
                                : console.info('Successfully updated notes!')
                        );
                    }
                });
                const response = {
                 status: 'success',
                 body: newNote,
                };
                res.json(response)
            }
        })




        app.get('/api/notes/:id', function(req,res) {
            res.json(notes[req.params.id]);
        });





        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });


        app.get('/', function(req,res) {
            res.sendFile(path.join(__dirname, "./public/index.html"));
        });

        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err) throw err; 
                return true;
            });
        }
}