export default interface IChangelog {
  Id: number;
  Title: string;
  Description: string;
  Version: {
    Number: string;
    Release: string;
  };
  Timestamp: {
    Upload: string;
    Update: string;
  };
}