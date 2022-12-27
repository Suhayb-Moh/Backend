const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find().lean();
    if (!notes?.length) {
      return res.status(400).json({ message: "No Notes Found" });
    }
    res.json(notes);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// @desc Create new Note
// @route POST /notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
  try {
    const { username, title, text, completed } = req.body;

    // Confirm data
    if (!username || !title || !text || typeof completed !== "boolean") {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const noteObject = { username, title, text, completed };

    // Create and store new note
    const note = await Note.create(noteObject);

    if (note) {
      res.status(201).json({ message: "Note has been created" });
    } else {
      res.status(400).json({ message: "Invalid Data Received" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = {
  getAllNotes,
  createNewNote,
};
