import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import Sidebar from "../sidebar/Sidebar";
import DataTable from "./DataTable";
import { AiOutlineDown } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateFormatter = (date) => {
  const d = new Date(date);
  let ye = d.toString().substr(11, 4);
  let mo = d.toString().substr(4, 3);
  let da = d.toString().substr(8, 2);

  const newCreatedDate = `${ye}-${mo}-${da}`;
  return newCreatedDate;
};

const Home = () => {
  const [stats, setStats] = useState({});
  const [gridData, setGridData] = useState([]);
  const [showCount, setShowCount] = useState(false);
  const [entryCount, setEntryCount] = useState(50);
  const [showDuration, setShowDuration] = useState(false);
  const [dateRange, setDateRange] = useState();

  let allDates = [];
  gridData.forEach((item) => {
    return allDates.push(item?.created_At);
  });

  // CALCULATE MAX DATE
  var maxDate =
    allDates.length === 0
      ? ""
      : allDates?.reduce(function (a, b) {
          return a > b ? a : b;
        });

  // CALCULATE MIN DATE
  var minDate =
    allDates.length === 0
      ? ""
      : allDates?.reduce(function (a, b) {
          return a < b ? a : b;
        });

  console.log("maxDate " + maxDate);
  console.log("minDate " + minDate);

  // SELECTED FROM DATE
  const firstDate = dateRange
    ? DateFormatter(dateRange[0])
    : DateFormatter(new Date("2022-Feb-05"));

  // SELECTED TO DATE
  const lastDate = dateRange
    ? DateFormatter(dateRange[1])
    : DateFormatter(new Date());

  // GET STATS DATA
  const getStatsData = async () => {
    const res = await axios.get(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022 -04-01&todate=2022-08-24&page=1&limit=10"
    );
    try {
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET GRID DATA
  const getGridData = async () => {
    const res = await axios.get(
      `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${
        dateRange ? dateRange[0] : "2022-01-01"
      }&todate=${
        dateRange ? dateRange[0] : new Date()
      }&page=1&limit=${entryCount}`
    );
    try {
      setGridData(res.data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatsData();
  }, []);

  useEffect(() => {
    getGridData();
  }, [entryCount, dateRange]);

  // HANDLE SHOW ENTRIES FUNTION
  const handleShowEntries = (count) => {
    setEntryCount(count);
    setShowCount(false);
  };

  return (
    <div className="container__parent">
      <Sidebar />
      <div className="container home__container__main">
        <div className="app__highlights">
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.totalInstall}</span>
              <span>App Installs</span>
            </div>
          </div>
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.activeinstall}</span>
              <span>Active Installs</span>
            </div>
          </div>
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.churn}%</span>
              <span>Churn Rate</span>
            </div>
          </div>
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.totaluninstall}</span>
              <span>App un-Installs</span>
            </div>
          </div>
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.aliveappusers}</span>
              <span>Alive app users</span>
            </div>
          </div>
          <div className="app__type">
            <div className="icon"></div>
            <div className="status">
              <span>{stats?.alivechurn}</span>
              <span>Alive churn rate</span>
            </div>
          </div>
        </div>

        <div className="data__table__main">
          <div className="entries_duration">
            <div>
              <p>Show</p>
              <p onClick={() => setShowCount(!showCount)}>
                {entryCount} <AiOutlineDown />
              </p>
              {showCount && (
                <div className="entry__overlap">
                  <p onClick={() => handleShowEntries(10)}>10</p>
                  <p onClick={() => handleShowEntries(50)}>50</p>
                  <p onClick={() => handleShowEntries(100)}>100</p>
                  <p onClick={() => handleShowEntries(500)}>500</p>
                  <p onClick={() => handleShowEntries(1000)}>1000</p>
                </div>
              )}
              <p>Entries</p>
            </div>
            <div>
              <p onClick={() => setShowDuration(!showDuration)}>
                Select Duration <AiOutlineDown />
              </p>
              {showDuration && (
                <div className="duration__overlap_div">
                  <div>
                    <div></div>
                    <div>
                      <Calendar
                        onChange={setDateRange}
                        value={dateRange}
                        allowPartialRange={true}
                        selectRange={true}
                        defaultView={`month`}
                        maxDate={new Date(maxDate)}
                        minDate={new Date(minDate)}
                        className="custom__calendar"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DataTable
            gridData={gridData}
            firstDate={firstDate}
            lastDate={lastDate}
            entryCount={entryCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
