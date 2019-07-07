//에이작스 함수
function AJAX(type, url, data) {
	ajax_ = $.ajax({
		type: type,
		url: url,
		data: data,
		dataType : "json",
		contentType: false,
		processData: false,
		success: function(){
			alert("업로드 완료")
		},
		error: function(){
			alert("업로드 실패");
		}
	});
	return ajax_
}
//에이작스 함수
function GET_AJAX(type, url, data) {
	ajax_ = $.ajax({
		type: type,
		url: url,
		data: data,
		dataType : "json",
		contentType: false,
		processData: false,
		success: function(res){
		},
		error: function(res){
		}
	});
	return ajax_
}
//Experience 포스트 추가
function experienceSubmit(){
	var subject = $('#experience_subject').val()
	var project = $('#experience_project').val()
	var location = $('#experience_location').val()
	var startdate = $('#experience_startdate').val()
	var enddate = $('#experience_enddate').val()

	// 하나라도 빈 값이 있으면 함수 반환
	if (subject=='' || project=='' || location=='' || startdate=='' || enddate==''){
		alert("정보를 전부 입력해주세요.")
		return;
	}

	// JSON 데이터로 만들어주는 과정
	var obj = new FormData();
	obj.append('subject', subject);
	obj.append('project', project);
	obj.append('location', location);
	obj.append('startdate', startdate);
	obj.append('enddate', enddate);

	// AJAX 함수 호출
	var a_jax = AJAX("POST", "/experienceSubmit", obj)
}
//Education 포스트 추가
function educationSubmit(){
	var subject = $('#education_subject').val()
	var project = $('#education_project').val()
	var location = $('#education_location').val()
	var startdate = $('#education_startdate').val()
	var enddate = $('#education_enddate').val()

	// 하나라도 빈 값이 있으면 함수 반환
	if (subject=='' || project=='' || location=='' || startdate=='' || enddate==''){
		alert("정보를 전부 입력해주세요.")
		return;
	}

	// JSON 데이터로 만들어주는 과정
	var obj = new FormData();
	obj.append('subject', subject);
	obj.append('project', project);
	obj.append('location', location);
	obj.append('startdate', startdate);
	obj.append('enddate', enddate);

	// AJAX 함수 호출
	var a_jax = AJAX("POST", "/educationSubmit", obj)
}
//Project 포스트 추가
function projectSubmit(){
	var about = $('#project_about').val()
	var subject = $('#project_subject').val()
	var body = $('#project_body').val()
	var url = $('#project_url').val()
	var img = document.getElementById('project_img').files[0];

	// 하나라도 빈 값이 있으면 함수 반환
	if (about=='' || subject=='' || body=='' || img==''){
		alert("정보를 전부 입력해주세요.")
		return;
	}

	// JSON 데이터로 만들어주는 과정
	var obj = new FormData();
	obj.append('about', about);
	obj.append('subject', subject);
	obj.append('body', body);
	obj.append('url', url);
	obj.append('img', img);
	// AJAX 함수 호출
	var a_jax = AJAX("POST", "/projectSubmit", obj)
}
//Introduce 정보 수정
function NB_introduce_submit() {
	var old = $('#myOld').text();
	var project = $('#myProject').text();
	var competition = $('#myCompetition').text();

	var obj = new FormData();
	obj.append('old', old);
	obj.append('project', project);
	obj.append('competition', competition);

	var a_jax = AJAX("POST", "/introduceSubmit", obj)
}

//experience 포스트 게시
function getExperience(){
	var target = document.getElementById("NB_experience_insert")
	var a_jax = GET_AJAX("POST", "/experienceInfo", null)
	$.when(a_jax).done(function(){
		datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_subject = datas[i][1]
			NB_project = datas[i][2]
			NB_location = datas[i][3]
			NB_startdate = datas[i][4]
			NB_enddate = datas[i][5]
			NB_subject = NB_subject.replace(/&/g, "&amp;")
			NB_str = '<div class="exp-wrap py-4">\
    					<div class="desc">\
	   						<h4>'+NB_subject+'<br><span> - '+NB_project+'</span> </h4>\
	   						<p class="location">'+NB_location+'</p>\
    					</div>\
    					<div class="year">\
    						<p>'+NB_startdate+' - '+NB_enddate+'</p>\
    					</div>\
    				</div>'
    		target.insertAdjacentHTML('afterend', NB_str)
		}
	})
	getEducation()
}

