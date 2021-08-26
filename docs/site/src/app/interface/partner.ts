export interface Country {
  key: string;
  value: string;
}

export interface Partner {
  logo: string;
  country: string;
  companyName: string;
  url: string;
  description: string;
}

export interface ParentPlan {
  shared: Plan[];
  dedicated: Plan[];
}

export interface Plan {
  name: string;
  description: string;
  price: number;
  buttonLabel: string;
  features: Features;
}

export interface Features {
  [key: string]: string;
}
