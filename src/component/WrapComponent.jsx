import React from 'react';
import MainModalComponent from './MainModalComponent';
import ModalComponent from './ModalComponent';
import HeaderComponent from './HeaderComponent';
import IntroMainComponent from './IntroMainComponent';
import SubMain1Component from './SubMain1Component';
import SubMain2Component from './SubMain2Component';
import SubMain3Component from './SubMain3Component';
import SubMain4Component from './SubMain4Component';
import MemberSignUpComponent from './MemberSignUpComponent';
import MemberSignInComponent from './MemberSignInComponent';
import FooterComponent from './FooterComponent';
import QuickMenuComponent from './QuickMenuComponent';
import GoTopComponent from './GoTopComponent';

export default function WrapComponent (props) {

  // 상태관리 함수
  const [isTopModal, setIsTopModal] = React.useState(true);           // 탑모달
  const [isMainModal, setIsMainModal] = React.useState(true);         // 메인모달
  const [IsIntroMain, setIsIntroMain] = React.useState(true);         // 인트로메인
  const [isSubMain1, setIsSubMain1]   = React.useState(false);        // 서브메인1
  const [isSubMain2, setIsSubMain2]   = React.useState(false);        // 서브메인2
  const [isSubMain3, setIsSubMain3]   = React.useState(false);        // 서브메인3
  const [isSubMain4, setIsSubMain4]   = React.useState(false);        // 서브메인4
  const [isMemberSignUp, setIsMemberSignUp] = React.useState(false);  // 회원가입
  const [isMemberSignIn, setIsMemberSignIn] = React.useState(false);  // 로그인

  // 탑모달 상태변경 함수
  const topModalState=()=>{
    setIsTopModal(false);
  }
  // 메인모달 상태변경 함수
  const mainModalState=()=>{
    setIsMainModal(false);
  }

  // 홈페이지 접속 시 topmodal 쿠키 이름과 값이 존재하면 탑 모달 숨기기
  const topModalFn=()=>{
    if (document.cookie === '') return;

    let result = document.cookie.split(';');

    let obj = [];
    result.map=((item, idx)=>{
      obj[idx] = {
        쿠키이름: item.split('=')[0].trim(),
        쿠키값: item.split('=')[1].trim()
      }
    });
    // 쿠키이름, 쿠키값이 존재하면 topmodal 숨기기
    obj.map=((item)=>{
      if (item.쿠키이름 === 'JHTOPMODAL' && item.쿠키값 === 'topmodalclose1day') {
        setIsTopModal(false);
      }
      else {
        setIsTopModal(true);
      }
    });
  }

  // 홈페이지 접속 시 로컬스토리지에 mainmodal 키가 존재하면 숨기기
  const mainModalFn=()=>{
    let result = null;
    for(let i = 0; i < localStorage.length; i++) {
      result = JSON.parse(localStorage.getItem('JHMAINMODAL'));
    }
    if (result === null || result === '') return;

    if (result.모달이름 === 'mainModal') {
      setIsMainModal(false);
    }
    else {
      setIsMainModal(true);
    }
  }

  React.useEffect(()=>{
    topModalFn();
    mainModalFn();
  },[]);

  //인트로메인 상태변경 함수
  const introMainFn=()=>{
    setIsIntroMain(true);
    setIsSubMain1(false);       // 서브메인1 숨김
    setIsSubMain2(false);       // 서브메인2 숨김
    setIsSubMain3(false);       // 서브메인3 숨김
    setIsSubMain4(false);       // 서브메인4 숨김
    setIsMemberSignUp(false);   // 회원가입 숨김
    setIsMemberSignIn(false);   // 로그인 숨김
  }
  // 서브메인1 상태변경 함수
  const subMain1Fn=()=>{
    setIsIntroMain(false);      // 인트로메인 숨김
    setIsSubMain1(true);        // 서브메인1 보임
    setIsSubMain2(false);       // 서브메인2 숨김
    setIsSubMain3(false);       // 서브메인3 숨김
    setIsSubMain4(false);       // 서브메인4 숨김
    setIsMemberSignUp(false);   // 회원가입 숨김
    setIsMemberSignIn(false);   // 로그인 숨김
}
// 서브메인2 상태변경 함수
const subMain2Fn=()=>{
    setIsIntroMain(false);      // 인트로메인 숨김
    setIsSubMain1(false);       // 서브메인1 숨김
    setIsSubMain2(true);        // 서브메인2 보임
    setIsSubMain3(false);       // 서브메인3 숨김
    setIsSubMain4(false);       // 서브메인4 숨김
    setIsMemberSignUp(false);   // 회원가입 숨김
    setIsMemberSignIn(false);   // 로그인 숨김
}
// 서브메인3 상태변경 함수
const subMain3Fn=()=>{
    setIsIntroMain(false);      // 인트로메인 숨김
    setIsSubMain1(false);       // 서브메인1 숨김
    setIsSubMain2(false);       // 서브메인2 숨김
    setIsSubMain3(true);        // 서브메인3 보임
    setIsSubMain4(false);       // 서브메인4 숨김
    setIsMemberSignUp(false);   // 회원가입 숨김
    setIsMemberSignIn(false);   // 로그인 숨김
}
// 서브메인4 상태변경 함수
const subMain4Fn=()=>{
    setIsIntroMain(false);      // 인트로메인 숨김
    setIsSubMain1(false);       // 서브메인1 숨김
    setIsSubMain2(false);       // 서브메인2 숨김
    setIsSubMain3(false);       // 서브메인3 숨김
    setIsSubMain4(true);        // 서브메인4 보임
    setIsMemberSignUp(false);   // 회원가입 숨김
    setIsMemberSignIn(false);   // 로그인 숨김

}
// 회원가입 상태변경 함수
const memberSignUpFn=()=>{
    setIsMemberSignUp(true);    // 회원가입 보임
    setIsIntroMain(false);      // 인트로메인 숨김
    setIsSubMain1(false);       // 서브메인1 숨김
    setIsSubMain2(false);       // 서브메인2 숨김
    setIsSubMain3(false);       // 서브메인3 숨김
    setIsSubMain4(false);       // 서브메인4 숨김
    setIsMemberSignIn(false);   // 로그인 숨김
}
// 로그인 상태변경 함수
const memberSignInFn=()=>{
  setIsMemberSignIn(true);   // 로그인 보임
  setIsMemberSignUp(false);  // 회원가입 숨김
  setIsIntroMain(false);     // 인트로메인 숨김
  setIsSubMain1(false);      // 서브메인1 숨김
  setIsSubMain2(false);      // 서브메인2 숨김
  setIsSubMain3(false);      // 서브메인3 숨김
  setIsSubMain4(false);      // 서브메인4 숨김
}

  return (
    <div id="wrap">
      { // 탑모달
      isTopModal && <ModalComponent $path={props.$path} topModalState={topModalState}/>
      }
      { // 메인모달
       isMainModal && <MainModalComponent $path={props.$path} mainModalState={mainModalState}/>
      }
      { // 헤더
        <HeaderComponent 
        $path={props.$path} 
        introMainFn={introMainFn} 
        subMain1Fn={subMain1Fn} 
        subMain2Fn={subMain2Fn} 
        subMain3Fn={subMain3Fn} 
        subMain4Fn={subMain4Fn}
        memberSignUpFn={memberSignUpFn} 
        memberSignInFn={memberSignInFn}/>
      }
      { // 인트로메인
        IsIntroMain && <IntroMainComponent/>
      }
      { // 서브메인1
        isSubMain1 && <SubMain1Component/>
      }
      { // 서브메인2
        isSubMain2 && <SubMain2Component/>
      }
      { // 서브메인3
        isSubMain3 && <SubMain3Component/>
      }
      { //서브메인4
        isSubMain4 && <SubMain4Component/>
      }
      { // 회원가입
        isMemberSignUp && <MemberSignUpComponent introMainFn={introMainFn}/>
      }
      { //로그인
        isMemberSignIn && <MemberSignInComponent/>
      }
      { // 푸터
        <FooterComponent $path={props.$path}/>
      }
      { // 퀵메뉴
        <QuickMenuComponent $path={props.$path}/>
      }
      { // 고탑
        <GoTopComponent $path={props.$path}/>
      }
    </div>
  );
};

WrapComponent.defaultProps = {
  $path: './',
}
