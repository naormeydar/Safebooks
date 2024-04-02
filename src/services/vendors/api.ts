import axios from 'axios';
import { BusinessVendor, IndependentVendor } from './types';

export const fetchVendors = (): Promise<
  Array<IndependentVendor | BusinessVendor>
> =>
  axios
    .get('/data/vendors.json', { baseURL: 'http://localhost:3000' })
    .then(({ data }) => data);
