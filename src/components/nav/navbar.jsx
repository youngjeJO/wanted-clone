import React from 'react';
import './navbar.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';

const navbar = (props) => {
  return (
    <div className='nav'>
      <nav className='navbar'>
        <div className='logo'>
          <ul className='menuList'>
            <li>
              <AiOutlineMenu />
            </li>
            <li>wanted</li>
          </ul>
        </div>
        <div className='navMain'>
          <ul className='menuList'>
            <li>채용</li>
            <li>이벤트</li>
            <li>직군별 연봉</li>
            <li>이력서</li>
            <li>
              커뮤니티
              <span>New</span>
            </li>
            <li>프리랜서</li>
            <li>
              AI 합격예측
              <span>Beta</span>
            </li>
          </ul>
        </div>
        <div className='login'>
          <ul className='menuList'>
            <li>
              <GoSearch />
            </li>
            <li>회원가입/로그인</li>
          </ul>
        </div>
        <p>I</p>
        <div className='service'>기업 서비스</div>
      </nav>
    </div>
  );
};
export default navbar;
