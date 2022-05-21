var aws = require("aws-sdk");
import { fromIni } from "@aws-sdk/credential-providers";
var multer = require('multer');
var multerS3 = require('multer-s3');

aws.config.update({region: 'us-east-1'});

var s3 = new aws.S3({ 
    //region: 'us-east-1',
    apiVersion: 'latest',
    // credentials: fromIni({
    //     profile: "default",
    //     filepath: "~/.aws/credentials"
    // })
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'festafy-images-bucket',
        metadata: function (req:any, file:any, cb:any) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req:any, file:any, cb:any) {
            cb(null, Date.now().toString());
        }
    }),
    fileFilter(req:any, file:any, cb:any) {
        if( !file.originalname.match(/\.(png|jpg|jpeg)$/) ) {
            return cb(new Error('Por favor, envie apenas jpg ou png'));
        }
        cb(undefined, true);
    }
})

module.exports = { upload };
