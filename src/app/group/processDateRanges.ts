/* eslint-disable indent */
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { startDates, endDates } from "../globals";
import { DateRange } from "../create-journey/types";
import { ProcessDateRangesProps } from "./types";

const processDateRanges = (
  dateRanges: DateRange[],
  currentMonth: number,
  currentYear: number
): ProcessDateRangesProps => {
  const fetchDates = (dates: number[], accessor: (date: Date) => number) =>
    dateRanges.forEach(({ start, end }) => {
      if (start && end) {
        dates.push(accessor(start));
        dates.push(accessor(end));
      }
    });

  const fetchStartDates = () =>
    fetchDates(startDates, (date) => date.getDate());

  const fetchEndDates = () => fetchDates(endDates, (date) => date.getDate());

  fetchStartDates();
  fetchEndDates();

  const threeMonthsOrMoreDateRanges = dateRanges.filter(
    ({ start, end }: DateRange) =>
      start && end ? start.getMonth() !== end.getMonth() : null
  );

  const threeMonthsOrMoreDateRangeDays: Date[] = threeMonthsOrMoreDateRanges
    .map(({ start, end }) => eachDayOfInterval({ start, end }))
    .flat();

  const lastDayOfPreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();

  const startFromColumnOne =
    threeMonthsOrMoreDateRangeDays.length > 0
      ? threeMonthsOrMoreDateRangeDays.some(
          (day) => day.getDate() === 1 && day.getMonth() === currentMonth
        ) &&
        threeMonthsOrMoreDateRangeDays.some(
          (day) =>
            day.getDate() === lastDayOfPreviousMonth &&
            day.getMonth() === currentMonth - 1
        )
      : false;

  return {
    startDates,
    endDates,
    threeMonthsOrMoreDateRanges,
    startFromColumnOne,
    lastDayOfPreviousMonth,
  };
};

export default processDateRanges;
