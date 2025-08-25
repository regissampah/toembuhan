import React from 'react';

interface IconProps {
    className?: string;
}

// Updated LeafIcon to be a reliable SVG icon
export const LeafIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
        <path d="M422-262q-64-42-102.5-103.5T281-494q0-85 45.5-151.5T440-740q-26 43-41 89t-15 95q0 58 20.5 110.5T450-350q40 46 90 77.5T648-242q-73 35-152 35t-142-29q-63-29-112-78t-76-112q-27-63-29-142t35-152q30-79 88-132.5T422-832q2 9 3 18.5t1 19.5q0 120-74.5 215.5T160-440q57 114 167 181t253 69q-126 0-228-52t-170-150Z"/>
    </svg>
);


export const CameraIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const EarthIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c1.358 0 2.662-.354 3.832-1.001M12 21c-1.358 0-2.662-.354-3.832-1.001M21 12a9 9 0 00-9-9 9 9 0 00-9 9m18 0h-2.25m-13.5 0H3m15.75 0a9.004 9.004 0 01-8.716 6.747M3.25 12a9.004 9.004 0 018.716 6.747m0 0A9.004 9.004 0 0112 21m0 0c1.358 0 2.662-.354 3.832-1.001" />
    </svg>
);

export const WaterDropIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a5 5 0 01-.97-9.9H6.5a6.5 6.5 0 1111 0h-.53a5 5 0 01-.97 9.9v.1A5 5 0 017 16z" />
    </svg>
);

export const SoilIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const BackArrowIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l-3.181 3.183" />
    </svg>
);

export const TemperatureIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a5 5 0 0 0-5 5v6.29a3 3 0 1 0 2 0V7a3 3 0 0 1 6 0v6.29a3 3 0 1 0 2 0V7a5 5 0 0 0-5-5z M9 18a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H10a1 1 0 0 1-1-1z" />
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const SeedlingIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 12.5a5.5 5.5 0 1111 0V18h-11v-5.5zM12 18v3m-3.5-3.5C6.5 13.4 8 10 12 10s5.5 3.4 3.5 4.5" />
    </svg>
);

export const BugIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 8h-4.82A5.002 5.002 0 0012 4c-1.5 0-2.8.66-3.73 1.69L6 8H4c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h1v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-2c0-1.1-.9-2-2-2zM12 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 9H8v-2h8v2z" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const PawIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9.75-4.562l-2.25 4.5 4.5 2.25 2.25-4.5-4.5-2.25zM14.25 10.5l-2.25 4.5 4.5 2.25 2.25-4.5-4.5-2.25z" />
    </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01" />
    </svg>
);

export const PlantsIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v1h6V4a3 3 0 00-3-3zM6 8a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4zm12 0a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4zM6 18h12v3H6v-3z" />
    </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-2.724 2.213-4.935 4.935-4.935h.011v3.328h-.011c-1.042 0-1.881.839-1.881 1.881v7.117h-3.054zm-10.017 0v-7.391c0-2.724 2.213-4.935 4.935-4.935h.011v3.328h-.011c-1.042 0-1.881.839-1.881 1.881v7.117h-3.054z"/>
    </svg>
);

export const HeartPulseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 8.25s4.5-1.5 4.5-3.5" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.423-1.423L12.9 18.75l1.188-.648a2.25 2.25 0 001.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.648a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);


