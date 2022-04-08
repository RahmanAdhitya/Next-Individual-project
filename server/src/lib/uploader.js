//this page is controller or middleware to upload file
const multer = require('multer');
const { nanoid } = require('nanoid');

const fileUploader = (isPostContent = true, { destinationFolder = 'posts', prefix = 'POST', fileType = 'image' }) => {
  if (!isPostContent) {
    destinationFolder = 'profile_picture';
    prefix = 'Profile';
    fileType = 'image';
  }
  // multer.diskSorage is for setup location where file is stored
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      //the result file.mimetype = {mimetype: 'image/jpeg'}, use split method to get the index [1] value which is JPEG
      const fileExtension = file.mimetype.split('/')[1];

      // to provide file name such POST_nanoid.jpeg, use nanoid to provide uniq name
      const filename = `${prefix}_${nanoid()}.${fileExtension}`;

      cb(null, filename);
    },
  });

  //main function to uploadfile
  const uploader = multer({
    storage: storageConfig,

    //this function is to confirm the type of file that allowed to upload
    fileFilter: (req, file, cb) => {
      console.log(file);

      //the result file.mimetype = {mimetype: 'image/jpeg'}, use split method to get the index [0] value which is image
      if (file.mimetype.split('/')[0] != fileType) {
        return cb(null, false);
      }
      // cb adalah untuk confirmasi untuk lanjut atau stop, seperti next()
      // jika cd(null, false) artinya akan tetap di lanjutkan fungsinya ke middleware / conntorlerr namun file tidak di upload
      cb(null, true);
    },
  });

  return uploader;
};

module.exports = fileUploader;
