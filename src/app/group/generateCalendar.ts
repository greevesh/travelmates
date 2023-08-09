import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

interface CalendarDay {
  date: Date;
  day: string;
}

function generateCalendar(year: number, month: number): CalendarDay[] {
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

  return calendar;
}

export default generateCalendar;
