import crypto from 'crypto';


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '5d9c68c6f7b142f1c8b3a56b57c93bc6ae9654d7128ec4d8e5bd58177382cc55'; 
const IV_LENGTH = 16; 

export function encrypt(text) {
 
  const iv = crypto.randomBytes(IV_LENGTH);
  
  
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
 
  return iv.toString('hex') + ':' + encrypted;
}


export function decrypt(encryptedText) {
  try {
    
    const textParts = encryptedText.split(':');
    if (textParts.length !== 2) return encryptedText; 
    
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = textParts[1];
    
   
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );
    
   
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
   
    return encryptedText;
  }
}