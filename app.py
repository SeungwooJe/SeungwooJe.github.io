from flask import Flask, request, jsonify
import os
import oss2
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

ACCESS_KEY_ID = os.getenv('OSS_ACCESS_KEY_ID')
ACCESS_KEY_SECRET = os.getenv('OSS_ACCESS_KEY_SECRET')
BUCKET_NAME = os.getenv('BUCKET_NAME')
REGION = os.getenv('REGION')

auth = oss2.Auth(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
bucket = oss2.Bucket(auth, f'https://{REGION}.aliyuncs.com', BUCKET_NAME)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    name = request.form['name']
    student_id = request.form['student_id']
    file_name = f"{name}_{student_id}.{file.filename.split('.')[-1]}"

    try:
        bucket.put_object(file_name, file)
        file_url = bucket.sign_url('GET', file_name, 3600)
        return jsonify({'url': file_url, 'message': 'File successfully uploaded'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/list_files', methods=['GET'])
def list_files():
    try:
        result = bucket.list_objects()
        files = [{'name': obj.key, 'url': bucket.sign_url('GET', obj.key, 3600)} for obj in result.object_list]
        return jsonify(files), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
