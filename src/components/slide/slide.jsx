import React, { useEffect, useRef, useState } from 'react';
import './slide.css';
import { debounce, set } from 'lodash';

const slideImg = [
  {
    id: -1,
    image:
      'https://static.wanted.co.kr/images/banners/1473/41f7b36e.thumb_1006_280.jpg',
    title: '개발자가 되고싶은 분들!?',
    subTitle: '프론트앤드 무료 교육과정 참여하기',
  },
  {
    id: -2,
    image:
      'https://static.wanted.co.kr/images/banners/1484/b2853456.thumb_1006_280.jpg',
    title: '성장하는 개발자가 되려면?',
    subTitle: '000 검색하지 말 것!',
  },
  {
    id: 0,
    image:
      'https://static.wanted.co.kr/images/banners/1460/619f3af7.thumb_1006_280.jpg',
    title: '개발자 성장 비결 공개!',
    subTitle: 'Velog, 글 쓰는 개발자들의 이야기',
  },
  {
    id: 1,
    image:
      'https://static.wanted.co.kr/images/banners/1486/fba2df30.thumb_1006_280.jpg',
    title: '성과를 내는 마케팅',
    subTitle: '실제 사례를 공개 합니다!',
  },
  {
    id: 2,
    image:
      'https://static.wanted.co.kr/images/banners/1488/baa54448.thumb_1006_280.jpg',
    title: 'UX 디자이너의 커리어 설계',
    subTitle: '브랜드 가치를 더하는 디자인',
  },
  {
    id: 3,
    image:
      'https://static.wanted.co.kr/images/banners/1468/3df61cbc.thumb_1006_280.jpg',
    title: '해, 커리어 EP 02 공개',
    subTitle: '마지막 관문 2라운드의 승자는?',
  },
  {
    id: 4,
    image:
      'https://static.wanted.co.kr/images/banners/1473/41f7b36e.thumb_1006_280.jpg',
    title: '개발자가 되고싶은 분들!?',
    subTitle: '프론트앤드 무료 교육과정 참여하기',
  },
  {
    id: 5,
    image:
      'https://static.wanted.co.kr/images/banners/1484/b2853456.thumb_1006_280.jpg',
    title: '성장하는 개발자가 되려면?',
    subTitle: '000 검색하지 말 것!',
  },
  //가짜 데이터
  {
    id: 6,
    image:
      'https://static.wanted.co.kr/images/banners/1460/619f3af7.thumb_1006_280.jpg',
    title: '개발자 성장 비결 공개!',
    subTitle: 'Velog, 글 쓰는 개발자들의 이야기',
  },
  {
    id: 7,
    image:
      'https://static.wanted.co.kr/images/banners/1486/fba2df30.thumb_1006_280.jpg',
    title: '성과를 내는 마케팅',
    subTitle: '실제 사례를 공개 합니다!',
  },
];

const Slide = (props) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [slideWidth, setSlideWidth] = useState(0);
  const [delay, setdelay] = useState(false);
  const innerWidth = window.innerWidth;

  const slideItem = useRef(null);
  const slideList = useRef(null);
  const interval = useRef(null);
  let slide_change;
  //이미지 넘기는 함수

  const img_change = (nextIndex) => {
    slideList.current.style.transition = '300ms';
    // slideList.current.style.pointerEvents = 'none';
    setCurrentIndex(nextIndex);
    clearTimeout(slide_change);
    slide_change = setTimeout(() => {
      slideList.current.style.transition = '0s';
      // slideList.current.style.pointerEvents = 'all';
      nextIndex =
        nextIndex < 2
          ? slideImg.length - 3
          : nextIndex === slideImg.length - 2
          ? 2
          : nextIndex;
      setdelay(false);
      setCurrentIndex(nextIndex);
    }, 500);
  };

  useEffect(() => {
    setSlideWidth(slideItem.current.getBoundingClientRect().width);
    //slide 양 옆 어둡게 하는 함수
    const slideImages = slideList.current.querySelectorAll('.slide_item');
    slideImages.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.remove('slide_shadow');
      } else {
        item.classList.add('slide_shadow');
      }
    });

    //이미지 자동넘김
    clearInterval(interval.current);
    let nextIndex;
    interval.current = setInterval(() => {
      nextIndex = currentIndex + 1;
      img_change(nextIndex);
    }, 2000);
  }, [currentIndex]);

  //이미지 li로 출력
  const slidelist = slideImg.map((item) => (
    <li className='slide_item' ref={slideItem} key={item.id}>
      <img className='slide_img' src={item.image} alt='' />
    </li>
  ));

  //버튼 클릭 시 이미지 넘김
  const changeImg = (e) => {
    console.log(e.target.className.includes('btn_pre'));
    if (delay === true) {
      return;
    } else {
      let nextIndex = e.target.className.includes('btn_pre')
        ? currentIndex - 1
        : currentIndex + 1;
      console.log(nextIndex);
      console.log(slideImg.length);
      // 인덱스가 -1이 되면 slideImg.length -1
      //  slideImg.length가 되면 인덱스 0

      console.log(slideList.current);
      img_change(nextIndex);
      setdelay(true);
    }
  };

  // mouseEvent
  const MouseOver = () => {
    clearInterval(interval.current);
    console.log('in');
  };
  const MouseLeave = (event) => {
    clearInterval(interval.current);
    let nextIndex;
    interval.current = setInterval(() => {
      nextIndex = currentIndex + 1;
      img_change(nextIndex);
    }, 2000);
    console.log('out');
    // if (startPoint) {
    //   dragEvent(event);
    // }
  };

  //swiper Event

  let startPoint;
  let endPoint;
  let swiperX = 0;
  let swiperWidth = 0;

  const mouseDownEvent = (event) => {
    event.preventDefault();
    if (startPoint) {
      return;
    } else {
      startPoint = event.clientX;
      console.log('s', startPoint);
    }
    document.onmousemove = mouse;
  };

  const mouseUpEvent = (event) => {
    let nextIndex;
    if (startPoint) {
      endPoint = event.clientX;
      nextIndex =
        startPoint === endPoint
          ? currentIndex
          : startPoint > endPoint
          ? currentIndex + 1
          : currentIndex - 1;
      img_change(nextIndex);
      document.onmousemove = null;
      startPoint = undefined;
      console.log('hi');
    } else {
      return;
    }
  };

  const mouse = (event) => {
    swiperX = event.clientX;
    swiperWidth = startPoint - swiperX;
    slideList.current.style.transform = `translateX(calc(${
      (innerWidth - slideWidth) / 2
    }px - ${slideWidth * currentIndex}px - ${swiperWidth}px))`;
  };

  return (
    <div className='slide'>
      <ul
        className='slide_list'
        ref={slideList}
        onMouseOver={MouseOver}
        onMouseLeave={MouseLeave}
        onMouseDown={mouseDownEvent}
        onMouseUp={mouseUpEvent}
        style={{
          transform: `translateX(calc(${(innerWidth - slideWidth) / 2}px - ${
            slideWidth * currentIndex
          }px))`,
        }}
      >
        {slidelist}
      </ul>
      <button className='btn btn_pre' onClick={changeImg}>
        이전
      </button>
      <button className='btn btn_next' onClick={changeImg}>
        다음
      </button>
    </div>
  );
};

export default Slide;
