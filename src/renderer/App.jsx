// src/renderer/App.jsx
import React, { useState } from 'react';
import { ThemeProvider, useTheme, themes } from './components/Themes';
import Sidebar from './components/Sidebar';
import ScreenLivery from './components/ScreenLivery';
import ServerList from './components/ServerList';
import Downloads from './components/Downloads';
import Settings from './components/Settings';
import { NotificationProvider } from './components/Notifications';

const AppContent = () => {
    const [activeTab, setActiveTab] = useState('servers');
    const { currentTheme } = useTheme();

    return (
        <>
          <ScreenLivery />
          <div className={`flex h-screen ${themes[currentTheme].bg}`}>
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              {activeTab === 'servers' && <ServerList setActiveTab={setActiveTab} />}
              {activeTab === 'downloads' && <Downloads />}
              {activeTab === 'settings' && <Settings />}
          </div>
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <AppContent />
            </NotificationProvider>
        </ThemeProvider>
    );
};

export default App;