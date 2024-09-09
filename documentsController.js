const path = require('path');
const fs = require('fs');
const { executeQuery, TYPES } = require('../api/executeQuery');

/**
 * Downloads the document by file_url.
 */
exports.downloadDocument = async (req, res) => {
    const { documentId } = req.params;

    try {
        // Fetch the document details from the database
        const query = 'SELECT file_url, mime_type FROM Documents WHERE id = @documentId';
        const parameters = [{ name: 'documentId', type: TYPES.Int, value: documentId }];
        const result = await executeQuery(query, parameters);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const { file_url, mime_type } = result[0];
        
        // Construct the file path (ensure it's properly mapped on your server)
        const filePath = path.resolve(__dirname, '../uploads', file_url);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Send the file for download or viewing based on the mime type
        res.setHeader('Content-Type', mime_type);
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(file_url)}"`);
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        console.error('Error downloading document:', err);
        res.status(500).json({ error: 'Error downloading document' });
    }
};
