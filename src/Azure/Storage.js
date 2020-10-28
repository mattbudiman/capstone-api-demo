const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions
} = require('@azure/storage-blob');

const accountName = process.env.STORAGE_ACCOUNT_NAME;
const accountKey = process.env.STORAGE_ACCOUNT_KEY;

const accountUrl = `https://${accountName}.blob.core.windows.net`;

const containerName = process.env.STORAGE_CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);


const blobServiceClient = new BlobServiceClient(accountUrl, sharedKeyCredential);

const containerClient = blobServiceClient.getContainerClient(containerName);


// Returns url of uploaded call
async function uploadCall(file, callId) {
  const blobName = `${callId}.wav`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload audio file to Azure blob storage
  await blockBlobClient.upload(file.buffer, file.size);

  const audioUrl = blockBlobClient.url;
  console.log('Audio upload to:', audioUrl);
  return audioUrl;
}

// Get SAS url to a call so client can access
function getSasUrl(callId) {
  const blobName = `${callId}.wav`;
  const sas = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'),
      expiresOn: new Date(new Date().valueOf() + 1.2e+6)  // 20 minute access
    },
    sharedKeyCredential
  );
  const sasUrl = `${accountUrl}/${containerName}/${blobName}?${sas}`;
  return sasUrl;
}

module.exports = {
  uploadCall,
  getSasUrl
}
