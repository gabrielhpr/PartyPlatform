
// Receive a string containing pictures name
// Return an array containing pictures source
export async function getAllImages( s3obj: any, bucketName: string, imagesString: string ) {
    //console.log( imagesString );
    let imagesNameArr = imagesString.split(',');
    
    let images = [];

    for (let i=0; i < imagesNameArr.length; i++) {
        let img = await getUrlByFileName( s3obj, bucketName, imagesNameArr[i] )
        .then((img: any) => {
            return img;
        });
        images.push(img);
    }

    return images;
}


function getUrlByFileName(s3obj:any, bucketName: string, imgKey: string) {
    return new Promise((resolve, reject) => {
        s3obj.getObject({ Bucket: bucketName, Key: imgKey }, (err:any, file:any) => {
            var result =  'data:image/jpeg;base64,' + encode(file.Body);
            resolve(result)
        });
    });
}

function encode(data: any) {
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64;
}