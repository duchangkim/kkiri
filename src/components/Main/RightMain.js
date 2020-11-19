import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import calculateDday from '../../lib/calculateDday';
import { func } from 'joi';
import LoadingPage from '../../pages/LoadingPage';
import Figure from 'react-bootstrap/Figure';

const RightMainBlock = styled.div`
  height: 100%;
  a {
    text-decoration: none;
  }
`;

const ScheduleItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: 5px;
`;

const ScheduleTitle = styled.div`
  width: 40%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DdayListBlock = styled.ul`
  margin: 0;
  padding: 0;
`;

const DdayItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  padding: 0 10px;
  margin-bottom: 5px;
`;

const AlbumItem = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 70%;
  display: flex;
  .price {
    width: 23%;
    height: 100%;
    margin-right: 0.5rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const RightMain = ({ schedules, dDays, albums }) => {
  console.log(schedules);
  console.log(dDays);

  if (!schedules || !dDays || !albums) {
    return <LoadingPage />;
  }

  return (
    <RightMainBlock>
      <div className="Right-Main" id="Right-Main">
        <div className="Krikri-Mall">
          <div className="Left-Mall">
            <h4>새로운 이슈</h4>
            <div className="New-Issue">
              <input type="radio" name="radio-btn" id="radio1" />
              <input type="radio" name="radio-btn" id="radio2" />
              <input type="radio" name="radio-btn" id="radio3" />
              <input type="radio" name="radio-btn" id="radio4" />
              <div className="slide first">
                <img
                  src={require('../../images/issue1.jfif')}
                  alt="새로운 이슈 첫번째 슬라이드"
                />
              </div>
              <div className="slide">
                <img
                  src={require('../../images/date1.jfif')}
                  alt="새로운 이슈 두번째 슬라이드"
                />
              </div>
              <div className="slide">
                <img
                  src={require('../../images/date2.jfif')}
                  alt="새로운 이슈 세번째 슬라이드"
                />
              </div>
              <div className="slide">
                <img
                  src={require('../../images/date3.jfif')}
                  alt="새로운 이슈 네번째 슬라이드"
                />
              </div>
            </div>
            <div className="navigation-manual">
              <label htmlFor="radio1" className="manual-btn"></label>
              <label htmlFor="radio2" className="manual-btn"></label>
              <label htmlFor="radio3" className="manual-btn"></label>
              <label htmlFor="radio4" className="manual-btn"></label>
            </div>
          </div>
          <div className="Right-Mall">
            <h4>데이트 추천장소</h4>
            <div id="wrapper">
              <div className="datePlace">
                <a
                  href="https://adventure.lotteworld.com/kor/main/index.do"
                  target="_blank"
                >
                  <img
                    src={require('../../images/lotte.jpg')}
                    alt="롯데월드 어드벤쳐"
                  />
                </a>
                <div className="caption">
                  <h2>LOTTE WORLD ADVENTURE</h2>
                  <p>
                    놀이기구, 물미끄럼틀, 해양생물 전시관을 한 곳에서 즐길 수
                    있는 가족형 어드벤처 파크입니다.
                  </p>
                </div>
              </div>
              <div className="datePlace">
                <a
                  href="https://www.everland.com/web/everland/main.html"
                  target="_blank"
                >
                  <img src={require('../../images/ever.jpg')} alt="애버랜드" />
                </a>
                <div className="caption">
                  <h2>EVERLAND</h2>
                  <p>
                    동물원을 비롯하여 놀이기구, 쇼, 상점, 식당, 테마존 등이 있는
                    인기 놀이공원입니다.
                  </p>
                </div>
              </div>
              <div className="datePlace">
                <a
                  href="https://korean.visitseoul.net/attractions/%EB%B6%81%EC%95%85%EC%8A%A4%EC%B9%B4%EC%9D%B4%EC%9B%A8%EC%9D%B4-%ED%8C%94%EA%B0%81%EC%A0%95_/11117"
                  target="_blank"
                >
                  <img
                    src={require('../../images/bugak.jpg')}
                    alt="북악스카이웨이"
                  />
                </a>
                <div className="caption">
                  <h2>BUGAK SKYWAY</h2>
                  <p>
                    연인들의 데이트 코스로 손꼽히는 북악스카이웨이는
                    남산서울타워와는 또 다른 각도로 서울 전체를 볼 수 있는
                    곳이다.
                  </p>
                </div>
              </div>
              <div className="datePlace">
                <a href="https://namisum.com/" target="_blank">
                  <img src={require('../../images/nami.png')} alt="남이섬" />
                </a>
                <div className="caption">
                  <h2>NAMISUM</h2>
                  <p>
                    유람선, 메타세콰이어길, 번지점프, 짚와이어, 짚라인,
                    가족여행, 경치, 가을여행, 단풍여행, 기차여행을 이용할 수
                    있는 곳이다.
                  </p>
                </div>
              </div>
              <div className="datePlace">
                <a
                  href="https://www.siheung.go.kr/portal/treasureMap/list.do?mId=0801020000"
                  target="_blank"
                >
                  <img
                    src={require('../../images/oi.jpg')}
                    alt="오이도 빨간등대"
                  />
                </a>
                <div className="caption">
                  <h2>OIDO(ISLAND)</h2>
                  <p>
                    인기토픽은 조개찜, 전망대, 조개구이, 드라이브, 칼국수이고,
                    찾는목적은 갯벌체험, 나들이, 경치, 데이트, 비오는날이다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Krikri-Calendar">
          <Link to="/kkiri/calendar">
            <h3>Calendar</h3>
          </Link>
          <div className="To-Calendar">
            <div className="Left-List">
              <ul>
                {schedules.map((schedule) => (
                  <ScheduleItem key={schedule.id}>
                    <div>
                      {new Date(schedule.start).getFullYear()}년{' '}
                      {new Date(schedule.start).getMonth() + 1}월{' '}
                      {new Date(schedule.start).getDate()}일
                    </div>
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                  </ScheduleItem>
                ))}
              </ul>
            </div>
            <div className="Right-List">
              <DdayListBlock>
                {dDays.map((dDay) => (
                  <DdayItem>
                    <div>{dDay.title}</div>
                    <div>{calculateDday(new Date(dDay.start))}</div>
                  </DdayItem>
                ))}
              </DdayListBlock>
            </div>
          </div>
        </div>
        <div className="Krikri-Album">
          <Link to="/kkiri/albums">
            <h3>Album</h3>
          </Link>
          <AlbumItem>
            {albums.length === 0 ||
              albums.fileData.files
                .slice(-5)
                .sort(function (a, b) {
                  return b.keyid - a.keyid;
                })
                .map(
                  (album, index) =>
                    album.filename && (
                      <div className="price" key={album.keyid}>
                        <img
                          src={`http://localhost:3000/uploads/${album.filename}`}
                        />
                      </div>
                    )
                )}
          </AlbumItem>
        </div>
      </div>
    </RightMainBlock>
  );
};

export default RightMain;
