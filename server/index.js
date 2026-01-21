const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: "*", // Allow all origins for Vercel
    credentials: true
}));
app.use(express.json());

// Mount Routes
app.use('/api/tests', require('./routes/testRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- CHANGE IS HERE ---
// Only listen if running locally. Vercel handles this automatically.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;