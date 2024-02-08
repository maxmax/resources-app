import React from 'react';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  getToDay,
  months
} from "@/helpers/dateFunctions";
import { ResourceProps } from '@/utils/api/resources';
import TimeTableTasks from './TimeTableTasks';

interface TimeRange {
  fromSelectDay: number;
  fromSelectYear: number;
  fromSelectMonth: number;
  toSelectDay: number;
  toSelectYear: number;
  toSelectMonth: number;
}

interface TimeTableProps {
  timeRange: TimeRange;
  resources: ResourceProps[];
  setPrevMonth: (e: React.MouseEvent<HTMLSpanElement>, numMonths: number, index: number) => void;
  setNextMonth: (e: React.MouseEvent<HTMLSpanElement>, numMonths: number, index: number) => void;
}

const TimeTable: React.FC<TimeTableProps> = ({ timeRange, resources, setPrevMonth, setNextMonth }) => {
  const ganttTimePeriodSpan: React.CSSProperties = {
    margin: "auto",
  };

  // rows
  const startMonth = new Date(timeRange.fromSelectYear, timeRange.fromSelectMonth);
  const endMonth = new Date(timeRange.toSelectYear, timeRange.toSelectMonth);
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  const month = new Date(startMonth);

  const monthRows: JSX.Element[] = [];
  const dayRows: JSX.Element[] = [];
  let dayRow: JSX.Element[] = [];
  const weekRows: JSX.Element[] = [];
  let weekRow: JSX.Element[] = [];
  const resourcesRows: JSX.Element[] = [];
  let resourceRow: JSX.Element[] = [];

  for (let i = 0; i < numMonths; i++) {

    // month rows
    monthRows.push(
      <div key={i} style={{outline: "none" }} className="month-rows box-row" data-type={month.getMonth()}>
        <span style={ganttTimePeriodSpan}>
          <span className="month-range prev" data-month={month.getMonth()} data-year={month.getFullYear()} onClick={(e) => setPrevMonth(e, numMonths, i)}>
            <NavigateBefore />
          </span>
          {months[month.getMonth()] + " - " + month.getFullYear()}
          <span className="month-range next" data-month={month.getMonth()} data-year={month.getFullYear()} onClick={(e) => setNextMonth(e, numMonths, i)}>
            <NavigateNext />
          </span>
        </span>
      </div>
    );

    // day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;

    // TimePeriod
    for (let j = 1; j <= numDays; j++) {

      const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, j - 1);

      // Current day
      const toDay = getToDay(currYear, currMonth - 1, j);

      dayRow.push(
        <div key={j} className={'day-row box-row'}>
          <span
          className={toDay ? 'day-row-today' : ''}
          style={{
            ...ganttTimePeriodSpan,
            backgroundColor: dayOfTheWeek === "S" ? "var(--color-s)" : "transparent"
          }}>
            {j}
          </span>
          {!!toDay && <div className="today-line"></div>}
        </div>
      );

      weekRow.push(
        <div key={j} className="week-row box-row">
          <span style={{
            ...ganttTimePeriodSpan,
            backgroundColor: dayOfTheWeek === "S" ? "var(--color-s)" : "transparent",
            color: "#3E455B"
          }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
          {!!toDay && <div className="today-line"></div>}
        </div>
      );
    }

    dayRows.push(
      <div key={i} className="day-rows box-row">
        {dayRow}
      </div>
    );

    weekRows.push(
      <div key={i} className="week-rows box-row">
        {weekRow}
      </div>
    );

    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  // resources rows
  if (resources) {
    resources.forEach((resource) => {
      const mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {

          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);

          const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);

          const toDay = getToDay(curYear, curMonth - 1, j)

          resourceRow.push(
            <div
              key={`${resource.id}-${j}`}
              style={{
                backgroundColor: dayOfTheWeek === "S" ? "var(--color-s)" : "#fff",
              }}
              className="gantt-time-period-cell"
              data-task={resource?.id}
              data-date={formattedDate}
            >
              <span>
                <TimeTableTasks 
                  currentResource={resource}
                  formattedDate={formattedDate}
                  timeRange={timeRange}
                />
              </span>
              {!!toDay && <div className="today-line"></div>}
            </div>
          );
        }

        resourcesRows.push(
          <div
            key={`${i}-${resource?.id}`}
            style={{height: `${(resource?.tasks?.length) > 1 ? 22 * (resource?.tasks?.length) : 22}px`}}
            data-row-resource-tasks={resource?.tasks?.length}
            className={`task-rows box-row row-resource-${resource?.id}`}>
            {resourceRow}
          </div>
        );

        resourceRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  return (
    <div className='gantt-time-table' style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}>
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        // id="gantt-time-period-cell-container"
        className="gantt-time-table-period-cell-container overflow-space"
        style={{
          gridColumn: "1/-1",
          display: "grid",
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {resourcesRows}
      </div>
    </div>
  );
}

export default TimeTable;
