import Image from './image.interface';

export default interface User {
  Id: Number;
  Email: String;
  FirstName: String;
  LastName: String;
  DisplayName: String;
  Description: String;
  Coins: Number;
  Xp: Number;
  Balance: {
    Amount: Number;
    Currency: String;
  };
  Language: String;
  Timestamp: {
    LastActivity: String;
    SignIn: String;
    Creation: String;
  };
  Avatar: Image;
  Banner: Image;
}