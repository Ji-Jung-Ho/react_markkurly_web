(($)=>{
    const SignUp = {
        회원 : {
            아이디:"",
            아이디중복확인 : false,
            비밀번호:"",
            비밀번호확인:"",
            이름:"",
            이메일:"",
            이메일중복확인 : false,
            휴대폰:"",
            휴대폰인증확인 : false,
            주소1:"",
            주소2:"",
            성별:"",
            생년:"",
            생월:"",
            생일:"",
            추가입력사항:"",
            추가입력사항입력상자:"",
            이용약관동의:[],
        },
        init(){
          this.idMethod();
          this.pwMethod();
          this.nameMethod();
          this.emailMethod();
          this.hpMethod();
          this.addrMethod();
          this.genderMethod();
          this.birthMethod();
          this.addInputMethod();
          this.agreeToTermsOfUseMethod();
          this.submitMethod();
        },

        // 1. 아이디 메소드
        idMethod(){ 
          const that = this;
          const $inputId = $('#signUP #inputId');
          const $errorMessage = $('signUp .error-message');
          const $idOkBtn = $('#signUp .id-ok-btn');

          // 아이디 입력상자
          $inputId.on({
              keyup(){
                  const regExp1 = /[`~!@#$^&*()\-_=+\\|\[\]{};:'",<.>/?]/g;
                  const regExp2 = /.{6,16}/g;
                  const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
                  const regExp4 = /\s/g;
                  let thisVal = $(this).val();

                  $inputId.val( thisVal.replace(regExp1,''));

                  if( regExp2.test( thisVal )=== false || regExp3.test(thisVal) === false || regExp4.test(thisVal) === true ){
                      $(this).siblings($errorMessage).addClass('on');
                  }
                  else { 
                      $(this).siblings($errorMessage).removeClass('on');
                  }
              }
          });

          // 아이디 중복확인 버튼
          $idOkBtn.on({
              click: function(e){
                  e.preventDefault();
                  const regExp2 = /.{6,16}/g;
                  const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
                  const regExp4 = /\s/g;
                  const thisVal = $inputId.val();

                  if( regExp2.test( thisVal ) === false || regExp3.test(thisVal) === false || regExp4.test(thisVal) === true ){
                      $('#confirmModal').fadeIn(300);
                      $('#confirmModal h2').text('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
                  }
                  else {
                    // 중복검사 추가합니다.(로컬스토레이지에 저장하고)
                    // 0. 로컬스토레이지 저장된 데이터가 1개이상 있어야 가져온다.
                    // 1. 로컬스토레이지 데이터 중 아이디 가져오기
                    // 2. 아이디 입력상자에 입력된 아이디와 저장된 아이디 중복검사 비교
                    // 3. 같은 아이디가 있으면 '사용 불가능한 아이디 입니다'
                    // 4. 같은 아이디가 없으면 '사용할 수 있는 아이디입니다.'
        
                    // 중복검사
                    // 맵 함수의 화살표 함수를 이용 한줄코딩
                    // 배열안에 중복된 아이디가 있다면 true 저장 없다면 false 저장
                    // 반환(리턴)값은 배열로 출력된다. imsi[false, true, false]
        
                    $.ajax({
                      url: 'http://kiik52.dothome.co.kr/kurly_study/member_select.php', // 조회(검색) PHP
                      type: "GET",
                      success: function (result) {
                        // console.log("AJAX 성공 그리고 응답 결과 : ",JSON.parse(result));
                        try {
                          let imsi = JSON.parse(result);
                          let res = imsi.map((item) => item.아이디 === $inputId.val()); // 비교하고 결과는 배열로 처리
                          // console.log(res);
        
                          // true 값이 있으면 중복된 아이디 입니다. => 사용불가
                          // false 값이 있으면 사용 가능한 아이디 입니다. => 사용가능
                          if (res.includes(true)) {
                            $("#confirmModal").fadeIn(300);
                            $("#confirmModal h2").text("사용 불가능한 아이디 입니다");
                          } else {
                            $("#confirmModal").fadeIn(300);
                            $("#confirmModal h2").text("사용할 수 있는 아이디입니다.");
                            that.회원.아이디 = $inputId.val().trim();
                            that.회원.아이디중복확인 = true;
                          }
                        } catch {
                          console.log("응답데이터 오류");
                          return;
                        }
                      },
                      error: function (error) {
                        console.log("AJAX 실패", error);
                      },
                    });
                  }
              }
          });
          // $('.modal-ok-btn').on({
          //     click(e){
          //         e.preventDefault();
          //         $('#confirmModal').fadeOut(300);
          //         const modalText = $('#confirmModal .content h2').text();
          //     }
          // })
        },

        // 2. 비밀번호
        pwMethod(){ 
          const $inputPw1 = $('#signUp #inputPw1'); 
          const $inputPw2 = $('#signUp #inputPw2'); 
          const $errorMessage = $('#signUp .error-message');
          const that = this;

          $inputPw1.on({
              keyup(){

                  const regExp1 = /.{10,}/g;
                  const regExp2 = /((?=.*[A-Za-z]+)(?=.*[0-9]+))|((?=.*[A-Za-z]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))|((?=.*[0-9]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))/g;
                  const regExp3 = /\s/g;                    
                  const regExp4 = /(\d)\1\1/g;

                  if( regExp1.test($(this).val())===false ){
                      $(this).siblings($errorMessage)
                             .text('최소 10자 이상 입력')
                             .addClass('on');                        
                  }
                  else if( regExp2.test($(this).val())===false || regExp3.test($(this).val())===true  ){
                      $(this).siblings($errorMessage)
                             .text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합')
                             .addClass('on');
                  }
                  else if(regExp4.test($(this).val())===true){
                      $(this).siblings($errorMessage)
                             .text('동일한 글자 3개 이상 연속 사용 불가')
                             .addClass('on');
                  }
                  else {
                      $(this).siblings($errorMessage)
                             .text('')
                             .removeClass('on');
                      that.회원.비밀번호 = $(this).val().trim();       
                  }
              }
          });

          // 비밀번호 확인
          $inputPw2.on({
              keyup(){
                  if( $inputPw1.val() !== $(this).val() ){
                      $(this).next()
                             .addClass('on')
                             .text('동일한 비밀번호를 입력');
                  }
                  else{
                      $(this).next()
                             .removeClass('on')
                             .text('');
                      that.회원.비밀번호확인 = $(this).val().trim();
                  }
              }
          });

          $inputPw2.on({
              focusout(){
                  that.회원.비밀번호 = $inputPw1.val().trim();
                  that.회원.비밀번호확인 = $inputPw2.val().trim();
              }
          });
        },

        // 3. 이름
        nameMethod(){  
          const $inputName = $('#signUp #inputName');
          const that = this;

          $inputName.on({
              keyup(){
                  const regExp = /[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]/g;

                  $(this).val( $(this).val().replace(regExp, '') );

                  if($(this).val()===''){
                      $(this).next().text('이름을 입력해 주세요.').addClass('on');
                  }
                  else{
                      $(this).next().text('').removeClass('on');
                  }
              }
          });

          // 이름 포커스 아웃하면 저장
          $inputName.on({
              focusout(){
                  that.회원.이름 = $inputName.val().trim();
              }
          });
        },

        // 4. 이메일
        emailMethod(){
          const $inputEmail = $('#signUp #inputEmail');
          const $errorMessage = $('#signUp .error-message');
          const that = this;

          $inputEmail.on({
              keyup(){
                  const regExp1 = /\s/g;
                  const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
                  const regExp3 = /[@\(\)\\\[\]":;,<>]/g;

                  if ( regExp1.test($(this).val())===true || regExp2.test($(this).val())===false || regExp3.test($(this).val())===true ){
                      $(this).next()
                             .siblings($errorMessage)
                             .text('이메일 형식으로 입력해 주세요.')
                             .addClass('on');
                  }
                  if ( regExp1.test($(this).val())===false || regExp2.test($(this).val())===true || regExp3.test($(this).val())===false ){
                      $(this).next()
                             .siblings($errorMessage)
                             .text('')
                             .removeClass('on');
                  }
                  if($(this).val()===''){
                      $(this).next()
                             .siblings($errorMessage)
                             .text('이메일을 입력해 주세요.')
                             .addClass('on');
                  }
              }
          });

          // 이메일 중복확인 버튼 클릭 이벤트
          $('.email-ok-btn').on({
              click(e){
                  e.preventDefault();
                  const regExp1 = /\s/g;
                  const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
                  let result = [];

                  if($inputEmail.val()===''){
                      $('#confirmModal').fadeIn(300);
                      $('#confirmModal h2').text('이메일을 입력해 주세요.');
                  }
                  else if( regExp1.test(  $inputEmail.val())===true || regExp2.test( $inputEmail.val())===false ){                        
                      $('#confirmModal').fadeIn(300);
                      $('#confirmModal h2').text('이메일 형식으로 입력해 주세요.');
                  }
                  else{        
                      $.ajax({
                          url:'http://kiik52.dothome.co.kr/kurly_study/member_select.php', //조회(검색) PHP 
                          type:'GET',
                          success: function(result){
                              // console.log( 'AJAX 성공 그리고 응답 결과 : ', JSON.parse(result) );

                              try {
                                  let imsi = JSON.parse(result);
                                  let res = imsi.map((item)=>item.이메일===$inputEmail.val()); // 비교하고 결과는 배열처리 true, false
                                  //console.log( res ); // res[false, false, false, true]
                                  // true 값이 있으면 중복된 아이디 입니다. 사용불가
                                  // true 값이 없으면 사용가능한 아이디 입니다.
                                  // imsi 배열 안에 true가 있다면 중복된 아이디
                                  if( res.includes(true) ){
                                      $('#confirmModal').fadeIn(300);
                                      $('#confirmModal h2').text('사용 불가능한 이메일 입니다');
                                  }
                                  else {
                                      $('#confirmModal').fadeIn(300);
                                      $('#confirmModal h2').text('사용할 수 있는 이메일 입니다.');                                       
                                      that.회원.이메일 = $inputEmail.val().trim();
                                      that.회원.이메일중복확인 = true;
                                  }

                              }
                              catch {
                                  console.log('응답 데이터 오류');
                                  return;
                              }
                              

                          },
                          error: function(error){
                              console.log( 'AJAX 실패 : ', error );
                          }
                      });
                      $('#confirmModal').fadeIn(300);
                      $('#confirmModal h2').text('사용가능한 이메일 입니다.');
                      that.회원.이메일 = $inputEmail.val();
                      that.회원.이메일중복확인 = true;
                  }
              }
          });
        },

        // 5. 휴대폰
        hpMethod(){
            const that = this;
            const $errorMessage = $('#signUp .hp-error-message');

            $('#inputHp').on({
                keyup(){
                    const regExp1 = /[^\d]/g;
                    $(this).val( $(this).val().replace(regExp1,'') );
                    if( $(this).val().length >= 1 ){
                        $('.hp-num-btn')
                        .addClass('on')
                        .prop('disabled', false);
                    }
                    else {
                        $('.hp-num-btn')
                        .removeClass('on')
                        .prop('disabled', true);
                    }
                }
            });

            // 휴대폰 타이머 카운트 함수
            let setId = 0;
            let minute = 0;
            let second = 0;
            function hpTimerCount(){
                setId = 0;
                minute = 2;
                second = 59;
                setId = setInterval(function(){
                    second--;
                    if(second<=0){
                        second = 59;
                        minute--;
                        if(minute<0){
                            clearInterval(setId);
                            minute = 0;
                            second = 0;
                            $('#confirmModal').fadeIn(300);
                            $('#confirmModal h2').html('유효 시간이 만료되었습니다. <br> 다시 시도해 주세요.');
                            $('.hp-ok-box').hide();
                            $('#inputHp').attr('disabled', false);
                            $('.hp-num-btn').addClass('on').attr('disabled', false);
                        }
                    }

                    $('.time-count').html( `${minute<10? `0${minute}`:minute}:${second<10? `0${second}`:second}` );

                },1000);
            }

            // 모달 닫기
            $('.modal-ok-btn').on({
                click(e){
                    e.preventDefault();
                    $('#confirmModal').fadeOut(300);
                    
                    const modalText = $('#confirmModal .content h2').text();
                    if( modalText.indexOf('인증번호')!==-1 ){
                        hpTimerCount();
                        $('#inputHpOk').focus();
                    }
                }
            })

            // 인증번호 받기 클릭 이벤트
            let num = 0;
            $('.hp-num-btn').on({
                click(e){
                    e.preventDefault();
                    const regExp2 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
                    num = Math.floor(Math.random()*900000+100000);

                    $('#confirmModal').fadeIn(300);

                    if( regExp2.test( $('#inputHp').val() )===false ){
                        $('#confirmModal h2').html('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도해 주세요.');
                    }
                    else {
                        $('#confirmModal h2').html(`인증번호가 발송되었습니다. <p style='font-size:20px'>${num}</p>`);
                        $('.hp-ok-box').css({display:'flex'});
                        $('#inputHpOk').val('');
                        $('.hp-num-btn').removeClass('on').attr('disabled',true);
                        $('.hp-num-ok-btn').removeClass('on').attr('disabled',true);
                        $errorMessage.text('').removeClass('on');
                        $('#inputHp').attr('disabled',true);
                    }
                }
            });

            // 인증번호 입력박스 이벤트
            $('#inputHpOk').on({
                keyup(){
                    const regExp1 = /[^\d]/g;
                    $(this).val( $(this).val().replace(regExp1,'') );
                    if( $(this).val().length >= 1 ){
                        $('.hp-num-ok-btn')
                        .addClass('on')
                        .prop('disabled',false);
                    }
                    else {
                        $('.hp-num-ok-btn')
                        .removeClass('on')
                        .prop('disabled',true);
                    }
                }
            });

            // 인증번호 확인 버튼 클릭 이벤트
            $('.hp-num-ok-btn').on({
                click(e){
                    e.preventDefault();
                    $('#confirmModal').fadeIn(300);

                    if(Number($('#inputHpOk').val())===num){
                        $('#confirmModal h2').html('인증에 성공 하였습니다.');
                        $('.hp-num-btn').hide();
                        $('.hp-num2-btn').show();
                        $('.hp-ok-box').css({display:'none'});
                        $('#inputHpOk').val('');
                        clearInterval(setId);
                        $errorMessage.text('').removeClass('on');
                        that.회원.휴대폰 = $('#inputHp').val();
                        that.회원.휴대폰인증확인 = true;
                    }
                    else {
                        $('#confirmModal h2').html('잘못된 인증 코드 입니다.');
                    }
                }
            });

            // 다른번호 인증
            $('.hp-num2-btn').on({
                click(e){
                    e.preventDefault();
                    $('#inputHp').attr('disabled',false).val('').focus();
                    $('.hp-num2-btn').hide();
                    $('.hp-num-btn').show();
                    $errorMessage.text('휴대폰 번호를 입력해 주세요.').addClass('on');
                }
            });
        },

        // 6. 주소
        addrMethod() {
          // 6. 주소 메서드
          const that = this;
          // 1. 주소 검색 자식창(윈도우 팝업창) 만들기 - 완료
          // 2. 자식창(윈도우 팝업창)에 주소1, 주소2 입력 상자 및 UIUX 디자인 제작 - 완료
          // 3. 자식창(윈도우 팝업창)에서 주소 검색 API 구현하기 - ing
          // 4. 자식창(윈도우 팝업창) API 에서 검색된 주소 입력상자에 바인딩하기
          // 5. 자식창(윈도우 팝업창)에 주소 입력상자에 바인딩된 주소를 부모창에 주소 전달하기
          // 주소검색 함수
          function addressSearch() {
            // 팝업창 띄우기(열기)
            const _fileName = "./popup.html";
            const _winName = "_address_api";
            const _width = 530;
            const _height = 569;
            const _top = ($(window).height() - _height) / 2; // 769-569=200/2=100
            const _left = ($(window).width() - _width) / 2; // 1903-530=1373/2=686.5
            const childWin = window.open(
              _fileName,
              _winName,
              `width=${_width},height=${_height},top=${_top},left=${_left}`
            );
            // childWin.console.log('부모창이 자식창에게 보낸 메시지!!!');
          }
    
          // 주소검색 버튼 클릭 이벤트
          $(".addr-api-btn").on({
            click(e) {
              e.preventDefault();
              addressSearch();
            },
          });
    
          // 주소 재검색 버튼 클릭 이벤트
          $(".addr-re-btn").on({
            click(e) {
              e.preventDefault();
              addressSearch();
            },
          });
    
          // 나머지 주소에서 밖으로 나오면 포커스 아웃
          $("#inputAddr2").on({
            focusout() {
              that.회원.주소1 = $("#inputAddr1").val();
              that.회원.주소2 = $("#inputAddr2").val();
            },
          });
    
          // 세션 스토레이지 주소 데이터
          // 주소1 주소2 데이터 유지하기
          // 새로고침시 함수 실행
          function addressState() {
            // 주소 가져오기( JSON.parse() ) 문자열 => 객체로 변환
            let result = JSON.parse(sessionStorage.getItem("kurly_search_address"));
            //console.log( result ); // 검색 데이터가 없으면 null 을 반환
    
            if (result !== null) {
              // 예외처리
              $(".addr-api-btn").addClass("on");
              $(".addr-hide").addClass("on");
              $("#inputAddr1").val(result.주소1);
              $("#inputAddr2").val(result.주소2);
            }
    
            // try{ // 예외처리 오류발생시만 처리 null은 오류(error)가 아니다.
            //     $('.addr-api-btn').addClass('on');
            //     $('.addr-hide').addClass('on');
            //     $('#inputAddr1').val(result.주소1);
            //     $('#inputAddr2').val(result.주소2);
            // }
            // catch{
            //     return;
            // }
          }
          addressState();
        },
   
        // 7. 성별
        genderMethod(){ 
          const that = this;

          // 선택안함 = 초기값
          $('#unselect').prop('checked', true);

          $('.gender-btn').on({
              change(){
                that.회원.성별 = $(this).val();
              }
          });
        },

        // 8. 생년월일
        birthMethod(){
          const that = this;
          const $errorMessage = $("#signUp .birth-error-message");

          function birthCheck($that){
            const newYear = new Date().getFullYear();
            const regExp1 = /[^\d]/g;   // 숫자가 아닌것
            const regExp2 = /^(?:0?[1-9]|1[0-2])$/g;  // 0이 있어도되고 없어도되고, 1~9까지, 또는 앞에 1을 쓰고 0-2까지
            const regExp3 = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;  // 0이 있어도되고 없어도되고, 1~9까지, 또는 앞에 2를 쓰고 0~9까지, 또는 앞에 3을 쓰고 0~1까지

            // 조건-1. 숫자가 아니면 삭제
            $that.val($that.val().replace(regExp1, ""));
            
            // 조건-2. 미래년도 입력불가
            // 입력상자의 입력값은 숫자를 입력해도 문자열(string)로 변환되기 때문에
            // Number을 사용하여 문자열을 숫자로 변환해 준다.
            // 입력값이 현재년도보다 크면
            if (Number($("#year").val()) > newYear) {
              $errorMessage.addClass("on").text("생년월일이 미래로 입력 되었습니다.");
            }
            // 100세 초과 입력 불가
            else if (Number($("#year").val()) < newYear - 100) {
              $errorMessage.addClass("on").text("생년월일을 다시 입력해주세요.");
            }
            // 14세 미만 입력 불가
            else if (Number($("#year").val()) >= newYear - 14) {
              $errorMessage.addClass("on").text("만 14세 미만은 가입이 불가합니다.");
            }
            // 생년이 이상 없을 경우 생월 체크
            else {
              if(regExp2.test($("#month").val()) === false) {
                $errorMessage.addClass("on").text("태어난 월을 정확하게 입력해주세요.");
              }
              // 생월이 이상 없을 경우 생일 체크
              else {
                if(regExp3.test($("#date").val()) === false) {
                  $errorMessage.addClass("on").text("태어난 일을 정확하게 입력해주세요.");
                }
                else {
                  $errorMessage.removeClass("on").text("");
                }
              }
            }
          }

          // 생년 입력상자 키업 이벤트 구현
          $("#year").on({
            keyup() {
              birthCheck($("#year"));
            }
          });

          // 생월 입력상자 키업 이벤트 구현
          $("#month").on({
            keyup() {
              birthCheck($("#month"));
            },
          });

          // 생일 입력상자 키업 이벤트 구현
          $("#date").on({
            keyup() {
              birthCheck($("#date"));
            },
            // 생일 입력상자에서 포커스 아웃 시 생년,생월,생일 입력값이 회원 배열에 저장
            focusout(){
              that.회원.생년 = $("#year").val();
              that.회원.생월 = $("#month").val();
              that.회원.생일 = $("#date").val();
            }
          });
        },

        // 9. 추가입력사항
        addInputMethod(){
          let that = this;
          const txt1 = '가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
          const txt2 = '추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br>가입 이후는 수정이 불가능 합니다.<br>대소문자 및 띄어쓰기에 유의해주세요.';
          const $idChkBtn = $(".id-chk-btn")
          const $addInputText = $("#addInputText");

          // 라디오버튼 선택하면 아래 입력상자 placeholder 내용을 라디오버튼 값으로 변경한다.
          $('.add-input-btn').on({
              change(){
                  $('.add-input-box-list, .add-input-box2').addClass('on');
                  $('#add-input-text').attr('placeholder',  $(this).val() )
                  
                  if( $(this).val()==='추천인 아이디를 입력해 주세요.' ){
                      $('.add-input-guid-text').text( txt1 );
                      $('.id-chk-btn').show();
                  }
                  else{
                      $('.add-input-guid-text').html( txt2 );
                      $('.id-chk-btn').hide();
                  }                    
                  that.회원.추가입력사항 = $(this).val();
              }
          });

          // 추천인 아이디 확인 버튼 이벤트
          $('.id-chk-btn').on({
            click(e){
                e.preventDefault();
                if($('#addInputText').val()===''){
                    $('#confirmModal').fadeIn(300);
                    $('#confirmModal h2').text('아이디를 입력해 주세요');
                }
                else {
                    $.ajax({
                        url: './member_select.php',
                        type:'GET',
                        success: function(result){
                            try {
                                let imsi = JSON.parse(result);
                                let res = imsi.map((item)=>item.아이디===$('#addInputText').val());
                                // console.log(res)

                                if( res.includes(true) ){
                                    $('#confirmModal').fadeIn(300);
                                    $('#confirmModal h2').html('존재하는 아이디 입니다.<br>친구초대 이벤트에 참여 가능해요.');
                                    // $('.id-chk-btn').prop('disabled', true);
                                }
                                else {
                                    $('#confirmModal').fadeIn(300);
                                    $('#confirmModal h2').text('존재하지 않는 아이디 입니다.');
                                }
                            }
                            catch {
                                console.log('응답 데이터 오류');
                                return;
                            }
                        },
                        error: function(error){
                            console.log('AJAX 실패 : ', error);
                        }
                    });
                }
            }
        });
          
          // 포커스아웃하면 추가입력사항 객체에 저장
          $('#addInputText').on({
              focusout(){
                  that.회원.추가입력사항입력상자 = $(this).val();
              }
          });

        },

        // 10. 이용약관동의 
        agreeToTermsOfUseMethod() {
          // 10. 이용약관동의 메서드
          let that = this;
          // let {이용약관동의} = that.회원; //비구조화 === 구조 분할 할당
    
          // 체크박스 체크하면 value 값이 배열에 누적 저장한다.
          // 7개 값을 저장 해야하기 때문에 배열
          // 1. 전체 동의합니다.  체크하면 7개의 선택값이 배열에 저장된다
          // 2. 전체 동의합니다.  체크해제하면 7개의 선택값이 배열에 삭제된다
          // 3. 전체 동의합니다.  체크하면 모두체크
          // 4. 전체 동의합니다.  체크해제하면 모두체크해제
    
          $("#allChk").on({
            change() {
              if ($(this).is(":checked") === true) {
                //체크되었다면
                // 7개 체크박스 선택자
                $(".chk-btn").each(function (idx, item) {
                  // console.log( $(this).val() );
                  // console.log( $('.chk-btn').eq(idx).val() );
                  // 배열에 누적 저장
                  // that.회원.이용약관동의.push( $(this).val() );
                  // ...전개연산자사용 배열, 객체 누적 저장
                  that.회원.이용약관동의 = [...that.회원.이용약관동의,$(this).val(),];
                  $(this).prop("checked", true); //체크박스 체크하라  프로퍼티스 Properties
                });
              } else {
                that.회원.이용약관동의 = []; //배열삭제는 빈 배열 사용
                // 7개 체크박스 반복 처리
                $(".chk-btn").each(function () {
                  $(this).prop("checked", false);
                });
              }
            },
          });
    
          // 체크박스 개별 체크
          $(".chk-btn").on({
            change() {
              // 체크되면
              if ($(this).is(":checked") === true) {
                that.회원.이용약관동의 = [...that.회원.이용약관동의, $(this).val()];
              } else {
                // 삭제 필터 filter()  메서드 사용
                // 체크해제한 값은 배열에서 제외하고 (현재 취소된 체크값이 아닌 배열 리턴 재배열저장)
                // 나머지 배열 모든값을 재배열 저장한다.
                // 한줄 코딩에서 리턴을 바로 할수 있는 화살표함수
                that.회원.이용약관동의 = that.회원.이용약관동의.filter((item) => item !== $(this).val());
              }
    
              // 전체 동의 합니다. 체크 상태
              if (that.회원.이용약관동의.length === 7) {
                $("#allChk").prop("checked", true);
              } else {
                $("#allChk").prop("checked", false);
              }
            },
          });
    
          // 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)
          // SNS, 이메일 모두 체크
          $("#chk4").on({
            change() {
              // 무료배송 버튼이 체크되면
              if ($(this).is(":checked") === true) {
                // sns, 이메일 버튼 체크
                $("#chk5, #chk6").prop("checked", true);

                // 무료배송 버튼이 체크되고, 나머지 버튼들이 체크 상태일때
                if (  $("#chk1").is(":checked") === true && $("#chk2").is(":checked") === true && $("#chk3").is(":checked") === true && 
                      $("#chk4").is(":checked") === true && $("#chk5").is(":checked") === true && $("#chk6").is(":checked") === true && 
                      $("#chk7").is(":checked") === true) {
                  // 모두동의 버튼 체크
                  $("#allChk").prop("checked", true);
                }
                else {
                  // 아니면 모두동의 버튼 체크 안됨
                  $("#allChk").prop("checked", false);
                }
    
                // 이용약관동의 배열값에 $('#chk5') 값이 없다면 배열에 저장
                // 이용약관동의 배열값에 $('#chk6') 값이 없다면 배열에 저장
                if (that.회원.이용약관동의.includes($("#chk5").val()) === false) {
                  that.회원.이용약관동의 = [...that.회원.이용약관동의,$("#chk5").val()];
                }
                if (that.회원.이용약관동의.includes($("#chk6").val()) === false) {
                  that.회원.이용약관동의 = [...that.회원.이용약관동의, $("#chk6").val()];
                }
              } else {
                $("#chk5, #chk6").prop("checked", false);
                that.회원.이용약관동의 = that.회원.이용약관동의.filter((item) => item !== $("#chk5").val());
                that.회원.이용약관동의 = that.회원.이용약관동의.filter((item) => item !== $("#chk6").val());
              }
            },
          });
    
          // SNS
          $("#chk5").on({
            change() {
              if ($(this).is(":checked") === true && $("#chk6").is(":checked") === true) {
                $("#chk4").prop("checked", true);
                if (  $("#chk1").is(":checked") === true && $("#chk2").is(":checked") === true && $("#chk3").is(":checked") === true && 
                      $("#chk4").is(":checked") === true && $("#chk5").is(":checked") === true && $("#chk6").is(":checked") === true && 
                      $("#chk7").is(":checked") === true) {
                  // 모두동의 버튼 체크
                  $("#allChk").prop("checked", true);
                }
                else {
                  // 아니면 모두동의 버튼 체크 안됨
                  $("#allChk").prop("checked", false);
                }
                if (that.회원.이용약관동의.includes($("#chk4").val()) === false) {
                  that.회원.이용약관동의 = [...that.회원.이용약관동의,$("#chk4").val()];
                }
              } else {
                $("#chk4").prop("checked", false);
                that.회원.이용약관동의 = that.회원.이용약관동의.filter((item) => item !== $("#chk4").val());
              }
            },
          });
    
          // 이메일
          $("#chk6").on({
            change() {
              if ($(this).is(":checked") === true && $("#chk5").is(":checked") === true) {
                $("#chk4").prop("checked", true);
                if (  $("#chk1").is(":checked") === true && $("#chk2").is(":checked") === true && $("#chk3").is(":checked") === true && 
                      $("#chk4").is(":checked") === true && $("#chk5").is(":checked") === true && $("#chk6").is(":checked") === true && 
                      $("#chk7").is(":checked") === true) {
                  // 모두동의 버튼 체크
                  $("#allChk").prop("checked", true);
                }
                else {
                  // 아니면 모두동의 버튼 체크 안됨
                  $("#allChk").prop("checked", false);
                }
                if (that.회원.이용약관동의.includes($("#chk4").val()) === false) {
                  that.회원.이용약관동의 = [...that.회원.이용약관동의,$("#chk4").val()];
                }
              } else {
                $("#chk4").prop("checked", false);
                that.회원.이용약관동의 = that.회원.이용약관동의.filter(
                  (item) => item !== $("#chk4").val()
                );
              }
            },
          });
        },

        // 11. 가입하기
        submitMethod(){
          // 모든 입력조건이 만족하면 로컬스토리지에 저장
          // 로컬스토리지에 저장 테스트 완료 후 닷홈 웹호스팅 서버에 저장
          // 데이터베이스/웹서버에 폼데이터를 저장할 테이블을 생성하고 데이터 저장
          const that = this;
          let count = 0;
          // 배열 객체
          let 가입회원 = [];

          // 폼 요소중 모든 입력상자 및 필수 또는 선택 사항 체크 이벤트 구현
          $(".submit-btn").on({
            click(e){
              e.preventDefault();
              count++;    // 가입하기 클릭할때마다 idx 카운트 1씩 증가
              // 비구조화
              let {
                아이디, 아이디중복확인, 
                비밀번호, 비밀번호확인, 
                이름, 
                이메일, 이메일중복확인, 
                휴대폰, 휴대폰인증확인,
                주소1, 주소2,
                성별,
                생년, 생월, 생일,
                추가입력사항, 추가입력사항입력상자,
                이용약관동의
              } = that.회원

              주소1 = $("#inputAddr1").val();
              주소2 = $("#inputAddr2").val();

              // 이용약관동의 필수 항목 체크 갯수 카운트
              let cnt = 0;
              이용약관동의.map((item)=>{
                if (item.indexOf("필수") !== -1) {  // indexOf는 ("~~") 를 못찾으면 -1 반환 즉 -1이 아니면 찾은것이다
                  cnt++;
                }
              });

              if(아이디중복확인 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('아이디 중복 체크를 해주세요.');
                return; // 전송 취소
              }
              else if (이메일중복확인 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('이메일 중복 체크를 해주세요.');
                return;
              }
              else if (휴대폰인증확인 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('휴대폰 인증 확인을 해주세요.');
                return;
              }
              else if (비밀번호 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('비밀번호를 입력 해주세요');
                return;
              }
              else if (비밀번호확인 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('한번더 비밀번호를 입력 해주세요.');
                return;
              }
              else if (이름 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('이름을 입력 해주세요.');
                return;
              }
              else if (주소1 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('주소를 검색 해주세요.');
                return;
              }
              else if (주소2 === false) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('나머지 주소를 입력해 주세요.');
                return;
              }
              // 이용약관동의 필수 3개 미체크 시
              else if (cnt !== 3) {
                $('#confirmModal').fadeIn(300);
                $('#confirmModal h2').text('이용약관동의 필수 항목을 체크해 주세요.');
                return;
              }

              // 모든 데이터 저장
              // 임시객체(폼데이터) 만들기
              // 로컬스토리지에 저장하기
              // 객체
              const regExp1 = /^(\d{3})(\d{3,4})(\d{4})$/g;

              const 회원가입데이터 =  {
                idx: count,
                아이디: 아이디,
                비밀번호: 비밀번호,
                이름: 이름,
                이메일: 이메일,
                휴대폰: 휴대폰.replace(regExp1, '$1-$2-$3'),
                주소: `${주소1} ${주소2}`,
                성별: 성별,
                생년월일: `${생년}-${생월}-${생일}`,
                추가입력사항: `${추가입력사항} ${추가입력사항입력상자}`,
                이용약관동의: 이용약관동의,
                가입일자: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
              }

              // 가입하기 버튼 누를때마다 데이터 누적
              가입회원 = [...가입회원, 회원가입데이터];

              // 웹서버 데이터베이스(DB)에 데이터 보내기
              $.ajax({
                url:'http://kiik52.dothome.co.kr/kurly_study/member_insert.php',
                type: 'POST',
                data: {
                  input_id : 회원가입데이터.아이디,
                  input_pw : 회원가입데이터.비밀번호,
                  input_irum : 회원가입데이터.이름,
                  input_email : 회원가입데이터.이메일,
                  input_hp : 회원가입데이터.휴대폰,
                  input_addr : 회원가입데이터.주소,
                  input_gender : 회원가입데이터.성별,
                  input_birth : 회원가입데이터.생년월일,
                  input_add_ipnput : 회원가입데이터.추가입력사항,
                  input_service : JSON.stringify(회원가입데이터.이용약관동의),
                  input_gaim_date : 회원가입데이터.가입일자,
                },
                success: function(res){
                //   console.log('AJAX 성공', res);
                  // 회원가입 완료 그리고 인트로페이지로 이동
                  location.href = './';
                },
                error: function(err){
                  console.log('AJAX 실패', err);
                },
              });
            }
          });
        }
    }

    SignUp.init();

})(jQuery);