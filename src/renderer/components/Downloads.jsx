// src/renderer/components/Downloads.jsx
import React from 'react';
import { User } from 'lucide-react';
import { DownloadCard } from './Download/DownloadCard';
import { useTheme, themes } from './Themes';
import { useGameData } from '../hooks/useGameData';
import { shell } from 'electron';
const path = require('path');

const Downloads = () => {
    const { currentTheme } = useTheme();
    const { games, isLoading } = useGameData();

    const handleServerRedirect = () => {
        shell.openExternal('https://github.com/kevinbudz/realmdex'); // Opens URL in the external browser
    };

    if (isLoading) {
        return (
            <div className={`flex-1 ${themes[currentTheme].bg} p-4 flex items-center justify-center custom-scrollbar`}>
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className={`${themes[currentTheme].text}`}>Loading available games...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex-1 ${themes[currentTheme].bg} p-8 overflow-auto custom-scrollbar`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((game) => ( <DownloadCard key={game.id} game={game} /> ))}
                    <div
                        className={`relative group rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl ${themes[currentTheme].card}`}
                        onClick={handleServerRedirect}
                    >
                        <div className="relative w-full pt-[56.25%] ${themes[currentTheme].card} flex items-center justify-center">
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <User size={30} className={themes[currentTheme].text} />
                                <div className="text-center">
                                    <h3 className={`${themes[currentTheme].textSecondary}`}>Wanna add your server?</h3>
                                    <p className={`${themes[currentTheme].textSecondary}`}>Click here!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Downloads;