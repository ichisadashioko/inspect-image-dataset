const electron = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new electron.BrowserWindow({
        width: 640,
        height: 480,
    })

    mainWindow.loadFile(path.join(__dirname, 'index.htm'))
}

electron.app.whenReady().then(function () {
    createWindow()

    electron.app.on('activate', function () {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron.app.quit()
    }
})
