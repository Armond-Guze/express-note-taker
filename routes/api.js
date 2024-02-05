const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  readFileAsync("./db/db.json", "utf8")
    .then((notes) => {
      let cleanNotes;
      try {
        cleanNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        cleanNotes = [];
      }
      return res.json(cleanNotes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/notes", (req, res) => {
  readFileAsync("./db/db.json", "utf8")
    .then((notes) => {
      let cleanNotes;
      try {
        cleanNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        cleanNotes = [];
      }
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      cleanNotes.push(newNote);
      writeFileAsync("./db/db.json", JSON.stringify(cleanNotes))
        .then(() => {
          res.status(200).json({ ok: true });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// extra credit delete route
router.delete("/notes/:id", (req, res) => {
  readFileAsync("./db/db.json", "utf8")
    .then((notes) => {
      let cleanNotes;
      try {
        cleanNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        cleanNotes = [];
      }
      const filteredNotes = cleanNotes.filter((note) => {
        note.id !== req.params.id;
      });
      writeFileAsync("./db/db.json", JSON.stringify(filteredNotes))
        .then(() => {
          res.status(200).json({ ok: true });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
