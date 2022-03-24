export default interface Product {
  Id: number;
  Type: string;
  Title: string;
  Description: string;
  Version: {
    Number: string;
    Release: string;
  };
  Price: {
    Amount: number;
    Currency: string;
  };
  Timestamp: {
    Upload: string;
    Update: string;
  };
  Uri?: string;
  Meta?: {
    Views: number;
    Downloads: number;
    Ratings: {
      Total: number;
      Stars: number;
    };
  };
}