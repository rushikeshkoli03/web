var express = require('express');
var app = express();

const Storage = require('@google-cloud/storage');

const projectId = 'newcode-199805';

const storage = new Storage( {
   projectId: projectId,
   keyFilename: 'key.json'
});

const bucketName = 'my-new-newcode';
var myBucket = storage.bucket(bucketName);

const options = {
    action: 'read',
    expires: '03-17-2025',
  };

var filename = "img.png";

app.get("/", function(req, res) {
   storage
     .bucket(bucketName)
     .file(filename)
     .getSignedUrl(options)
     .then(results => {
       const url = results[0];
       res.render("showImg.ejs", {url: url});
       console.log(`The signed url for ${filename} is ${url}.`);
     })
     .catch(err => {
       console.error('ERROR:', err);
     });
});

app.listen(8080, () => {
   console.log("Server started");
});

//
// let localFileLocation = './img.png';
// storage
//     .bucket(bucketName)
//     .upload(localFileLocation)
//     .then(() => {
//       console.log(`${localFileLocation} uploaded to ${bucketName}.`);
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// storage
//    .createBucket(bucketName)
//    .then(() => {
//       console.log('Bucket ${bucketName} created.');
//    })
//    .catch(err => {
//       console.log('Error: ', err);
//    });
