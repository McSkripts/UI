export default interface Product {
  Id: Number;
  Type: String;
  Title: String;
  Description: String;
  Version: Array<{
    Number: String;
    Release: String;
  }>;
  Price: Array<{
    Amount: String;
    Currency: String;
  }>;
  Timestamp: Array<{
    Upload: String;
    Update: String;
  }>;
  Uri?: String;
  Meta?: Array<{
    Views: Number;
    Downloads: Number;
    Ratings: Array<{
      Total: Number;
      Stars: Number;
    }>;
  }>;
}