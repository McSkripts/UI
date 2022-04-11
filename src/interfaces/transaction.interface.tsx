export default interface ITransaction {
  Id: number;
  Amount: {
    Price: number;
    Currency: string;
  };
  Timestamp: {
    Transaction: string;
  };
  Status: string;
}