/* eslint-disable max-lines */
export default interface IUsers {
  id: number,
  cpfCnpj: string,
  name: string,
  email: string,
  password: string,
  accStatus: "active" | "inactive",
  accType: "admin" | "user"
}
