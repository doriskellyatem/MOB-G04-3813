import type { MarketZone, StallCategory } from '../types';

export const MARKET_ZONES: MarketZone[] = [
  {
    id: 'kimonyi',
    name: 'Kimonyi Produce Arcade',
    stallCode: 'MSZ-A12',
    category: 'Fresh produce',
    status: 'Open',
    priority: 'High',
    summary: 'Cooking bananas, Irish potatoes and leaf vegetables on the north arcade.',
    tint: '#5C8A4B',
  },
  {
    id: 'muhoza',
    name: 'Muhoza Textile Row',
    stallCode: 'MSZ-B04',
    category: 'Textiles',
    status: 'Open',
    priority: 'Medium',
    summary: 'Kitenge and imishanana cloth bays along the inner corridor.',
    tint: '#B0653F',
  },
  {
    id: 'cyuve',
    name: 'Cyuve Fish and Meat',
    stallCode: 'MSZ-C21',
    category: 'Livestock products',
    status: 'Attention',
    priority: 'High',
    summary: 'Cold trays and smoked fish under the corrugated shed. Wash-down overdue.',
    tint: '#6B7F8C',
  },
  {
    id: 'busogo',
    name: 'Busogo Grain Bays',
    stallCode: 'MSZ-D08',
    category: 'Grains and pulses',
    status: 'Open',
    priority: 'Low',
    summary: 'Maize and bean sacks in numbered bays, dry floor, clear aisles.',
    tint: '#B99A4E',
  },
  {
    id: 'nyakinama',
    name: 'Nyakinama Spice Walk',
    stallCode: 'MSZ-E15',
    category: 'Spices and condiments',
    status: 'Closed',
    priority: 'Medium',
    summary: 'Chili and turmeric bowls. Stall closed pending roof repair.',
    tint: '#A4432F',
  },
  {
    id: 'kinigi',
    name: 'Kinigi Craft Sheds',
    stallCode: 'MSZ-F03',
    category: 'Handicrafts',
    status: 'Open',
    priority: 'Low',
    summary: 'Agaseke baskets and wooden utensils at the Kinigi edge stalls.',
    tint: '#7A5C8A',
  },
];

export const CATEGORIES: StallCategory[] = [
  'Fresh produce',
  'Textiles',
  'Livestock products',
  'Grains and pulses',
  'Spices and condiments',
  'Handicrafts',
];

export const STATUS_FILTERS = ['All', 'Open', 'Attention', 'Closed'] as const;
