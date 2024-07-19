import React, { Suspense } from "react";
import { LunarDate } from "vietnamese-lunar-calendar";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import Calender from "../components/Calender";

const HomePage = () => {
  const today = new Date();
  const lunarDate = new LunarDate(today);

  return (
    <Page className="page">
      <div className="flex gap-2">
        <div className="page__now">
          <table className="w-full">
            <thead>
              <tr>
                <td>Thứ</td>
                <td>Ngày</td>
                <td>Tháng</td>
                <td>Năm</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="2">
                  {today.getDay() === 6
                    ? "Chủ nhật"
                    : "Thứ " + (today.getDay() + 1)}
                </td>
                <td>{String(today.getDate()).padStart(2, "0")}</td>
                <td>{String(today.getMonth() + 1).padStart(2, "0")}</td>
                <td>{String(today.getFullYear()).padStart(2, "0")}</td>
              </tr>
              <tr>
                <td>{String(lunarDate.date).padStart(2, "0")}</td>
                <td>{String(lunarDate.month).padStart(2, "0")}</td>
                <td>{String(lunarDate.year)}</td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {lunarDate.lunarDate.can + " " + lunarDate.lunarDate.chi}
                </td>
                <td>
                  {lunarDate.lunarMonth.can + " " + lunarDate.lunarMonth.chi}
                </td>
                <td>
                  {" "}
                  {lunarDate.lunarYear.can + " " + lunarDate.lunarYear.chi}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Calender year={today.getFullYear()} month={today.getMonth()} />
    </Page>
  );
};

export default HomePage;
