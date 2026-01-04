# Google Maps API Key Setup Guide

## Steps to Get Your API Key:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter project name: "Local Transport Finder"
   - Click "CREATE"

3. **Enable APIs**
   - Go to "APIs & Services" > "Library"
   - Search and enable these APIs:
     - **Maps JavaScript API**
     - **Geocoding API**
     - **Places API**

4. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "+ CREATE CREDENTIALS"
   - Select "API key"
   - Copy the API key

5. **Secure Your API Key**
   - Click on the API key you just created
   - Under "Application restrictions", select "HTTP referrers"
   - Add: `http://localhost:3000/*` and `http://127.0.0.1:3000/*`
   - Click "SAVE"

## Important Notes:
- Keep your API key private and never commit it to Git
- The free tier includes $200 monthly credit (plenty for development)
- Enable billing is required, but you won't be charged unless you exceed limits

## Required APIs for this project:
- Maps JavaScript API (for displaying maps)
- Geocoding API (for converting addresses to coordinates)
- Places API (for autocomplete search)
