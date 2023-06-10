import axios from 'axios';

// A mock function to mimic making an async request for data
export async function fetchCount(amount = 1) {
  const response = await axios.get('http://localhost:8080')
  const data = response.data; 
  return data; 
  
  // return new Promise((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
}
