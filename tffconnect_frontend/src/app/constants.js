let API_URL = 'http://localhost:8000/api'

if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://tffconnect.com/api'
}

export { API_URL };
