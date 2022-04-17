import User from './user.interface';

export default interface IRatingRepliy {
  Id: number;
  Reply: number;
  Timestamp: {
    Upload: string;
    Update: string;
  }
  User?: User;
}