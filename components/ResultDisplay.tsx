import React, { useState, useMemo } from 'react';
import { PlantData } from '../types';
import { 
    SunIcon, WaterDropIcon, SoilIcon, RefreshIcon, TemperatureIcon, CalendarIcon, SeedlingIcon, 
    BugIcon, PawIcon, PlantsIcon, AlertTriangleIcon, ChevronDownIcon, LeafIcon, QuoteIcon,
    HeartPulseIcon, SparklesIcon, ShieldCheckIcon, BookOpenIcon, BanIcon, BackArrowIcon
} from './IconComponents';
import { useSettings } from '../contexts/SettingsContext';
import RelatedPlantCard from './RelatedPlantCard';

interface ResultDisplayProps {
    plantData: PlantData;
    imagePreview: string;
    onReset: () => void;
    onRelatedPlantClick: (plantName: string) => void;
}

const CareGuideCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
        <div className="text-brand-green dark:text-brand-gray mb-2">{icon}</div>
        <div>
            <h4 className="font-semibold text-slate-500 dark:text-slate-400 text-sm mb-1">{title}</h4>
            <p className="font-bold text-slate-800 dark:text-slate-100 text-base">{text}</p>
        </div>
    </div>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
        <button onClick={onToggle} className="w-full flex justify-between items-center py-4 text-left font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span>{title}</span>
            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="pb-4 pt-0 text-sm text-slate-600 dark:text-slate-300">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const MonthGrid: React.FC<{ floweringMonths: string[] }> = ({ floweringMonths }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const activeMonths = floweringMonths.map(m => m.slice(0, 3).toLowerCase());

    const monthTranslations: { [key: string]: string } = {
        jan: "jan", feb: "feb", mar: "mar", apr: "apr", may: "mei", jun: "jun", jul: "jul", aug: "agu", sep: "sep", oct: "okt", nov: "nov", dec: "des"
    };

    return (
        <div className="grid grid-cols-6 gap-2 text-center">
            {months.map(month => {
                const monthKey = month.toLowerCase();
                const isActive = activeMonths.some(activeMonth => monthTranslations[activeMonth] === monthKey);
                
                return (
                    <div key={month} className={`p-2 rounded-md text-xs font-semibold ${isActive ? 'bg-brand-green text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'}`}>
                        {month}
                    </div>
                );
            })}
        </div>
    );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ plantData, imagePreview, onReset, onRelatedPlantClick }) => {
    const { t, language } = useSettings();
    const { 
        commonName, scientificName, description, careInstructions, interestingFact,
        category, careLevel, matchConfidence, timeline, propagation,
        commonPests, companionPlants, toxicity, relatedPlants, healthAndBenefits
    } = plantData;

    const [openPest, setOpenPest] = useState<string | null>(commonPests?.[0]?.name ?? null);
    const [activeTab, setActiveTab] = useState<'care' | 'health'>('care');


    const getCareLevelBadge = () => {
        const baseClasses = "font-bold py-1 px-3 rounded-full text-xs transition-colors";
        if (careLevel === 'Easy') return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`;
        if (careLevel === 'Medium') return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300`;
        if (careLevel === 'Hard') return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300`;
        return `${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200`;
    };
    
    const translatedMonths = useMemo(() => {
        if (language === 'id') {
            const monthMap: { [key: string]: string } = {
                "January": "Januari", "February": "Februari", "March": "Maret", "April": "April",
                "May": "Mei", "June": "Juni", "July": "Juli", "August": "Agustus",
                "September": "September", "October": "Oktober", "November": "November", "December": "Desember"
            };
            return timeline.floweringSeason.map(month => monthMap[month] || month);
        }
        return timeline.floweringSeason;
    }, [timeline.floweringSeason, language]);

    return (
        <div className="animate-fade-in">
            <div className="relative">
                <img src={imagePreview} alt={commonName} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button onClick={onReset} className="absolute top-4 left-4 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 backdrop-blur-sm p-2.5 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                 <div className="absolute bottom-0 left-0 text-white p-6">
                    <h1 className="font-serif text-4xl font-bold drop-shadow-lg">{commonName}</h1>
                    <p className="text-slate-200 italic drop-shadow-md">{scientificName}</p>
                </div>
            </div>
            
            <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 my-4 text-sm">
                     <span className="font-semibold py-1 px-3 rounded-full text-xs bg-brand-gray/20 text-brand-green dark:bg-brand-gray/30 dark:text-brand-gray">{category}</span>
                     <span className={getCareLevelBadge()}>{t(careLevel)} {t('care')}</span>
                     <span className="font-semibold py-1 px-3 rounded-full text-xs bg-brand-gold/20 text-brand-brown dark:bg-brand-gold/30 dark:text-brand-gold">{t('match')}: {matchConfidence}%</span>
                </div>

                 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base my-6">{description}</p>

                {/* TAB Navigation */}
                <div className="mb-6 border-b border-slate-200 dark:border-slate-700 flex">
                    <button 
                        onClick={() => setActiveTab('care')}
                        className={`px-4 py-3 font-semibold text-sm transition-colors duration-300 border-b-2 flex items-center gap-2 ${activeTab === 'care' ? 'border-brand-green text-brand-green' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        <LeafIcon className="w-5 h-5" /> {t('careGuideTab')}
                    </button>
                    {healthAndBenefits && (
                        <button 
                            onClick={() => setActiveTab('health')}
                            className={`px-4 py-3 font-semibold text-sm transition-colors duration-300 border-b-2 flex items-center gap-2 ${activeTab === 'health' ? 'border-brand-green text-brand-green' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                            <HeartPulseIcon className="w-5 h-5" /> {t('healthBenefitsTab')}
                        </button>
                    )}
                </div>

                <div className="space-y-8">
                    {/* CARE TAB CONTENT */}
                    {activeTab === 'care' && (
                        <div className="animate-fade-in space-y-8">
                           <section>
                               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                   {t('careGuide')}
                               </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <CareGuideCard icon={<SunIcon className="w-6 h-6" />} title={t('sunlight')} text={careInstructions.sunlight} />
                                    <CareGuideCard icon={<WaterDropIcon className="w-6 h-6" />} title={t('watering')} text={careInstructions.watering} />
                                    <CareGuideCard icon={<SoilIcon className="w-6 h-6" />} title={t('soil')} text={careInstructions.soil} />
                                    <CareGuideCard icon={<TemperatureIcon className="w-6 h-6" />} title={t('temperature')} text={careInstructions.temperature} />
                                </div>
                            </section>
                            
                            <section>
                               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                   {t('toxicity')}
                               </h3>
                                <div className={`p-4 rounded-lg flex items-start gap-4 ${toxicity.isToxicToPets ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${toxicity.isToxicToPets ? 'bg-red-100 dark:bg-red-500/20' : 'bg-green-100 dark:bg-green-500/20'}`}>
                                        <PawIcon className={`w-5 h-5 ${toxicity.isToxicToPets ? 'text-red-500' : 'text-green-500'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${toxicity.isToxicToPets ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
                                            {toxicity.isToxicToPets ? t('toxicToPets') : t('safeForPets')}
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{toxicity.details}</p>
                                    </div>
                                </div>
                            </section>

                           <section>
                               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                   {t('timelineLifecycle')}
                               </h3>
                                 <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm">{t('floweringSeason')}</h4>
                                        <MonthGrid floweringMonths={translatedMonths} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 text-sm">{t('plantingTime')}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{timeline.plantingTime}</p>
                                    </div>
                                </div>
                            </section>
                            
                            <section>
                               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                   {t('propagation')}
                               </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{propagation}</p>
                            </section>

                            {companionPlants && companionPlants.length > 0 && (
                                <section>
                                   <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                       {t('companionPlants')}
                                   </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {companionPlants.map(plant => (
                                            <span key={plant.name} className="bg-brand-brown/20 text-brand-brown dark:bg-brand-brown/30 dark:text-brand-brown text-sm font-medium px-3 py-1 rounded-full">{plant.name}</span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {commonPests && commonPests.length > 0 && (
                                <section>
                                   <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                                       {t('commonPests')}
                                   </h3>
                                    <div className="bg-slate-50/50 dark:bg-slate-800/20 rounded-lg">
                                       {commonPests.map((pest) => (
                                            <AccordionItem 
                                                key={pest.name} 
                                                title={pest.name}
                                                isOpen={openPest === pest.name}
                                                onToggle={() => setOpenPest(openPest === pest.name ? null : pest.name)}
                                            >
                                                {pest.solution}
                                            </AccordionItem>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                    
                    {/* HEALTH TAB CONTENT */}
                    {activeTab === 'health' && healthAndBenefits && (
                        <div className="animate-fade-in space-y-8">
                           <section>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                   <SparklesIcon className="w-5 h-5 text-brand-gold" />
                                   <span>{t('nutrientsTitle')}</span>
                               </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                                    {healthAndBenefits.nutrients.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </section>
                           <section>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                   <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                                   <span>{t('benefitsTitle')}</span>
                               </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                                    {healthAndBenefits.benefits.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </section>
                           <section>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                   <BookOpenIcon className="w-5 h-5 text-blue-500" />
                                   <span>{t('usageTitle')}</span>
                               </h3>
                                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line text-sm">{healthAndBenefits.usage}</p>
                            </section>
                           <section>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                   <BanIcon className="w-5 h-5 text-red-500" />
                                   <span>{t('dangersTitle')}</span>
                               </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{healthAndBenefits.dangers}</p>
                                {(healthAndBenefits.dangers.toLowerCase().includes('do not consume') || healthAndBenefits.dangers.toLowerCase().includes('jangan dikonsumsi') || healthAndBenefits.dangers.toLowerCase().includes('beracun')) && (
                                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-800 dark:text-red-300 font-bold rounded-r-md text-sm">
                                        {t('doNotConsumeWarning')}
                                    </div>
                                )}
                            </section>
                        </div>
                    )}
                    
                    <section>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-brand-green rounded-r-lg">
                           <QuoteIcon className="w-6 h-6 text-slate-300 dark:text-slate-600 mb-2" />
                           <p className="font-serif text-lg italic text-slate-700 dark:text-slate-200">"{interestingFact}"</p>
                       </div>
                    </section>
                    
                    {relatedPlants && relatedPlants.length > 0 && (
                        <section>
                           <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                               {t('relatedPlants')}
                           </h3>
                           <div className="flex overflow-x-auto space-x-4 pb-4 -mx-6 px-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                               {relatedPlants.map((plant, index) => (
                                    <RelatedPlantCard 
                                        key={`${plant.name}-${index}`} 
                                        plantName={plant.name} 
                                        onClick={() => onRelatedPlantClick(plant.name)}
                                    />
                                ))}
                           </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;