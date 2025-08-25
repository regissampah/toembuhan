import { GoogleGenAI, Type } from "@google/genai";
import { PlantData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        isPlantIdentified: { 
            type: Type.BOOLEAN, 
            description: "Set to true if a plant is clearly identified, otherwise false."
        },
        commonName: { 
            type: Type.STRING, 
            description: "The common name of the plant. If not identified, this should be 'Unknown'."
        },
        scientificName: { 
            type: Type.STRING, 
            description: "The scientific (Latin) name of the plant. If not identified, this should be 'N/A'."
        },
        description: { 
            type: Type.STRING, 
            description: "A detailed description of the plant's characteristics (2-3 sentences max). If not identified, explain why."
        },
        careInstructions: {
            type: Type.OBJECT,
            properties: {
                watering: { type: Type.STRING, description: "Detailed watering needs for the plant." },
                sunlight: { type: Type.STRING, description: "Sunlight requirements (e.g., full sun, partial shade)." },
                soil: { type: Type.STRING, description: "Recommended soil type for the plant." },
                temperature: { type: Type.STRING, description: "Ideal temperature range and climate preferences (e.g., 15-30°C, not frost-tolerant)." }
            },
            required: ["watering", "sunlight", "soil", "temperature"]
        },
        interestingFact: { 
            type: Type.STRING,
            description: "A unique and interesting fact about the plant."
        },
        category: {
            type: Type.STRING,
            enum: ['Annual', 'Perennial', 'Shrub', 'Tree', 'Other'],
            description: "The botanical category of the plant."
        },
        careLevel: {
            type: Type.STRING,
            enum: ['Easy', 'Medium', 'Hard'],
            description: "The difficulty level for caring for this plant."
        },
        matchConfidence: {
            type: Type.NUMBER,
            description: "A confidence score from 0 to 100 on how certain the identification is based on the image."
        },
        timeline: {
            type: Type.OBJECT,
            properties: {
                floweringSeason: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "An array of months when the plant typically flowers (e.g., ['June', 'July'])."
                },
                plantingTime: {
                    type: Type.STRING,
                    description: "The best time or season to plant this species."
                }
            },
            required: ["floweringSeason", "plantingTime"]
        },
        propagation: {
            type: Type.STRING,
            description: "A brief guide on how to propagate the plant (e.g., from cuttings, seeds)."
        },
        commonPests: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    solution: { type: Type.STRING }
                },
                required: ["name", "solution"]
            },
            description: "A list of common pests or diseases and their solutions."
        },
        companionPlants: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING }
                },
                required: ["name"]
            },
            description: "A list of plants that grow well alongside this one."
        },
        toxicity: {
            type: Type.OBJECT,
            properties: {
                isToxicToPets: { type: Type.BOOLEAN, description: "True if the plant is known to be toxic to common pets like cats and dogs." },
                details: { type: Type.STRING, description: "Brief details about its toxicity or safety for pets." }
            },
            required: ["isToxicToPets", "details"]
        },
        relatedPlants: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING }
                },
                required: ["name"]
            },
            description: "A list of botanically related or similar-looking plants."
        },
        healthAndBenefits: {
            type: Type.OBJECT,
            properties: {
                nutrients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of key nutrients or active compounds found in the plant."
                },
                benefits: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of health benefits or common uses for the plant (e.g., 'Antioxidant', 'Herbal Tea')."
                },
                usage: {
                    type: Type.STRING,
                    description: "A brief description of how to use the plant, including simple recipes if applicable."
                },
                dangers: {
                    type: Type.STRING,
                    description: "A description of potential dangers, side effects, or a clear warning if the plant is not safe for consumption. If it's toxic, explicitly state 'Do not consume'."
                }
            },
            required: ["nutrients", "benefits", "usage", "dangers"]
        }
    },
    required: [
        "isPlantIdentified", "commonName", "scientificName", "description", "careInstructions", 
        "interestingFact", "category", "careLevel", "matchConfidence", "timeline", 
        "propagation", "commonPests", "companionPlants", "toxicity", "relatedPlants", "healthAndBenefits"
    ]
};

export const identifyPlant = async (base64Image: string, language: 'en' | 'id'): Promise<PlantData> => {
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };
    
    const langInstruction = language === 'id' 
        ? "Berikan semua respons tekstual dalam Bahasa Indonesia."
        : "Provide all textual responses in English.";

    const prompt = `Please identify the plant in this image. ${langInstruction} Provide its details according to the schema. Be comprehensive and fill out all fields, including health and benefits information. If you cannot identify a plant, set isPlantIdentified to false and fill the other fields appropriately with default/empty values.`;

    const textPart = {
        text: prompt
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });
        
        const jsonString = response.text.trim();
        const parsedData: PlantData = JSON.parse(jsonString);

        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("The AI service failed to process the request.");
    }
};

export const getPlantDetailsByName = async (plantName: string, language: 'en' | 'id'): Promise<PlantData> => {
    const langInstruction = language === 'id'
        ? "Berikan semua respons tekstual dalam Bahasa Indonesia."
        : "Provide all textual responses in English.";
    
    const prompt = `Please provide detailed information about the plant named "${plantName}". ${langInstruction} Provide the details according to the provided schema. Be comprehensive and fill out all fields, including health and benefits information. For matchConfidence, since this is a text-based query, please return a default value of 100. If the plant name is not recognized, set isPlantIdentified to false.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });

        const jsonString = response.text.trim();
        const parsedData: PlantData = JSON.parse(jsonString);
        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API for plant details by name:", error);
        throw new Error("The AI service failed to process the text-based request.");
    }
};

export const generatePlantImage = async (plantName: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `A clear, vibrant, photorealistic image of a single ${plantName} plant, isolated on a clean, light-colored background. Focus on the details of the leaves and flowers if applicable.`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating plant image:", error);
        throw new Error("The AI service failed to generate an image.");
    }
};