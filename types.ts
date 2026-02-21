
export enum Region {
  NORTH = '北部',
  CENTRAL = '中部',
  SOUTH = '南部'
}

export interface SakuraRoute {
  id: string;
  name: string;
  region: Region;
  distance: number;
  description: string;
  location: string;
  applyRequired: boolean;
  image: string;
}

export interface TrainingGroup {
  id: string;
  name: string;
  location: string;
  tag: string;
  description: string;
  image: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  avatar: string;
  isSynced: boolean;
  totalDistance: number;
}
