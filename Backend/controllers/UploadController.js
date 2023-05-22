import admin from 'firebase-admin';
import multer from 'multer';
import multerStorage from 'multer-storage-cloud-storage';
import mongoose from 'mongoose'
import Property from '../models/Property'
import dotenv from''
admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: 'YOUR_PRIVATE_KEY',
      clientEmail: 'YOUR_CLIENT_EMAIL',
    }),
    storageBucket: 'YOUR_STORAGE_BUCKET',
  });