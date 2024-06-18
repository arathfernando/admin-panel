import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});
const awsBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
  region: process.env.REACT_APP_REGION,
});

export default awsBucket;
