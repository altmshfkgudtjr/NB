from flask import Flask, render_template, redirect, request, jsonify
from werkzeug import secure_filename
import nb_path
import dbinit
import md5
import MySQLdb
import os
from datetime import datetime
app = Flask(__name__)

#이미지 파일 저장 경로
IMG_PATH = "/static/images/"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

#이미지 파일 허용 형식
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
'''
@app.route('/')
def mainTemplate():
	return render_template('main.html')	#같은 폴더 내 templates 파일 내에 둬야 한다.
'''
@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')
@app.route('/about')
def about():
	return render_template('about.html')
@app.route('/services')
def services():
	return render_template('services.html')
@app.route('/portfolio')
def portfolio():
	return render_template('portfolio.html')
@app.route('/contact')
def contact():
	return render_template('contact.html')
@app.route('/adminNB')
def adminNB():
	return render_template('admin.html')
@app.route('/login', methods=['POST'])
def validateLogin():
	username = request.form['ID']
	password = request.form['PW']
	hash_id = md5.to_hash(username)
	hash_pw = md5.to_hash(password)
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "SELECT id, pw FROM user"
	cur.execute(query)
	data = cur.fetchone()
	connect.close()
	if (hash_id == data[0] and hash_pw == data[1]):
		print("Admin Login Success")
		return render_template('setting.html')
	else:
		print("Wrong ID or PW")
		return	render_template('admin.html')
@app.route('/experienceSubmit', methods=['POST'])
def insertExperience():
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	subject = json['subject']
	project = json['project']
	location = json['location']
	startdate = json['startdate']
	enddate = json['enddate']
	#DB 삽입
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "INSERT INTO experience (subject, project, location, startdate, enddate) VALUES (%s, %s, %s, %s, %s)"
	cur.execute(query, (subject, project, location, startdate, enddate))
	connect.commit()
	connect.close()
	#종료
	return jsonify(result = "success")
@app.route('/educationSubmit', methods=['POST'])
def insertEducation():
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	subject = json['subject']
	project = json['project']
	location = json['location']
	startdate = json['startdate']
	enddate = json['enddate']
	#DB 삽입
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "INSERT INTO education (subject, project, location, startdate, enddate) VALUES (%s, %s, %s, %s, %s)"
	cur.execute(query, (subject, project, location, startdate, enddate))
	connect.commit()
	connect.close()
	#종료
	return jsonify(result = "success")
@app.route('/projectSubmit', methods=['POST'])
def insertProject():
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	about = json.get('about')
	subject = json.get('subject')
	body = json.get('body')
	url = json.get('url')
	#이미지 파일 저장 부분
	img = request.files.get('img')
	if img is not None:
		filename = subject + "_" + datetime.today().strftime("%Y%m%d%H%M%S") + "." + secure_filename(img.filename).split(".")[-1]
		print("\nFILE NAME IS ::" + filename + "\n")
		if not allowed_file(filename):
			abort(400)
		img.save('.' + IMG_PATH + filename)
	else:
		filename = None
	if filename is not None and allowed_file(filename) is False:
		print("ERROR :: IMAGE INSERT FAILED!")
		abort(400)
	print(filename, "filename\n")
	#DB 삽입
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "INSERT INTO project (about, subject, body, url, img) VALUES (%s, %s, %s, %s, %s)"
	cur.execute(query, (about, subject, body, url, filename))
	connect.commit()
	connect.close()
	#종료
	return jsonify(result = "success")
@app.route('/introduceSubmit', methods=['POST'])
def insertIntroduce():
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	old = json.get('old')
	project = json.get('project')
	competition = json.get('competition')
	print(old, project, competition)
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "UPDATE introduce SET old=%s, project=%s, competition=%s WHERE user_id=1"
	cur.execute(query, (old, project, competition))
	connect.commit()
	connect.close()
	return jsonify(result = "success")
#experience 테이블 정보 반환
@app.route('/experienceInfo', methods=['POST'])
def experienceInfo():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "SELECT * FROM experience"
	cur.execute(query)
	datas = cur.fetchall()
	connect.close()
	return jsonify(datas)
#education 테이블 정보 반환
@app.route('/educationInfo', methods=['POST'])
def educationInfo():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "SELECT * FROM education"
	cur.execute(query)
	datas = cur.fetchall()
	connect.close()
	return jsonify(datas)
#project 테이블 정보 반환
@app.route('/projectInfo', methods=['POST'])
def projectInfo():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "SELECT * FROM project"
	cur.execute(query)
	datas = cur.fetchall()
	connect.close()
	return jsonify(datas)
#introduce 테이블 정보 반환
@app.route('/introduceInfo', methods=['POST'])
def introduceInfo():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	query = "SELECT * FROM introduce"
	cur.execute(query)
	data = cur.fetchone()
	connect.close()
	return jsonify(data)
#experience 테이블 정보 삭제
@app.route('/experienceDelete', methods=['POST'])
def experienceDelte():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	postid = json['post_id']
	query = "DELETE FROM experience WHERE post_id = %s"
	cur.execute(query, (postid))
	connect.commit()
	connect.close()
	return jsonify(result = "success")
#education 테이블 정보 삭제
@app.route('/educationDelete', methods=['POST'])
def educationDelte():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	postid = json['post_id']
	query = "DELETE FROM education WHERE post_id = %s"
	cur.execute(query, (postid))
	connect.commit()
	connect.close()
	return jsonify(result = "success")	
#project 테이블 정보 삭제
@app.route('/projectDelete', methods=['POST'])
def projectDelte():
	connect = dbinit.db_connect()
	cur = connect.cursor()
	json = request.form
	if (json == None):
		print("\nNB_ERROR: CAN NOT FIND FORM DATA\n")
		return
	postid = json['post_id']
	query = "DELETE FROM project WHERE post_id = %s"
	cur.execute(query, (postid))
	connect.commit()
	connect.close()
	return jsonify(result = "success")	
	
'''
if __name__ == '__main__':
	app.run(port=8000)
'''
if __name__ == '__main__':
	dbinit.init_db()
	dbinit.init_table()
	dbinit.insert_admin()
	dbinit.insert_introduce()
	app.run(host='0.0.0.0', port=80, debug = True) # Web 기본 포트번호는 80이다.