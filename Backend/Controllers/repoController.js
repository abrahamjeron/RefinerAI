const axios = require('axios');
const atob = require('atob');

// Helper function to fetch contents recursively
const fetchContents = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Node.js Server' },
        });
        const contents = response.data;
        const allFiles = [];

        for (const item of contents) {
            if (item.type === 'file') {
                allFiles.push(item);
            } else if (item.type === 'dir') {
                const subDirContents = await fetchContents(item.url);
                allFiles.push({
                    ...item,
                    contents: subDirContents,
                });
            }
        }
        return allFiles;
    } catch (error) {
        console.error('Error fetching contents:', error.message);
        throw new Error('Error fetching repository contents');
    }
};

// Controller to fetch repository contents
exports.getRepoContents = async (req, res) => {
    const owner = 'abrahamjeron';
    const repo = 'RefinerAi'

    if (!owner || !repo) {
        return res.status(400).json({ error: 'Owner and repo are required' });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents`;

    try {
        const allFiles = await fetchContents(url);
        res.json(allFiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to fetch file content
exports.getFileContent = async (req, res) => {
    // const { owner, repo, filePath } = req.query;
    const owner = 'abrahamjeron';
    const repo = 'RefinerAI';
    const filePath = 'client/src/App.css'

    if (!owner || !repo || !filePath) {
        return res.status(400).json({ error: 'Owner, repo, and filePath are required' });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Node.js Server' },
        });
        const decodedContent = atob(response.data.content);
        res.json({ content: decodedContent });
    } catch (error) {
        console.error('Error fetching file content:', error.message);
        res.status(500).json({ error: 'Error fetching file content' });
    }
};
