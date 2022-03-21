export default interface Image {
  Id?: Number;
  File: Array<{
    Name: String;
    Type: String;
    Location: String;
  }>;
}