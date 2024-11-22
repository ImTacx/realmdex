// src/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const cors = require('cors');
const { join } = require('node:path');

require('@electron/remote/main').initialize();
const server = express();

function startServer() {
    const publicPath = join(__dirname, '../dist');

    server.use(express.json());
    server.use(express.static(publicPath));
    server.listen(3000, 'localhost', () => {
        console.log(`Server is running on http://localhost:3000`);
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            enableRemoteModule: true
        },
        icon: join(__dirname, './renderer/assets/logo.ico'),
    });

    require('@electron/remote/main').enable(win.webContents);

    // Set CSP headers
    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': undefined
            }
        });
    });
    win.loadURL('http://localhost:3000');
    // Open Debug View
    //win.webContents.openDevTools();
}

app.whenReady().then(() => {
    const serverInstance = startServer();
    createWindow();
    
    app.on('will-quit', () => {
        if (serverInstance) {
            serverInstance.close(() => {
                console.log('Server closed.');
            });
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

