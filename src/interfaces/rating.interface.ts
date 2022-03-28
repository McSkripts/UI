import User from './user.interface';

export default interface IRating {
  Id: number;
  Rating: number;
  Comment: string;
  Timestamp: {
    Upload: string;
    Update: string;
  }
  User?: User;
}