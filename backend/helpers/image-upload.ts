const multer = require('multer');
const path = require('path');

// Destination to store the images
const imageStorage = multer.diskStorage({
    
    destination: function (req:any, file:any, cb:any) {
        let folder = '';

        if( req.baseUrl.includes('enterprise') ) {
            folder = 'enterprise';
        }
        else if (req.baseUrl.includes('services')) {
            folder = 'services';
        }

        cb(null, `public/images/${folder}`);
    },
    filename: function (req:any, file:any, cb:any) {
        cb(
            null, 
            Date.now() +
            String(Math.floor(Math.random() * 1000)) +
            path.extname(file.originalname)
        );
    },
})

const imageUpload = multer({
    storage: imageStorage, 
    fileFilter(req:any, file:any, cb:any) {
        if( !file.originalname.match(/\.(png|jpg|jpeg)$/) ) {
            return cb(new Error('Por favor, envie apenas jpg ou png'));
        }
        cb(undefined, true);
    }
})

module.exports = { imageUpload };