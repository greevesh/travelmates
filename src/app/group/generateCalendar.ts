import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { CalendarDay } from "../group/types";

const generateCalendar = (year: number, month: number) => {
  const startDate: Date = startOfMonth(new Date(year, month));
  const endDate: Date = endOfMonth(startDate);
  const daysInMonth: Date[] = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const calendar: CalendarDay[] = daysInMonth.map((date) => ({
    date: date,
    day: format(date, "d"),
  }));

  return { calendar, daysInMonth };
};

export default generateCalendar;
