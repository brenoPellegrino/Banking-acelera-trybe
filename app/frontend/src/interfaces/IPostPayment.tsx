export default interface IPostPayment {
  body: {
    value: number;
  };
  headers: {
    authentication: string;
  };
}