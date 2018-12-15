import { Platform } from 'react-native'
import { Storage } from 'aws-amplify';
import RNFetchBlob from 'react-native-fetch-blob';

const photosDirectory = 'photos/';

/**
 * Uploads the given file to AWS S3 bucket
 * @param {response object from ImagePicker} fileObj 
 * @param {AWS Amplify Storage options} options 
 */
export function uploadFile(fileObj, options)	{
  const fileUri = getFileUriForPlatform(fileObj.uri);

  readFile(fileUri).then(buffer => {
    const key = photosDirectory + fileObj.fileName;
    Storage.put(key, buffer, options)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }).catch(e => {
      console.log(e);
  });
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