//education 포스트 게시
function getEducation(){
	var target = document.getElementById("NB_education_insert")
	var a_jax = GET_AJAX("POST", "/educationInfo", null)
	$.when(a_jax).done(function(){
		datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_subject = datas[i][1]
			NB_project = datas[i][2]
			NB_location = datas[i][3]
			NB_startdate = datas[i][4]
			NB_enddate = datas[i][5]
			NB_subject = NB_subject.replace(/&/g, "&amp;")
			NB_str = '<div class="exp-wrap py-4">\
    					<div class="desc">\
	   						<h4>'+NB_subject+'<span> - '+NB_project+'</span> </h4>\
	   						<p class="location">'+NB_location+'</p>\
    					</div>\
    					<div class="year">\
    						<p>'+NB_startdate+' - '+NB_enddate+'</p>\
    					</div>\
    				</div>'
    		target.insertAdjacentHTML('afterend', NB_str)
		}
	})
}

//portfolio 포스트 게시
function getPortfolio(){
	var target = document.getElementById("NB_portfolio_insert")
	var a_jax = GET_AJAX("POST", "/projectInfo", null)
	$.when(a_jax).done(function(){
		var datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_about = datas[i][1]
			NB_subject = datas[i][2]
			NB_body = datas[i][3]
			NB_url = datas[i][4]
			NB_img = datas[i][5]
			NB_about = NB_about.replace(/&/g, "&amp;")
			NB_body = NB_body.replace(/&/g, "&amp;")
			var div1 = document.createElement('div');
			//div1.classList.add("block-3 d-md-flex ftco-animate fadeInUp ftco-animated");
			div1.setAttribute("class", "block-3 d-md-flex");
			var a1 = document.createElement('a');
			if (i==0 || i%2 ==0){
				a1.setAttribute("class", "image d-flex justify-content-center align-items-center NB_img_set");	
			}else {
				a1.setAttribute("class", "image order-2 d-flex justify-content-center align-items-center NB_img_set");
			}
			a1.setAttribute("style", "background-image: url('../static/images/"+NB_img+"');");
			div1.append(a1);
			var div2 = document.createElement('div');
			if (i==0 || i%2 ==0){
				div2.setAttribute("class", "text");
			}else {
				div2.setAttribute("class", "text order-1");
			}
			var tag_h4 = document.createElement('h4');
			tag_h4.setAttribute("class", "subheading");
			tag_h4.append(NB_about);
			var tag_h2 = document.createElement('h2');
			tag_h2.setAttribute("class", "heading");
			tag_h2.append(NB_subject);
			var p1 = document.createElement('p');
			p1.append(NB_body);
			div2.append(tag_h4);
			div2.append(tag_h2);
			div2.append(p1);
			if (NB_url != ""){
				var p2 = document.createElement('p');
				var a2 = document.createElement('a');
				a2.setAttribute("href", NB_url);
				a2.setAttribute("target", "_blank");
				a2.append("프로젝트 보기")
				p2.append(a2);
				div2.append(p2);
				console.log(div2);
			}
			div1.append(div2);
			target.prepend(div1);
    		//target.insertAdjacentHTML('afterbegin', NB_str)
		}
	})
}
//introduce 테이블 정보 가져오기
function getIntroduce(){
	var a_jax = GET_AJAX("POST", "/introduceInfo", null)
	$.when(a_jax).done(function(){
		var data = a_jax.responseJSON;
		old = data[1];
		project = data[2];
		competition = data[3];
		$('#myOld').append(old);
		$('#myProject').append(project);
		$('#myCompetition').append(competition);
		$('#old_NB').attr('data-number', old);
		$('#project_NB').attr('data-number', project);
		$('#competition_NB').attr('data-number', competition);
	})
}


function readURL(input) {
 		if (input.files && input.files[0]) {
        	var reader = new FileReader();
        	reader.onload = function (e) {
            	$('#project_image').css('background-image', "url('"+e.target.result+"')");
        	} 
        	reader.readAsDataURL(input.files[0]);
    	}
	}
