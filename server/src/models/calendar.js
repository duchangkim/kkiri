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
      default: [{}],
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

CalendarSchema.methods.changeCalendars = async function (newCalendars) {
  this.calendarData.calendars = newCalendars;
};

// schedules methods
CalendarSchema.methods.createSchedules = async function (newSchedule) {
  // console.log(Array.isArray(this.calendarData.schedules));
  await this.calendarData.schedules.push(newSchedule);
};

// common methods
CalendarSchema.methods.deleteCalendarData = async function (
  calendarData,
  scheduleId
) {
  this.calendarData[calendarData] = this.calendarData[calendarData].filter(
    (item) => item.id !== scheduleId
  );
  return this.calendarData[calendarData];
};

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;
