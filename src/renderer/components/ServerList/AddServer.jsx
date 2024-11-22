//@ts-check
import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme, themes } from '../Themes';

export const AddServerCard = ({ onOpenDownloads }) => {
    const { currentTheme } = useTheme();
    return (
        <>
            <div onClick={onOpenDownloads}
                className={`${themes[currentTheme].card} rounded-lg shadow overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${themes[currentTheme].cardHover}`}>
                <div className={`relative w-full pt-[56.25%] ${themes[currentTheme].card} flex items-center justify-center`}>
                    <div className={`absolute inset-0 flex flex-col items-center justify-center ${themes[currentTheme].textSecondary}`}>
                        <Plus size={48} className={`${themes[currentTheme].button.replace('bg-', 'text-')}`} />
                        <span className={`${themes[currentTheme].text}`}>Browse Games</span>
                    </div>
                </div>
            </div>
        </>
        
    );
};