//setting.html JS 파일
$("#project_img").change(function(){
    readURL(this);
});
//setting.html 시작할때 실행하는 함수
function setIntroduce() {
	getIntroduce();
	NB_delete_experience_add();
	NB_delete_education_add();
	NB_delete_portfolio_add();
}
function NB_old_minus() {
	var nowOld = $('#myOld').text();
	$('#myOld').empty()
	nowOld *= 1;
	nowOld -= 1;
	$('#myOld').append(nowOld);
}
function NB_old_plus() {
	var nowOld = $('#myOld').text();
	$('#myOld').empty();
	nowOld *= 1;
	nowOld += 1;
	$('#myOld').append(nowOld);
}
function NB_project_minus() {
	var nowProject = $('#myProject').text();
	$('#myProject').empty()
	nowProject *= 1;
	nowProject -= 1;
	$('#myProject').append(nowProject);
}
function NB_project_plus() {
	var nowProject = $('#myProject').text();
	$('#myProject').empty();
	nowProject *= 1;
	nowProject += 1;
	$('#myProject').append(nowProject);
}
function NB_competition_minus() {
	var nowCompetition = $('#myCompetition').text();
	$('#myCompetition').empty()
	nowCompetition *= 1;
	nowCompetition -= 1;
	$('#myCompetition').append(nowCompetition);
}
function NB_competition_plus() {
	var nowCompetition = $('#myCompetition').text();
	$('#myCompetition').empty();
	nowCompetition *= 1;
	nowCompetition += 1;
	$('#myCompetition').append(nowCompetition);
}
function NB_delete_experience_add() {
	var target = document.getElementById("NB_deleteExperience");
	var a_jax = GET_AJAX("POST", "/experienceInfo", null)
	$.when(a_jax).done(function(){
		datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_postid = datas[i][0]
			NB_project = datas[i][2]
			NB_location = datas[i][3]
			NB_startdate = datas[i][4]
			NB_enddate = datas[i][5]
			NB_str = '<div id="delete_experience_'+NB_postid+'" style="margin: 15px 0">\
                		<div class="NB_delete_thing">'+NB_project+' : '+NB_startdate+' ~ '+NB_enddate+'</div>\
                		<div class="NB_delete_button" onclick="NB_delete_experience_trash('+NB_postid+')"><i class="fas fa-trash-alt"></i></div>\
            		  </div>'
    		target.insertAdjacentHTML('afterbegin', NB_str);
		}
	})
}
function NB_delete_experience_trash(num) {
	var obj = new FormData();
	obj.append('post_id', num);
	var a_jax = AJAX("POST", "/experienceDelete", obj);
	var target = $('#delete_experience_'+num);
	target.remove();
}
function NB_delete_education_add() {
	var target = document.getElementById("NB_deleteEducation");
	var a_jax = GET_AJAX("POST", "/educationInfo", null)
	$.when(a_jax).done(function(){
		datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_postid = datas[i][0]
			NB_project = datas[i][2]
			NB_location = datas[i][3]
			NB_startdate = datas[i][4]
			NB_enddate = datas[i][5]
			NB_str = '<div id="delete_education_'+NB_postid+'" style="margin: 15px 0">\
                		<div class="NB_delete_thing">'+NB_project+' : '+NB_startdate+' ~ '+NB_enddate+'</div>\
                		<div class="NB_delete_button" onclick="NB_delete_education_trash('+NB_postid+')"><i class="fas fa-trash-alt"></i></div>\
            		  </div>'
    		target.insertAdjacentHTML('afterbegin', NB_str);
		}
	})
}
function NB_delete_education_trash(num) {
	var obj = new FormData();
	obj.append('post_id', num);
	var a_jax = AJAX("POST", "/educationDelete", obj);
	var target = $('#delete_education_'+num);
	target.remove();
}

function NB_delete_portfolio_add() {
	var target = document.getElementById("NB_deletePortfolio");
	var a_jax = GET_AJAX("POST", "/projectInfo", null)
	$.when(a_jax).done(function(){
		datas = a_jax.responseJSON
		for (var i = 0; i < datas.length; i++){
			NB_postid = datas[i][0]
			NB_about = datas[i][1]
			NB_subject = datas[i][2]
			NB_str = '<div id="delete_portfolio_'+NB_postid+'" style="margin: 15px 0">\
                		<div class="NB_delete_thing">'+NB_subject+' : '+NB_about+'</div>\
                		<div class="NB_delete_button" onclick="NB_delete_portfolio_trash('+NB_postid+')"><i class="fas fa-trash-alt"></i></div>\
            		  </div>'
    		target.insertAdjacentHTML('afterbegin', NB_str);
		}
	})
}
function NB_delete_portfolio_trash(num) {
	var obj = new FormData();
	obj.append('post_id', num);
	var a_jax = AJAX("POST", "/projectDelete", obj);
	var target = $('#delete_portfolio_'+num);
	target.remove();
}