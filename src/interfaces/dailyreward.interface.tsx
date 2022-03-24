import Image from './image.interface';

export default interface DailyReward {
  Id?: number;
  Value: number;
  Currency: string;
  Collected: boolean;
  Timestamp: string;
  Image: Image;
}