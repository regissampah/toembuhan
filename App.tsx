import React, { useState, useCallback } from 'react';
import { identifyPlant, getPlantDetailsByName, generatePlantImage } from './services/geminiService';
import { AppState, PlantData } from './types';
import LandingScreen from './components/LandingScreen';
import ImageInput from './components/ImageInput';
import ResultDisplay from './components/ResultDisplay';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import HeaderControls from './components/HeaderControls';
import { useSettings } from './contexts/SettingsContext';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { language, t } = useSettings();

  const handleImageSubmit = useCallback(async (imageDataUrl: string) => {
    setAppState(AppState.LOADING);
    setImagePreview(imageDataUrl);
    setError(null);
    setPlantData(null);

    try {
      const base64Data = imageDataUrl.split(',')[1];
      if (!base64Data) {
        throw new Error('Invalid image data URL.');
      }
      const result = await identifyPlant(base64Data, language);
      
      if (result.isPlantIdentified) {
        setPlantData(result);
        setAppState(AppState.RESULT);
      } else {
        setError(t('identificationError'));
        setAppState(AppState.ERROR);
      }
    } catch (err) {
      console.error('Identification failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`${t('analysisError')} ${errorMessage}. ${t('tryAgainError')}`);
      setAppState(AppState.ERROR);
    }
  }, [language, t]);

  const handleRelatedPlantClick = useCallback(async (plantName: string) => {
    setAppState(AppState.LOADING);
    // Use a placeholder image or the current one while loading
    // For this implementation, we will show a generic loading screen without a preview
    setImagePreview(null); 
    setError(null);
    setPlantData(null);

    try {
      // Fetch details and image in parallel
      const detailsPromise = getPlantDetailsByName(plantName, language);
      const imagePromise = generatePlantImage(plantName);

      const [detailsResult, imageResult] = await Promise.all([detailsPromise, imagePromise]);
      
      if (detailsResult.isPlantIdentified) {
        setPlantData(detailsResult);
        setImagePreview(`data:image/jpeg;base64,${imageResult}`);
        setAppState(AppState.RESULT);
      } else {
        setError(t('identificationError'));
        setAppState(AppState.ERROR);
      }
    } catch (err) {
      console.error('Failed to fetch related plant details:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`${t('analysisError')} ${errorMessage}. ${t('tryAgainError')}`);
      setAppState(AppState.ERROR);
    }
  }, [language, t]);


  const handleReset = useCallback(() => {
    setAppState(AppState.INPUT);
    setPlantData(null);
    setError(null);
    setImagePreview(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.INPUT:
        return <ImageInput onSubmit={handleImageSubmit} onBack={() => setAppState(AppState.LANDING)} />;
      case AppState.LOADING:
        return <LoadingScreen imagePreview={imagePreview} />;
      case AppState.RESULT:
        return <ResultDisplay 
                  plantData={plantData!} 
                  imagePreview={imagePreview!} 
                  onReset={handleReset}
                  onRelatedPlantClick={handleRelatedPlantClick}
                />;
      case AppState.ERROR:
        return <ErrorScreen message={error!} onReset={handleReset} />;
      case AppState.LANDING:
      default:
        return <LandingScreen onStart={() => setAppState(AppState.INPUT)} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 transition-colors duration-300">
      <main className="w-full max-w-md mx-auto">
        <HeaderControls />
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden">
            {renderContent()}
        </div>
        <footer className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400 space-y-1">
            <p>Crafted by sandbox.atmax.id using Gemini Ai.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;