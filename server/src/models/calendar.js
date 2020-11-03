import mongoose, { Schema } from "mongoose";

const CalendarSchema = new Schema({
  // 커플 연결 성공시 주어지는 코드 - 채팅방룸id 캘린더 앨범 아이디로 사용
  coupleShareCode: {
    type: Number,
  },
  // 주인들_id
  owner: {
    type: Array,
  },
  calendarData: {
    calendars: {
      type: Array,
      default: [
        {
          id: 0,
          name: "기념일",
          color: "#ffffff",
          bgColor: "#ff838d",
          dragBgColor: "#ff838d",
          borderColor: "#ff838d",
        },
        {
          id: 1,
          name: "데이트",
          color: "#ffffff",
          bgColor: "#00a9ff",
          dragBgColor: "#00a9ff",
          borderColor: "#00a9ff",
        },
      ],
    },
    schedules: {
      type: Array,
      default: [
        {
          id: 0,
          calendarId: 1,
          category: "allday",
          raw: {
            class: "public",
          },
          title: "끼리 첫 시작!",
          location: "너 마음속🤍",
          start: new Date(),
          end: new Date(),
        },
      ],
    },
    dDay: {
      type: Array,
      default: [{}],
    },
  },
});

CalendarSchema.statics.findByCoupleShareCode = async function (
  coupleShareCode
) {
  return await this.findOne({ coupleShareCode });
};

// common methods
/**
 * newData에 자동 증가하는 id값을 부여한다.
 * calendarData("calendars", "schedules", "dDay")에 id값 부여된 newData를 추가한 후 그 결과를 반환함.
 *
 * @method createCalendarData
 * @param {String} calendarData 추가할 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Object} newData 추가 하고자 하는 calendarData 요소
 * @return {Array} 추가된 calendarData 리스트를 반환함
 */
CalendarSchema.methods.createCalendarData = async function (
  calendarData,
  newData
) {
  newData = {
    id:
      parseInt(
        this.calendarData[calendarData][
          this.calendarData[calendarData].length - 1
        ].id
      ) + 1,
    ...newData,
  };
  await this.calendarData[calendarData].push(newData);

  return this.calendarData[calendarData];
};

/**
 * calendarData("calendars", "schedules", "dDay") 에서 targetId로 찾은 값을 반환함
 *
 * @method getCaledarDataByTargetId
 * @param {String} calendarData 찾고자 하는 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Number} targetId 찾고자 하는 대상의 id값
 * @return {Object} calendarData.targetId로 찾은 결과를 반환함
 */
CalendarSchema.methods.getCaledarDataByTargetId = async function (
  calendarData,
  targetId
) {
  return await this.calendarData[calendarData].find(
    (item) => item.id === targetId
  );
};

/**
 * calendarData("calendars", "schedules", "dDay") 에서 targetId로 찾은 값을 modifiedData로 삭제하고 그 결과를 반환함
 *
 * @method deleteCalendarDataByTargetId
 * @param {String} calendarData 삭제할 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Number} targetId 수정하고싶은 대상 id값
 * @return {Array} 해당 요소를 삭제한 배열(결과)
 */
CalendarSchema.methods.deleteCalendarDataByTargetId = async function (
  calendarData,
  targetId
) {
  this.calendarData[calendarData] = await this.calendarData[
    calendarData
  ].filter((item) => item.id !== targetId);

  return this.calendarData[calendarData];
};

/**
 * calendarData("calendars", "schedules", "dDay") 에서 targetId로 찾은 값을 modifiedData로 수정하고 그 결과를 반환함
 *
 * @method modifyCalendarDataByTargetId
 * @param {String} calendarData 수정할 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Number} targetId 찾고자 하는 대상 id값, 반드시 정수여야 함
 * @param {Object} modifiedData 수정한 내용, 반드시 객체형식이여야 함
 * @return {Array} 수정된 내용까지 담은 수정할 대상("calendars", "schedules", "dDay") 배열을 반환함
 */
CalendarSchema.methods.modifyCalendarDataByTargetId = async function (
  calendarData,
  targetId,
  modifiedData
) {
  this.calendarData[calendarData] = await this.calendarData[
    calendarData
  ].map((item) => (item.id === targetId ? modifiedData : item));

  return this.calendarData[calendarData];
};

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;
