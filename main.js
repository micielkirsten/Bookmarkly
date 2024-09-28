const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookmarkly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// 2. Mongoose Schema for bookmarks
const bookmarkSchema = new mongoose.Schema({
    title: String,
    url: String,
    tags: [String],   
    highlight: String, 
    citation: String,  
    createdAt: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Bookmarkly',
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindow.webContents.openDevTools();

    const startUrl = url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

// 3. Handle IPC calls from the renderer
ipcMain.handle('get-bookmarks', async () => {
    try {
        const bookmarks = await Bookmark.find();
        return bookmarks; 
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        throw error;
    }
});

// 4. Handle adding a bookmark
ipcMain.handle('add-bookmark', async (event, bookmarkData) => {
    try {
        const newBookmark = new Bookmark(bookmarkData);
        await newBookmark.save();
        return newBookmark; 
    } catch (error) {
        console.error('Error saving bookmark:', error);
        throw error;
    }
});
