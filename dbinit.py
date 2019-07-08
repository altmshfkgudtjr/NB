import MySQLdb
import md5

##############################################
ID = "root"
PW = "imlisgod"
admin_id = "altmgudtjr"
admin_pw = "supernb"
##############################################

#MySQL 서버에 로그인하고 연결하는 작업
def server_connect():
	connect = MySQLdb.connect(host='localhost', user=ID, password=PW,charset='utf8mb4')
	return connect
#MySQL 서버에 로그인하고 DB와 연결하는 작업
def db_connect():
	connect = MySQLdb.connect(host='localhost', user=ID, password=PW, db='NB', charset='utf8mb4')
	return connect

#DB 없으면 생성[Fisrt]
def init_db():
	connect = server_connect()
	cur = connect.cursor()
	cur.execute("CREATE DATABASE IF NOT EXISTS nb")
	connect.commit()
	connect.close()

#NB 테이블 생성[Second]
def init_table():
	connect = db_connect()
	cur = connect.cursor()
	#experience 테이블 생성
	query = "CREATE TABLE IF NOT EXISTS experience (post_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	subject VARCHAR(100) NOT NULL,\
	project VARCHAR(50) NOT NULL,\
	location VARCHAR(50) NOT NULL,\
	startdate VARCHAR(10) NOT NULL,\
	enddate VARCHAR(10) NOT NULL)\
	ENGINE=MyISAM DEFAULT CHARSET=utf8mb4"
	cur.execute(query)
	connect.commit()
	#education 테이블 생성
	query = "CREATE TABLE IF NOT EXISTS education (post_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	subject VARCHAR(100) NOT NULL,\
	project VARCHAR(50) NOT NULL,\
	location VARCHAR(50) NOT NULL,\
	startdate VARCHAR(10) NOT NULL,\
	enddate VARCHAR(10) NOT NULL)\
	ENGINE=MyISAM DEFAULT CHARSET=utf8mb4"
	cur.execute(query)
	connect.commit()
	#project 테이블 생성
	query = "CREATE TABLE IF NOT EXISTS project (post_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	about VARCHAR(100) NOT NULL,\
	subject VARCHAR(50) NOT NULL,\
	body VARCHAR(300) NOT NULL,\
	url VARCHAR(200) DEFAULT NULL,\
	img VARCHAR(100) NOT NULL)\
	ENGINE=MyISAM DEFAULT CHARSET=utf8mb4"
	cur.execute(query)
	connect.commit()
	#user 테이블 생성
	query = "CREATE TABLE IF NOT EXISTS user (user_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	id VARCHAR(35) NOT NULL,\
	pw VARCHAR(35) NOT NULL,\
	UNIQUE INDEX (id, pw))"
	cur.execute(query)
	connect.commit()
	#introduce 테이블 생성
	query = "CREATE TABLE IF NOT EXISTS introduce (user_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	old INT(10) NOT NULL DEFAULT 20,\
	project INT(10) NOT NULL DEFAULT 0,\
	competition INT(10) NOT NULL DEFAULT 0,\
	UNIQUE INDEX (old, project, competition)) ENGINE=MyISAM"
	cur.execute(query)
	connect.commit()
	connect.close()

#admin 계정 추가[Third]
def insert_admin():
	connect = db_connect()
	cur = connect.cursor()
	query = query = "INSERT IGNORE INTO user (id, pw) VALUES (%s, %s)"
	id_hash = md5.to_hash(admin_id)
	pw_hash = md5.to_hash(admin_pw)
	cur.execute(query, (id_hash, pw_hash))
	connect.commit()

#introduce 데이터 추가[Third]
def insert_introduce():
	connect = db_connect()
	cur = connect.cursor()
	query = query = "INSERT IGNORE INTO introduce (old, project, competition) VALUES (%s, %s, %s)"
	cur.execute(query, (20, 0, 0))
	connect.commit()