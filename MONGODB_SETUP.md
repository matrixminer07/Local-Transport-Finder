# MongoDB Atlas Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free)

### Steps:
1. **Sign Up/Login**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create a free account or sign in

2. **Create Cluster**
   - Click "Build a Database"
   - Select "M0 Sandbox" (FREE)
   - Choose Cloud Provider and Region (closest to you)
   - Cluster Name: "local-transport"
   - Click "Create"

3. **Setup Security**
   - Create Database User:
     - Username: `admin`
     - Password: Generate a strong password (save it!)
   - Add IP Address:
     - Click "Add My Current IP Address"
     - Or add `0.0.0.0/0` for access from anywhere (less secure)

4. **Get Connection String**
   - Go to Database > Connect
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Connection String Format:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/local-transport
```

## Option 2: Local MongoDB Installation

### Windows:
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Install MongoDB Compass (GUI tool)
4. Start MongoDB service

### Connection String for Local:
```
mongodb://localhost:27017/local-transport
```

## Recommended:
Use MongoDB Atlas for easier setup and free hosting!
