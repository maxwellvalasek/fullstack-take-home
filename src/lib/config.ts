// lib/config.ts

export const config = {
  // API Configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  
  // API Endpoints
  endpoints: {
    upload: '/upload',
    savePortfolio: '/save-portfolio', 
    loadPortfolio: '/load-portfolio',
    uploads: '/uploads'
  },
  
  // Helper functions
  getApiUrl: (endpoint: string) => `${config.apiBaseUrl}${endpoint}`,
  getUploadUrl: (filename: string) => `${config.apiBaseUrl}${config.endpoints.uploads}/${filename}`,
  getUploadEndpoint: () => `${config.apiBaseUrl}${config.endpoints.upload}`,
  getSavePortfolioEndpoint: () => `${config.apiBaseUrl}${config.endpoints.savePortfolio}`,
  getLoadPortfolioEndpoint: (userId: string) => `${config.apiBaseUrl}${config.endpoints.loadPortfolio}/${userId}`,
}; 
