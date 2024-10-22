import React, { useState } from "react";
import { LunarDate } from "vietnamese-lunar-calendar";

const Calender = ({ month, year }) => {
  const [newDate, setNewDate] = useState({ month: month, year: year });
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const isToday = (day) =>
    today.getFullYear() === Number(newDate.year) &&
    today.getMonth() === Number(newDate.month) &&
    today.getDate() === day;

  const date = new Date(Number(newDate.year), Number(newDate.month));
  const firstDay = date.getDay();
  const daysInMonth = new Date(
    Number(newDate.year),
    Number(newDate.month) + 1,
    0
  ).getDate();
  const prevMonthDays = new Date(
    Number(newDate.year),
    Number(newDate.month),
    0
  ).getDate();
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
        const lunarDay = new LunarDate(
          Number(newDate.year),
          Number(newDate.month) + 1,
          currentDay
        ); // month + 1 because month is zero-based
        cells.push(
          <td key={j} className={dayClass}>
            {currentDay}
            <br />
            <span
              className="lunar-day"
              style={
                lunarDay.date === 1 || lunarDay.date === 15
                  ? { color: "red" }
                  : {}
              }
            >
              {lunarDay.date === 1 || lunarDay.date === 15
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
      <div className="calender__text">
        <input
          type="month"
          value={`${Number(newDate.year)}-${(
            "0" +
            (Number(newDate.month) + 1)
          ).slice(-2)}`}
          onChange={(e) => {
            if (e.target.value) {
              const dateArr = e.target.value.split("-");
              setNewDate({ year: dateArr[0], month: dateArr[1] - 1 });
            }
          }}
        />
      </div>
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
