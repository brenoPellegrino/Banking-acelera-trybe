/* eslint-disable max-lines */

export default interface Payload {
  id: number,
  email: string,
  accType: 'admin' | 'user',
  accStatus: 'active' | 'inactive',
};