const express = require('express');
const { getRepoContents, getFileContent } = require('../Controllers/repoController');

const router = express.Router();

// Route to fetch repository contents
router.get('/contents', getRepoContents);

// Route to fetch file content
router.get('/file', getFileContent);

module.exports = router;
