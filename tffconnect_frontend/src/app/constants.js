let API_URL = 'http://localhost:8000/api'
let IMAGE_URL = 'http://localhost:8000'

if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://tffconnect.com/api';
    IMAGE_URL = 'https://tffconnect.com';
}

export { API_URL, IMAGE_URL };
