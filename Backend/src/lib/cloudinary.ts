import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv";

config();

// object contains credentials that identify my Cloudinary account.
const argument = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

/**
 * @summary
 *  this function:
 *      -> Stores these credentials inside the Cloudinary SDK
 *      -> Allows the SDK to authenticate future API calls -> what is SDK ? 
 *      -> Needs to be called once at app startup
 */
cloudinary.config(argument);

export default cloudinary;