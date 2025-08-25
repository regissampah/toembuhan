import React, { useState, useEffect } from 'react';
import { generatePlantImage } from '../services/geminiService';

interface RelatedPlantCardProps {
    plantName: string;
    onClick: () => void;
}

const RelatedPlantCard: React.FC<RelatedPlantCardProps> = ({ plantName, onClick }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchImage = async () => {
            setIsLoading(true);
            try {
                const base64Image = await generatePlantImage(plantName);
                if (isMounted) {
                    setImageUrl(`data:image/jpeg;base64,${base64Image}`);
                }
            } catch (error) {
                console.error(`Failed to generate image for ${plantName}:`, error);
                // Optionally set a fallback image URL here
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [plantName]);

    return (
        <div 
            onClick={onClick} 
            className="flex-shrink-0 w-36 cursor-pointer group transform transition-transform duration-300 hover:-translate-y-2"
        >
            <div className="relative w-36 h-36 rounded-xl shadow-lg bg-slate-200 dark:bg-slate-700 overflow-hidden">
                {isLoading ? (
                    <div className="w-full h-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                ) : (
                    <img 
                        src={imageUrl || 'https://via.placeholder.com/150'} 
                        alt={plantName} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                )}
            </div>
            <p className="mt-2 text-sm font-semibold text-center text-slate-700 dark:text-slate-200 truncate group-hover:text-brand-green dark:group-hover:text-brand-green">
                {plantName}
            </p>
        </div>
    );
};

export default RelatedPlantCard;