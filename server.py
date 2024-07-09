from flask import Flask, request, redirect, url_for
from datetime import datetime
import pytz
import onedrive
import git
import xml.etree.ElementTree as ET

app = Flask(__name__)

# OneDrive 설정
onedrive_client = onedrive.Client(client_id='YOUR_CLIENT_ID', client_secret='YOUR_CLIENT_SECRET', redirect_uri='YOUR_REDIRECT_URI')

@app.route('/submit_assignment', methods=['POST'])
def submit_assignment():
    name = request.form['name']
    student_id = request.form['student_id']
    advisor = request.form['advisor']
    file = request.files['file']

    # 베이징 시간으로 현재 시간 가져오기
    beijing_tz = pytz.timezone('Asia/Shanghai')
    submission_time = datetime.now(beijing_tz).strftime('%Y-%m-%d %H:%M:%S')

    # OneDrive에 파일 업로드
    file_path = onedrive_client.upload(file.filename, file.stream)

    # XML 파일 생성
    xml_data = create_xml(name, student_id, advisor, submission_time, file_path)
    xml_filename = f"{student_id}_submission.xml"
    with open(xml_filename, 'w') as xml_file:
        xml_file.write(xml_data)

    # XML 파일 업로드
    onedrive_client.upload(xml_filename, open(xml_filename, 'rb'))

    # 과제 정보를 Git에 커밋
    commit_to_git(student_id, file.filename, xml_filename, submission_time)

    return redirect(url_for('submission_success'))

@app.route('/submission_success')
def submission_success():
    return "Assignment successfully submitted!"

def create_xml(name, student_id, advisor, submission_time, file_path):
    submission = ET.Element("submission")
    ET.SubElement(submission, "name").text = name
    ET.SubElement(submission, "student_id").text = student_id
    ET.SubElement(submission, "advisor").text = advisor
    ET.SubElement(submission, "submission_time").text = submission_time
    ET.SubElement(submission, "file_path").text = file_path

    return ET.tostring(submission, encoding='unicode', method='xml')

def commit_to_git(student_id, filename, xml_filename, submission_time):
    repo = git.Repo('path/to/repo')
    repo.git.add('path/to/' + filename)
    repo.git.add('path/to/' + xml_filename)
    commit_message = f'Submission by {student_id} at {submission_time}'
    repo.index.commit(commit_message)
    repo.remote().push()

if __name__ == '__main__':
    app.run(debug=True)

def commit_to_git(student_id, filename, xml_filename, submission_time):
    repo = git.Repo('path/to/repo')
    repo.git.add('path/to/' + filename)
    repo.git.add('path/to/' + xml_filename)
    commit_message = f'Submission by {student_id} at {submission_time}'
    repo.index.commit(commit_message)
    repo.remote().push()
