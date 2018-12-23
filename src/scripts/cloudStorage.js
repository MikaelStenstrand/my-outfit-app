import { Platform } from 'react-native'
import { Storage } from 'aws-amplify';
import RNFetchBlob from 'react-native-fetch-blob';

const photosDirectory = 'garments/';
// S3 upload configuration
// https://aws-amplify.github.io/docs/js/storage#file-access-levels
const defaultUploadOptions = {
  contentType: 'image/jps',
  level: 'private'
};
const defaultGeteOptions = {
  level: 'private'
}

/**
 * Uploads the given file to AWS S3 bucket
 * @param {response object from ImagePicker} fileObj
 * @param {AWS Amplify Storage options} options
 */
export async function uploadFile(fileObj, options)	{
  const uploadOptions = options || defaultUploadOptions;
  const fileUri = getFileUriForPlatform(fileObj.uri);
  try {
    const buffer = await readFile(fileUri)
    const key = photosDirectory + fileObj.fileName;
    const result = await Storage.put(key, buffer, options);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotoFromCloud(photoURI, options)  {
  const getOptions = options || defaultGeteOptions;
  let image = await Storage.get(photoURI, getOptions);
  return image
}

function readFile(filePath) {
  return RNFetchBlob.fs.readFile(filePath, 'base64')
    .then(data => new Buffer(data, 'base64'));
}

function getFileUriForPlatform(fileUri)  {
  if (Platform.OS === 'ios') {
    return fileUri.replace('file://', '');
  } else {
    return fileUri;
  }
}