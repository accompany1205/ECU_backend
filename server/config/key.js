import dotenv from 'dotenv'

// initializing env variables
try {
  dotenv.config()
} catch (e) {
  console.log('Could not find .env file. Continuing..')
}

const localhost = '127.0.0.1'
const keys = {
  // mongoURI: "mongodb://URL:27017/myproject"
  mongoURI: `${process.env.DB_CONNECT || localhost}`,
  siteURL: `${process.env.SITE_URL || localhost}`,
  secretOrKey: `${process.env.SECRETORKEY || secretOrKey}`,
  port: process.env.PORT,
  userVerificationTokenSecret: `${process.env.USER_VERIFICATION_TOKEN_SECRET || userVerificationTokenSecret}`,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD
};

export default keys