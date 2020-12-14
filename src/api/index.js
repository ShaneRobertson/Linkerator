import axios from 'axios';
//makes requests to the server
// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getSomething() {
  try {
    const { data } = await axios.get('/api/links');
    return data;
  } catch (error) {
    throw error;
  }
}