import app from './app.js';
import { connectDB } from './db.js';

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 