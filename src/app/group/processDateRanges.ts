/* eslint-disable indent */
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { startDates } from "../globals";
import { DateRange } from "../create-journey/types";
import { ProcessDateRangesParams } from "./types";

const processDateRanges = (
  dateRanges: DateRange[],
  currentMonth: number,
  currentYear: number
): ProcessDateRangesParams => {
  const fetchDates = (dates: number[], accessor: (date: Date) => number) =>
    dateRanges.forEach(({ start, end }) => {
      start ? dates.push(accessor(start)) : null;
    });

  const fetchStartDates = () =>
    fetchDates(startDates, (date) => date.getDate());

  fetchStartDates();

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
    threeMonthsOrMoreDateRanges,
    startFromColumnOne,
    lastDayOfPreviousMonth,
  };
};

export default processDateRanges;
