import type { NavigatorScreenParams } from '@react-navigation/native';

export type StallStatus = 'Open' | 'Attention' | 'Closed';
export type InspectionPriority = 'High' | 'Medium' | 'Low';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type StallCategory =
  | 'Fresh produce'
  | 'Textiles'
  | 'Livestock products'
  | 'Grains and pulses'
  | 'Spices and condiments'
  | 'Handicrafts';

export type MarketZone = {
  id: string;
  name: string;
  stallCode: string;
  category: StallCategory;
  status: StallStatus;
  priority: InspectionPriority;
  summary: string;
  tint: string;
};

export type InspectionDraft = {
  vendorAlias: string;
  stallCode: string;
  category: StallCategory | '';
  contactNumber: string;
  riskLevel: RiskLevel | '';
  consent: boolean;
  evidenceUri: string | null;
};

export type InspectionRecord = InspectionDraft & {
  id: string;
  createdAt: string;
  groupCode: string;
};

export type FieldErrors = Partial<
  Record<'vendorAlias' | 'stallCode' | 'category' | 'contactNumber' | 'riskLevel' | 'consent', string>
>;

export type MediaBanner = {
  tone: 'denied' | 'cancelled' | 'info';
  title: string;
  body: string;
};

export type InspectStackParamList = {
  InspectionForm: undefined;
  InspectionReview: undefined;
};
export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { id: string };
};
export type RootTabParamList = {
  MarketTab: undefined;
  InspectTab: NavigatorScreenParams<InspectStackParamList>;
  CameraTab: undefined;
  TravelTab: undefined;
  RecordsTab: NavigatorScreenParams<RecordsStackParamList>;
};

export type InspectionFilters = {
  query: string;
  status: 'All' | StallStatus;
};
