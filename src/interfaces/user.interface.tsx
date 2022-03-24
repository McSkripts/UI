import Image from './image.interface';

export default interface User {
  Id: number;
  Email: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  Description: string;
  Coins: number;
  Xp: number;
  Balance: {
    Amount: number;
    Currency: string;
  };
  Language: string;
  Timestamp: {
    LastActivity: string;
    SignIn: string;
    Creation: string;
  };
  Avatar: Image;
  Banner: Image;
}