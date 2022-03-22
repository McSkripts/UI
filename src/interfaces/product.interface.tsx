export default interface Product {
  Id: Number;
  Type: String;
  Title: String;
  Description: String;
  Version: {
    Number: String;
    Release: String;
  };
  Price: {
    Amount: Number;
    Currency: String;
  };
  Timestamp: {
    Upload: String;
    Update: String;
  };
  Uri?: String;
  Meta?: {
    Views: Number;
    Downloads: Number;
    Ratings: {
      Total: Number;
      Stars: Number;
    };
  };
}