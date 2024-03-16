import axios from 'axios';

// A mock function to mimic making an async request for data
export async function fetchCount(value = 1) {
  const response = await axios.get('http://localhost:8080')
  return response; 
 
  
  // return new Promise((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
}
