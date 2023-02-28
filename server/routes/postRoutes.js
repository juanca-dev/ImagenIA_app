import express from 'express';
import * as dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();
const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.route('/').post(async (req, res) => {
    try {

        const { name, prompt, images } = req.body
        let imageUrls = [];
        let i = 0;

        for (let image of images) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrls.push(uploadedImage.secure_url);

            i += 1

            if (i === images.length) {
                const post = await Post.create({
                    name,
                    prompt,
                    images: imageUrls
                })

                res.status(200).json({ success: true, post })
            }
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})


//

router.route('/').get(async (req, res) => {
    try {

      const post = (await Post.find({})).reverse();  
        res.status(200).json({ success: true, post })
    }catch (error) {
    res.status(500).json({ error })
}

})

export default router;