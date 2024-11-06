import { app, BrowserWindow, screen, ipcMain, BrowserView } from 'electron';
import path from 'path';

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: screen.getPrimaryDisplay().bounds.width,
        height: screen.getPrimaryDisplay().bounds.height,
        frame: false,
        title: 'Sketchlie',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, '../../public/logos/logo-white-bg.png')
    });

    // Create navbar view
    const navView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.setBrowserView(navView);
    
    // Set navbar bounds
    const navHeight = 28;
    navView.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: navHeight });
    navView.setAutoResize({ width: true });
    navView.webContents.loadFile(path.join(__dirname, 'navbar.html'));

    // Hide scrollbars in navbar
    navView.webContents.on('did-finish-load', () => {
        navView.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
    });

    // Create content view
    const contentView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.addBrowserView(contentView);
    contentView.setBounds({ 
        x: 0, 
        y: navHeight, 
        width: mainWindow.getBounds().width, 
        height: mainWindow.getBounds().height - navHeight 
    });
    contentView.setAutoResize({ width: true, height: true });
    contentView.webContents.loadURL('https://www.sketchlie.com/dashboard/');

    // Prevent navigation to any pages except dashboard and board
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const allowedPaths = ['/dashboard', '/board'];
        const urlPath = new URL(url).pathname;
        
        if (!allowedPaths.some(path => urlPath.startsWith(path))) {
        event.preventDefault();
        }
    });

    // Hide scrollbars in content
    contentView.webContents.on('did-finish-load', () => {
        contentView.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
    });

    // Handle window resize
    mainWindow.on('resize', () => {
        const bounds = mainWindow.getBounds();
        navView.setBounds({ 
            x: 0, 
            y: 0, 
            width: bounds.width, 
            height: navHeight 
        });
        contentView.setBounds({ 
            x: 0, 
            y: navHeight, 
            width: bounds.width, 
            height: bounds.height - navHeight 
        });
    });

    // Window control handlers
    ipcMain.on('minimize', () => mainWindow.minimize());
    ipcMain.on('maximize', () => {
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
    });
    ipcMain.on('close', () => mainWindow.close());

    mainWindow.on('maximize', () => {
        const bounds = screen.getPrimaryDisplay().workArea;
        navView.setBounds({ 
            x: 0, 
            y: 0, 
            width: bounds.width, 
            height: navHeight 
        });
        contentView.setBounds({ 
            x: 0, 
            y: navHeight, 
            width: bounds.width, 
            height: bounds.height - navHeight 
        });
    });

    mainWindow.on('unmaximize', () => {
        const bounds = mainWindow.getBounds();
        navView.setBounds({ 
            x: 0, 
            y: 0, 
            width: bounds.width, 
            height: navHeight 
        });
        contentView.setBounds({ 
            x: 0, 
            y: navHeight, 
            width: bounds.width, 
            height: bounds.height - navHeight 
        });
    });

    // Add after contentView creation
    contentView.webContents.on('page-title-updated', (event, title) => {
        mainWindow.setTitle(title);
        // Update navbar title
        navView.webContents.executeJavaScript(`
            document.querySelector('.title').textContent = '${title}';
        `);
    });
}

app.whenReady().then(createWindow);

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