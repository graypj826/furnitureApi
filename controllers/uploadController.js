const mongoose          = require('mongoose');
const express           = require('express');
const router            = express.Router();
const path              = require('path');
const crypto            = require('crypto');
const multer            = require('multer');
const GridFsStorage     = require('multer-gridfs-storage');
const Grid              = require('gridfs-stream');

const conn = mongoose.createConnection('mongodb://localhost:27017/marketplace', { useNewUrlParser: true });

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/marketplace',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });

// @route GET /
// @desc loads form
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // check if files
        if (!files || files.length === 0) {
            res.render('../views/index', {files: false});
        } else {
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('../views/index', {files: files});
        }
    });
});

// @route POST /upload
// @desc uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
});

// @route GET /files
// @desc display all files in JSON
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        // files exist
        return res.json(files); 
    });
});

// @route GET /files/:filename
// @desc display single file object
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // check if file
        if (!file) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // file exists
        return res.json(file); 
    });
});

// @route GET /image/:filename
// @desc display image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // check if file
        if (!file) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

// @route DELETE /files/:id
// @desc Delete file
router.delete('/files/:id', (req, res) => {
    gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.redirect('/');
    });
});

module.exports = router;