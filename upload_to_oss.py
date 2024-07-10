import os
import oss2

ACCESS_KEY_ID = os.getenv('OSS_ACCESS_KEY_ID')
ACCESS_KEY_SECRET = os.getenv('OSS_ACCESS_KEY_SECRET')
BUCKET_NAME = os.getenv('BUCKET_NAME')
REGION = os.getenv('REGION')

auth = oss2.Auth(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
bucket = oss2.Bucket(auth, f'https://{REGION}.aliyuncs.com', BUCKET_NAME)

def upload_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            object_name = os.path.relpath(file_path, directory)
            bucket.put_object_from_file(object_name, file_path)
            print(f'Uploaded {file_path} to OSS as {object_name}')

upload_directory('.')

