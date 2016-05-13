var {app, BrowserWindow} = require("electron");

var mainWindow;
app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 500
	}).on("closed", () => mainWindow = null);

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
}).on("window-all-closed", app.quit);