export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const BanIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export const TreeIcon: React.FC<IconProps> = ({ className }) => (
    <svg data-name="01-tree" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}><path d="M32 60a1 1 0 0 1-1-1V16a1 1 0 0 1 2 0v43a1 1 0 0 1-1 1z" style={{fill:'#bf9259'}}/><path d="M43 59a2.006 2.006 0 0 1 2 2 2.015 2.015 0 0 1-2 2H21a2.006 2.006 0 0 1-2-2 2.015 2.015 0 0 1 2-2h22z" style={{fill:'#c98c65'}}/><path d="m25.669 51.33-.02.02c-.2.18-1.52 1.25-3.14-.37-.86-.86-.6-2.52.52-3.97L28 49z" style={{fill:'#4f9a44'}}/><path d="m28 49 .94 5.62a2.572 2.572 0 0 1-2.92-.13c-1.62-1.62-.55-2.94-.37-3.14l.02-.02z" style={{fill:'#406e31'}}/><path d="M31.3 45.7a3.346 3.346 0 0 1 .7 2.37 11.259 11.259 0 0 1-1.4 5.37 6.191 6.191 0 0 1-1.66 1.18L28 49z" style={{fill:'#44853b'}}/><path d="M31.3 45.7 28 49l-4.97-1.99a7.458 7.458 0 0 1 .53-.61c.709-.7 6.119-2.32 7.74-.7z" style={{fill:'#5cb34f'}}/><path d="M32 37v3s0 2-2.5 2c-1.17 0-2.15-1.29-2.42-3.03zM42.44 51.73a4.556 4.556 0 0 1-1.61.27 5.429 5.429 0 0 1-3.761-2.05l3.581-2.69a20.162 20.162 0 0 1 1.79 4.47zM17.558 29.98A13.748 13.748 0 0 0 24 28l.06.23a23.1 23.1 0 0 0-2.76 5.31c-.19-.33-.3-.54-.3-.54s-.941.94-3.721.99A7.769 7.769 0 0 1 17 32a4.5 4.5 0 0 1 .558-2.02z" style={{fill:'#44853b'}}/><path d="M44.87 47a2.173 2.173 0 0 1 .13.71 4.268 4.268 0 0 1-2.56 4.02 20.162 20.162 0 0 0-1.79-4.47L41 47z" style={{fill:'#5cb34f'}}/><path d="M17.278 33.99C20.058 33.94 21 33 21 33s.11.21.3.54a29.236 29.236 0 0 0-1.221 4.09 5.194 5.194 0 0 1-2.801-3.64zM24 28a13.748 13.748 0 0 1-6.441 1.98 8.949 8.949 0 0 1 .69-1.09 4.044 4.044 0 0 1 1.58-1.26L28 24h1a11.936 11.936 0 0 0-4.94 4.23C24.019 28.08 24 28 24 28zM40.65 47.26l-3.581 2.69a13.986 13.986 0 0 1-1.7-2.3 2.419 2.419 0 0 1-.37-1.3V42a11.168 11.168 0 0 1 5.651 5.26zM32 32v5l-4.92 1.97A6.143 6.143 0 0 1 27 38c0-1 2.7-6 5-6z" style={{fill:'#4f9a44'}}/><path d="M27.969 33a13.98 13.98 0 0 1-3.28 3.97c-1.43-.28-2.81-2.41-3.39-3.43a23.1 23.1 0 0 1 2.76-5.31c.23.98 1.32 4.74 3.91 4.77z" style={{fill:'#5cb34f'}}/><path d="M24.689 36.97A4.488 4.488 0 0 1 22 38a4.908 4.908 0 0 1-1.921-.37 29.236 29.236 0 0 1 1.221-4.09c.579 1.02 1.959 3.15 3.389 3.43zM29 24v6.09a3.994 3.994 0 0 1-.444 1.838c-.159.308-.348.666-.586 1.072-2.59-.03-3.68-3.79-3.91-4.77A11.936 11.936 0 0 1 29 24zM35.829 42l6.811 2.59a3.34 3.34 0 0 1 1.32.9 4.787 4.787 0 0 1 .91 1.51H41l-.35.26A11.168 11.168 0 0 0 35 42zM37 38a6.045 6.045 0 0 1-.08.97L32 37v-5c2.3 0 5 5 5 6z" style={{fill:'#7bc24f'}}/><path d="m32 37 4.92 1.97C36.65 40.71 35.67 42 34.5 42 32 42 32 40 32 40z" style={{fill:'#5cb34f'}}/><path d="M20.759 19.35c-.671 1.01-2.391 3.98-.781 5.63a5.081 5.081 0 0 1-3.54-1.5 5.541 5.541 0 0 1-1.06-1.65 20.551 20.551 0 0 1 5.381-2.48zM23.989 18.8A9.7 9.7 0 0 1 29 19.81l-3.45 3.83a2.723 2.723 0 0 1-1.33.82c-.35.1-.79.21-1.29.3A7.823 7.823 0 0 1 24 19z" style={{fill:'#4f9a44'}}/><path d="M24 19a7.823 7.823 0 0 0-1.07 5.76 11.647 11.647 0 0 1-2.951.22c-1.61-1.65.11-4.62.781-5.63a13.982 13.982 0 0 1 3.23-.55z" style={{fill:'#44853b'}}/><path d="M21 19s-.1.13-.24.35a20.551 20.551 0 0 0-5.381 2.48 5.6 5.6 0 0 1 .89-5.47c.639.8 2.379 2.64 4.731 2.64z" style={{fill:'#5cb34f'}}/><path d="m28.339 19.08.66.73a9.7 9.7 0 0 0-5.01-1.01 13.982 13.982 0 0 0-3.23.55c.14-.22.24-.35.24-.35-2.351 0-4.091-1.84-4.731-2.64.09-.12.17-.22.26-.32a4 4 0 0 1 2.59-1.03 3.287 3.287 0 0 1 1.761.37l7.31 3.63z" style={{fill:'#7bc24f'}}/><path d="M43.09 21.09c.5.53 2.91 3.22 2.91 5.91a19.04 19.04 0 0 1-5.09-.69L41 26a7.66 7.66 0 0 0-1.7-4.66c1.5-.12 2.77-.2 3.79-.25z" style={{fill:'#44853b'}}/><path d="m41 26-.09.31A19.311 19.311 0 0 1 33 22c2.39-.3 4.51-.51 6.3-.66A7.66 7.66 0 0 1 41 26zM46 27c0-2.69-2.41-5.38-2.91-5.91C44.97 21 46 21 46 21s1.18 1.18 2.06 1.07A3.056 3.056 0 0 1 49 24a3 3 0 0 1-3 3z" style={{fill:'#4f9a44'}}/><path d="M43.09 21.09c-1.02.05-2.29.13-3.791.25-.18-.22-.3-.34-.3-.34s.981-3.92 2.941-4.96a14.491 14.491 0 0 1 4.8 1.06A6.842 6.842 0 0 0 43 21z" style={{fill:'#5cb34f'}}/><path d="M43 21a6.842 6.842 0 0 1 3.74-3.9A3.269 3.269 0 0 1 49 20c0 1.49-.42 2.01-.94 2.07C47.18 22.18 46 21 46 21s-1.03 0-2.91.09zM33 22s4-6 7-6h1s.36 0 .94.04C39.98 17.08 39 21 39 21s.12.12.3.34c-1.791.15-3.911.36-6.3.66z" style={{fill:'#7bc24f'}}/><path d="M32 12v5s-6-3-6-5a4.38 4.38 0 0 1 1-3c3 0 5 3 5 3zM32 1v6a11.135 11.135 0 0 0-6.61-2.98C26.059 2.46 27.809 1 32 1z" style={{fill:'#4f9a44'}}/><path d="M38.609 4.02A4.908 4.908 0 0 1 39 6a3.7 3.7 0 0 1-2 3c-3 0-5 3-5 3V7a11.135 11.135 0 0 1 6.609-2.98z" style={{fill:'#5cb34f'}}/><path d="M32 7v5s-2-3-5-3a3.7 3.7 0 0 1-2-3 4.908 4.908 0 0 1 .39-1.98A11.135 11.135 0 0 1 32 7z" style={{fill:'#44853b'}}/><path d="M37 9a4.38 4.38 0 0 1 1 3c0 2-6 5-6 5v-5s2-3 5-3zM32 1c4.19 0 5.94 1.46 6.61 3.02A11.135 11.135 0 0 0 32 7z" style={{fill:'#7bc24f'}}/><path d="M48 35a6.177 6.177 0 0 1-.08 1 12.5 12.5 0 0 1-4.83-.96h-.01a20.761 20.761 0 0 0-2.14-3.81L41 31s1.95 1.95 5.85 1.03A5.465 5.465 0 0 1 48 35z" style={{fill:'#4f9a44'}}/><path d="M47.92 36c-.22 1.64-1.02 3.78-3 4.63a29.762 29.762 0 0 0-1.83-5.59 12.5 12.5 0 0 0 4.83.96zM46.75 31.89c.03.05.07.09.1.14C42.95 32.95 41 31 41 31l-.06.23A11.936 11.936 0 0 0 36 27h1l8.17 3.63a4.044 4.044 0 0 1 1.58 1.26z" style={{fill:'#5cb34f'}}/><path d="M43.09 35.04a29.762 29.762 0 0 1 1.83 5.59A4.9 4.9 0 0 1 43 41a4.6 4.6 0 0 1-2.77-1.09C43 38.79 43 35 43 35a.456.456 0 0 1 .08.04z" style={{fill:'#4f9a44'}}/><path d="M43.08 35.04A.456.456 0 0 0 43 35s0 3.79-2.77 4.91a14.052 14.052 0 0 1-3.2-3.91c2.59-.03 3.68-3.79 3.91-4.77a20.761 20.761 0 0 1 2.14 3.81z" style={{fill:'#44853b'}}/><path d="M40.94 31.23c-.23.98-1.32 4.74-3.91 4.77-.24-.41-.43-.77-.59-1.08a4.014 4.014 0 0 1-.44-1.83V27a11.936 11.936 0 0 1 4.94 4.23z" style={{fill:'#4f9a44'}}/><path d="M44.41 60.41A1.955 1.955 0 0 1 43 61H21a2 2 0 0 1-1.721-1A1.954 1.954 0 0 0 19 61a2.006 2.006 0 0 0 2 2h22a2.015 2.015 0 0 0 2-2 1.978 1.978 0 0 0-.279-1 1.938 1.938 0 0 1-.311.41z" style={{fill:'#9a6948'}}/><path d="M36.354 26.646A.5.5 0 0 0 36 26.5a12.84 12.84 0 0 0-3 .281v1.026a10.054 10.054 0 0 1 2.794-.306l.206.206V27h.707zM28.646 23.646l-.353.354H29a9.743 9.743 0 0 0-1.545.839A9.674 9.674 0 0 1 29 24v.707l.207-.207H31v-1h-2a.5.5 0 0 0-.354.146zM28.84 19h-.327a.565.565 0 0 0-.231.053l.057.027.66.73-.17.189h.024a5.569 5.569 0 0 1 2.147.273v-1.066A7.561 7.561 0 0 0 28.84 19zM34.5 42a2.953 2.953 0 0 1-1.5-.346v.846h2V42h.5a.49.49 0 0 0-.1-.28 1.7 1.7 0 0 1-.9.28zM33.56 22.5c-.36-.306-.56-.5-.56-.5v.706l.207-.207zM33 21.5v.5s.13-.194.35-.5z" style={{fill:'#ab7e4e'}}/><path d="M31.448 45.905a.882.882 0 0 0-.348-.358l-3.16 3.16-4.739-1.9c-.056.067-.12.131-.172.2s-.092.136-.14.2c.008 0 .009.014.018.018l4.648 1.859-2.689 2.696a2.148 2.148 0 0 0 .783-.43 2.119 2.119 0 0 0-.431.786l2.615-2.616.866 5.2c.08-.032.16-.06.24-.1s.152-.094.229-.135l-.9-5.4zM26.632 9.512l.436-.262c2.575.042 4.4 2.436 4.682 2.829v4.793c.157.082.249.128.249.128s.092-.046.251-.129v-4.792c.285-.4 2.136-2.829 4.7-2.834l.283.057A2.874 2.874 0 0 0 37 9a3.293 3.293 0 0 0 .314-.188L37 8.75a6.58 6.58 0 0 0-4.75 2.521V7.108a10.9 10.9 0 0 1 6.45-2.845c-.03-.081-.053-.162-.089-.243s-.072-.157-.112-.235A11.139 11.139 0 0 0 32.25 6.44V1.006C32.165 1 32.086 1 32 1h-.249v5.44A11.139 11.139 0 0 0 25.5 3.785c-.04.078-.078.156-.112.235s-.059.162-.089.243a10.927 10.927 0 0 1 6.45 2.845v4.163A6.58 6.58 0 0 0 27 8.75a.24.24 0 0 0-.128.036l-.117.069C26.9 8.945 27 9 27 9a3.05 3.05 0 0 0-.368.512zM24.059 28.23A11.936 11.936 0 0 1 29 24h-.58a12.411 12.411 0 0 0-4.353 3.765.238.238 0 0 0-.206.027 13.747 13.747 0 0 1-6.155 1.937c-.049.084-.1.162-.148.251s-.077.167-.116.251a14.216 14.216 0 0 0 6.047-1.644 23.626 23.626 0 0 0-2.24 4.35l-.025-.049a.254.254 0 0 0-.182-.134.251.251 0 0 0-.217.068c-.01.009-.954.87-3.606.919.02.083.036.165.059.249s.05.166.075.249a6.891 6.891 0 0 0 3.563-.862c.028.051.061.111.1.174a29.838 29.838 0 0 0-1.168 3.957c.079.04.151.086.233.122s.162.045.239.073a30.1 30.1 0 0 1 1.039-3.571c.66 1.064 1.81 2.623 3.062 3.019.09-.061.183-.114.271-.181s.17-.157.258-.23c-1.253-.052-2.637-1.958-3.369-3.207a24.036 24.036 0 0 1 2.375-4.709c.416 1.415 1.543 4.269 3.867 4.412.047-.077.105-.161.149-.236-2.593-.03-3.683-3.79-3.913-4.77z" style={{fill:'#325727'}}/><path d="M29 24.275V24a11.936 11.936 0 0 0-4.94 4.23c.23.98 1.32 4.74 3.91 4.77.044-.076.079-.141.12-.213-.03-.013-.055-.037-.09-.037-2.332 0-3.393-3.382-3.674-4.463A11.747 11.747 0 0 1 29 24.275zM47.95 35.748a12.327 12.327 0 0 1-4.653-.89 22.762 22.762 0 0 0-1.687-3.122 7.188 7.188 0 0 0 5.39.519c-.049-.073-.1-.157-.146-.225-.03-.05-.07-.09-.1-.14-.021-.029-.052-.048-.075-.077-3.622.8-5.48-.972-5.5-.99a.253.253 0 0 0-.245-.062A12.412 12.412 0 0 0 36.58 27H36v.277a11.791 11.791 0 0 1 4.672 4.016c-.283 1.089-1.345 4.457-3.672 4.457-.035 0-.06.024-.09.037.041.072.076.137.12.213s.1.159.148.237c2.322-.143 3.449-2.989 3.867-4.406a22.294 22.294 0 0 1 1.717 3.124.25.25 0 0 0-.012.045c0 .038-.036 3.73-2.729 4.721.071.059.136.133.209.189s.152.1.228.156a5.226 5.226 0 0 0 2.714-4.161 30.213 30.213 0 0 1 1.51 4.8c.077-.028.164-.042.238-.073s.154-.087.233-.127a29.971 29.971 0 0 0-1.577-5 13.178 13.178 0 0 0 4.3.74c.013-.082.032-.167.043-.247s.021-.166.031-.25zM44.766 46.75H41a.253.253 0 0 0-.15.05l-.118.088A11.489 11.489 0 0 0 35.626 42H35v.272a10.824 10.824 0 0 1 5.312 4.928l-3.407 2.556c.056.064.106.128.164.191s.117.12.175.18l3.312-2.484a19.47 19.47 0 0 1 1.636 4.15c.08-.024.172-.038.248-.066s.147-.076.225-.112a19.446 19.446 0 0 0-1.687-4.289l.1-.079h3.854c-.02-.084-.039-.168-.067-.25s-.065-.164-.099-.247zM36.867 39.216c.017-.083.039-.161.052-.246s.012-.177.022-.263l-4.691-1.876v-4.8A1.677 1.677 0 0 0 32 32a1.786 1.786 0 0 0-.249.032v4.8l-4.693 1.877c.011.086.008.178.022.262s.036.164.052.247l4.619-1.848v3.516A2.1 2.1 0 0 0 32 40a2.1 2.1 0 0 0 .251.889v-3.52zM19.623 24.945c.118.013.237.027.355.035.089.006.178 0 .266.007a.243.243 0 0 0-.067-.164c-1.46-1.459.053-4.189.73-5.241a14.341 14.341 0 0 1 2.745-.493A7.836 7.836 0 0 0 22.7 24.8c.077-.013.159-.025.233-.039.089-.016.165-.035.25-.052-.789-2.776 1.01-5.541 1.029-5.569s.012-.062.018-.093a9.469 9.469 0 0 1 4.6.962l.178-.2-.406-.449a11.352 11.352 0 0 0-7.35-.373.265.265 0 0 0-.019-.1.252.252 0 0 0-.233-.137c-2.278 0-3.982-1.855-4.568-2.591-.054.065-.107.126-.164.2s-.1.143-.147.214a7.012 7.012 0 0 0 4.306 2.637 21.264 21.264 0 0 0-5.127 2.377c.029.081.043.161.077.243s.082.151.117.226a20.845 20.845 0 0 1 4.682-2.246c-.751 1.29-1.763 3.603-.553 5.135zM45.9 21.25a3.646 3.646 0 0 0 2.045 1.08 1.128 1.128 0 0 0 .3-.044c-.06-.072-.114-.143-.184-.216a.776.776 0 0 0 .442-.21.243.243 0 0 0-.3-.085c-.595.287-1.689-.614-2.027-.952A.251.251 0 0 0 46 20.75c-.022 0-.969 0-2.663.083a6.51 6.51 0 0 1 3.7-3.58c-.1-.052-.2-.105-.3-.153s-.2-.084-.3-.127a7.151 7.151 0 0 0-3.652 3.888c-.943.05-2.068.121-3.372.226-.048-.057-.1-.119-.134-.157.19-.685 1.155-3.867 2.834-4.706a.245.245 0 0 0 .124-.16 17.745 17.745 0 0 0-.743-.049c-1.814 1.3-2.7 4.767-2.74 4.924a.251.251 0 0 0 .044.2c-1.642.139-3.524.329-5.612.587L33 22s.087.085.241.223c2.23-.276 4.23-.474 5.945-.616A7.342 7.342 0 0 1 40.75 26a.25.25 0 0 0 .5 0 7.738 7.738 0 0 0-1.471-4.44c1.24-.1 2.315-.163 3.208-.209.612.666 2.757 3.177 2.762 5.64.085 0 .165.009.251.009s.165-.018.248-.025c-.012-2.369-1.765-4.673-2.617-5.655a71.579 71.579 0 0 1 2.269-.07z" style={{fill:'#325727'}}/><rect x="22" y="59" width="14" height="2" rx="1" ry="1" style={{fill:'#f2a97a'}}/><rect x="37" y="59" width="5" height="2" rx="1" ry="1" style={{fill:'#f2a97a'}}/></svg>
);

export const FlashOnIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export const FlashOffIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);