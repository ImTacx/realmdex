//@ts-check
import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme, themes } from '../Themes';

export const LoadingState = () => {
    const { currentTheme } = useTheme();
    return (
        <div className={`flex-1 ${themes[currentTheme].bg} p-4 flex items-center justify-center`}>
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className={`${themes[currentTheme].text}`}>Loading games...</p>
            </div>
        </div>
    );
};