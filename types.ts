

export enum AppState {
    LANDING,
    INPUT,
    LOADING,
    RESULT,
    ERROR,
}

export interface CareInstructions {
    watering: string;
    sunlight: string;
    soil: string;
    temperature: string;
}

export interface PestInfo {
    name: string;
    solution: string;
}

export interface CompanionPlant {
    name: string;
}

export interface ToxicityInfo {
    isToxicToPets: boolean;
    details: string;
}

export interface RelatedPlant {
    name: string;
    imageUrl?: string;
}

export interface HealthAndBenefits {
    nutrients: string[];
    benefits: string[];
    usage: string;
    dangers: string;
}

export interface PlantData {
    isPlantIdentified: boolean;
    commonName: string;
    scientificName: string;
    description: string;
    careInstructions: CareInstructions;
    interestingFact: string;

    // New Fields
    category: 'Annual' | 'Perennial' | 'Shrub' | 'Tree' | 'Other';
    careLevel: 'Easy' | 'Medium' | 'Hard';
    matchConfidence: number;
    timeline: {
        floweringSeason: string[]; // e.g., ["June", "July", "August"]
        plantingTime: string;
    };
    propagation: string;
    commonPests: PestInfo[];
    companionPlants: CompanionPlant[];
    toxicity: ToxicityInfo;
    relatedPlants: RelatedPlant[];
    healthAndBenefits: HealthAndBenefits;
}