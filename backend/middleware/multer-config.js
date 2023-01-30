const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            //we create "storage" to then pass it to multer
  destination: (req, file, callback) => {       //and tell it where to save incoming files
    callback(null, 'images');                   //"destination" indicates to save the files in the "images" folder
  },
  filename: (req, file, callback) => {      
    let name = file.originalname.split(' ').join('_');    //filename: we remove the spaces, and replace them
    let extension = MIME_TYPES[file.mimetype];            //by "_"; and add a date
    name = name.replace("." + extension, "_");
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');