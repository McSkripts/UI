export default interface Image {
  Id?: number;
  File: {
    Name: string;
    Type: string;
    Location: string;
  };
}