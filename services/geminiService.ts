
import { GoogleGenAI, Type } from "@google/genai";
import type { AssessmentData, EstimateResult, ServicePackage } from '../types';
import { SERVICE_PACKAGES } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const estimateSchema = {
  type: Type.OBJECT,
  properties: {
    basePrice: { type: Type.NUMBER },
    surchargePercentage: { type: Type.NUMBER },
    surchargeAmount: { type: Type.NUMBER },
    totalEstimate: { type: Type.NUMBER },
    reasoning: { type: Type.STRING },
  },
  required: ['basePrice', 'surchargePercentage', 'surchargeAmount', 'totalEstimate', 'reasoning'],
};


export const getAIPriceEstimate = async (data: AssessmentData): Promise<EstimateResult> => {
  const { vehicle, condition } = data;
  const { servicePackage, vehicleSize } = condition;
  
  const packageData = (SERVICE_PACKAGES as ServicePackage)[servicePackage];
  if (!packageData) {
    throw new Error(`Invalid service package selected: ${servicePackage}`);
  }

  const basePrice = packageData.basePrice[vehicleSize];
  if (basePrice === undefined) {
    throw new Error(`Invalid vehicle size for the selected package: ${vehicleSize}`);
  }

  const prompt = `
    You are an AI pricing engine for 'Slick Solutions', a premium car detailing service.
    Your task is to calculate a final price estimate based on the vehicle's size, condition, and the selected service package.
    You must return your response in a valid JSON format that adheres to the provided schema.

    Here is the assessment data:
    - Service Package: ${condition.servicePackage}
    - Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}
    - Vehicle Size Category: ${condition.vehicleSize}
    - Base Price for this service and size: $${basePrice}
    - Reported Exterior Condition: ${condition.exterior}
    - Reported Interior Condition: ${condition.interior}
    - Specific Issues Reported: ${condition.issues.length > 0 ? condition.issues.join(', ') : 'None'}

    Instructions:
    1.  Start with the provided Base Price of $${basePrice}.
    2.  Based on the exterior/interior conditions and specific issues, calculate a condition-based surcharge.
    3.  The surcharge should be a percentage of the base price. It can range from 0% for a vehicle in excellent condition to 60% for a vehicle in very poor condition with multiple issues.
    4.  Calculate the surcharge amount and the total estimate.
    5.  Provide a brief, client-friendly 'reasoning' for the surcharge. For example, "A 15% surcharge was added due to moderate pet hair and light exterior scratches, which require extra time and specialized products." If the surcharge is 0%, state that the vehicle is in great condition and no extra charges are needed.
    6.  Ensure all monetary values are numbers, not strings.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: estimateSchema,
      },
    });

    const jsonText = response.text.trim();
    const result: EstimateResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback or re-throw a more specific error
    throw new Error("The AI pricing engine could not be reached. Please check your connection or try again later.");
  }
};
