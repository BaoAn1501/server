// const util = require("util");
// const multer = require("multer");
// const {
//     GridFsStorage
// } = require("multer-gridfs-storage");
// const dbConfig = require("../config/db");

// var storage = new GridFsStorage({
//     url: dbConfig.url + dbConfig.database,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-fpoly-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: dbConfig.imgBucket,
//             filename: `${Date.now()}-fpoly-${file.originalname}`
//         };
//     }
// });

// var uploadOneFile = multer({
//     storage: storage
// }).single("file");
// var uploadMultipleFile = multer({
//     storage: storage
// }).array("file", 10);
// var uploadOneFileMiddleware = util.promisify(uploadOneFile);
// var uploadMultipleFileMiddleware = util.promisify(uploadMultipleFile);
// module.exports =  { uploadOneFileMiddleware, uploadMultipleFileMiddleware };

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img')
        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

module.exports = multer({ storage: storage });