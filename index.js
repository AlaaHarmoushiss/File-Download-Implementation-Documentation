const express = require('express');
const app = express();
const documentsRoutes = require('./routes/documentsRoutes');

// Middleware for serving static files
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api', documentsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
