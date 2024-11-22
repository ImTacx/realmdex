// src/renderer/components/ServerList.jsx
import React, { useEffect, useState } from 'react';
import { useTheme, themes } from './Themes';
import { useGameData } from '../hooks/useGameData';
import { useNotifications, NotificationType } from './Notifications';
import { useDownloadsManager } from '../hooks/useDownloadsManager';
import { Download, ChevronRight, Plus, MessageSquare } from 'lucide-react';
import { useGameLauncher } from '../hooks/useGameLauncher';
import { AddServerCard } from './ServerList/AddServer';
import { LoadingState } from './ServerList/LoadingState';
import { ServerCard } from './ServerList/ServerCard';

const ServerList = ({ setActiveTab }) => {
    const { currentTheme } = useTheme();
    const { games, isLoading } = useGameData();
    const { isGameDownloaded, isReady } = useDownloadsManager();

    if (isLoading) 
        return <LoadingState />;
    
    const downloadedGames = games.filter(game => isGameDownloaded(game.id));

    return (
        <div className={`flex-1 ${themes[currentTheme].bg} p-4 custom-scrollbar`}>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {downloadedGames.map((game) => ( <ServerCard key={game.id} game={game}/> ))}
                <AddServerCard onOpenDownloads={() => setActiveTab('downloads')} />
            </div>
        </div>
    );
};

export default ServerList;