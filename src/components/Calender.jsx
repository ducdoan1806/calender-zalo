import React from "react";
import { LunarDate } from "vietnamese-lunar-calendar";
import { DatePicker } from "zmp-ui";

const Calender = ({ month, year }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const date = new Date(year, month);
  const firstDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const rows = [];

  let currentDay = 1;
  let prevMonthDay = prevMonthDays - firstDay + 1;

  for (let i = 0; i < 6; i++) {
    const cells = [];

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cells.push(
          <td key={j} className="prev-month">
            {prevMonthDay++}
          </td>
        );
      } else if (currentDay > daysInMonth) {
        cells.push(
          <td key={j} className="next-month">
            {currentDay - daysInMonth}
          </td>
        );
        currentDay++;
      } else {
        const dayClass = isToday(currentDay) ? "today" : "";
        const lunarDay = new LunarDate(year, month + 1, currentDay); // month + 1 because month is zero-based
        console.log("lunarDay: ", lunarDay);
        cells.push(
          <td key={j} className={dayClass}>
            {currentDay}
            <br />
            <span
              className="lunar-day"
              style={lunarDay.date === 1 ? { color: "red" } : {}}
            >
              {lunarDay.date === 1
                ? lunarDay.date + "/" + lunarDay.month
                : lunarDay.date}
            </span>
          </td>
        );
        currentDay++;
      }
    }

    rows.push(<tr key={i}>{cells}</tr>);

    if (currentDay > daysInMonth) {
      break;
    }
  }

  return (
    <div className="calender">
      <DatePicker
        mask
        maskClosable
        locale="vi"
        title="Select month"
        defaultValue={new Date()}
        formatPickedValueDisplay={(date) =>
          `Tháng ${new Date(date).getMonth() + 1} năm ${new Date(
            date
          ).getFullYear()}`
        }
      />

      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Calender;
