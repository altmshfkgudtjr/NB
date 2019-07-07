import hashlib

#패스워드 해시 암호화
def to_hash(pw):
	sha = hashlib.new('md5')
	sha.update(pw.encode('utf-8'))
	print(sha.hexdigest())
	return sha.hexdigest()