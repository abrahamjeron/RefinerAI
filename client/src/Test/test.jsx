import React, { useState } from 'react';
import axios from 'axios';

const fetchContents = async (url, setFiles, setError) => {
    try {
        const response = await axios.get(url);
        const contents = response.data;
        const allFiles = [];

        for (const item of contents) {
            if (item.type === 'file') {
                allFiles.push(item);
            } else if (item.type === 'dir') {
                const subDirContents = await fetchContents(item.url, setFiles, setError);
                allFiles.push({
                    ...item,
                    contents: subDirContents,
                });
            }
        }

        return allFiles;
    } catch (error) {
        setError('Error fetching repository contents');
        console.error('Error fetching contents:', error);
        return [];
    }
};

const RepoViewer = () => {
    const [repoUrl, setRepoUrl] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchRepo = async () => {
        setError(null);
        const [owner, repo] = extractOwnerAndRepo(repoUrl);

        if (!owner || !repo) {
            setError('Invalid repository URL');
            return;
        }

        const url = `https://api.github.com/repos/${owner}/${repo}/contents`;

        // Fetch all contents recursively
        const allFiles = await fetchContents(url, setFiles, setError);
        setFiles(allFiles);
    };

    const extractOwnerAndRepo = (url) => {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        return match ? [match[1], match[2]] : [null, null];
    };

    return (
        <div>
            <h1>GitHub Repository Viewer</h1>
            <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Enter GitHub repo URL"
            />
            <button onClick={handleFetchRepo}>Fetch Repo</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div>
                {files.map((file) => (
                    <FileViewer key={file.path} file={file} repoUrl={repoUrl} />
                ))}
            </div>
        </div>
    );
};

const FileViewer = ({ file, repoUrl }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchFileContent = async () => {
        setLoading(true);
        const [owner, repo] = extractOwnerAndRepo(repoUrl);

        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`);
            const decodedContent = atob(response.data.content); // Decode Base64
            setContent(decodedContent);
        } catch (err) {
            console.error('Error fetching file content:', err);
        } finally {
            setLoading(false);
        }
    };

    const extractOwnerAndRepo = (url) => {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        return match ? [match[1], match[2]] : [null, null];
    };

    return (
        <div>
            <div>
                <strong>{file.name}</strong>
                <button onClick={fetchFileContent} disabled={loading}>
                    {loading ? 'Loading...' : 'Show Content'}
                </button>
            </div>
            {content && (
                <div style={{ marginTop: '10px' }}>
                    <h3>Content of {file.name}</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
                </div>
            )}
            {file.contents && file.contents.map((subFile) => (
                <FileViewer key={subFile.path} file={subFile} repoUrl={repoUrl} />
            ))}
        </div>
    );
};

export default RepoViewer;
