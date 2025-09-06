
export interface ClientData {
  name: string;
  email: string;
  phone: string;
}

export interface VehicleData {
  year: string;
  make: string;
  model: string;
  vin: string;
}

export interface ConditionData {
  servicePackage: string;
  vehicleSize: string;
  exterior: string;
  interior: string;
  issues: string[];
}

export interface AssessmentData {
  client: ClientData;
  vehicle: VehicleData;
  condition: ConditionData;
}

export interface EstimateResult {
  basePrice: number;
  surchargePercentage: number;
  surchargeAmount: number;
  totalEstimate: number;
  reasoning: string;
}

export interface ServicePackage {
  [key: string]: {
    basePrice: {
      [key: string]: number;
    }
  }
}
