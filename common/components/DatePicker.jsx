"use client";

import { useState, useRef, useEffect } from "react";
import { IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import styles from "./DatePicker.module.css";

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function formatDisplay(date) {
  if (!date) return null;
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function DatePicker({ value, onChange, error, maxDate, minDate, placeholder = "Pilih tanggal lahir" }) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState((value ?? new Date(2000, 0)).getFullYear());
  const [viewMonth, setViewMonth] = useState((value ?? new Date(2000, 0)).getMonth());
  const ref = useRef(null);

  const minYear = minDate ? minDate.getFullYear() : 1940;
  const maxYear = maxDate ? maxDate.getFullYear() : today.getFullYear();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth - 1);

  const cells = [];

  // prev month filler
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: daysInPrevMonth - firstDay + 1 + i, otherMonth: true, date: new Date(viewYear, viewMonth - 1, daysInPrevMonth - firstDay + 1 + i) });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false, date: new Date(viewYear, viewMonth, d) });
  }
  // next month filler
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, otherMonth: true, date: new Date(viewYear, viewMonth + 1, d) });
  }

  const isSelected = (date) =>
    value &&
    date.getDate() === value.getDate() &&
    date.getMonth() === value.getMonth() &&
    date.getFullYear() === value.getFullYear();

  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isDisabled = (date) => {
    if (maxDate && date > maxDate) return true;
    if (minDate && date < minDate) return true;
    return false;
  };

  const handleSelect = (date) => {
    if (isDisabled(date)) return;
    onChange(date);
    setOpen(false);
  };

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).reverse();

  return (
    <div className={styles.picker} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center h-12 w-full rounded-lg border bg-white overflow-hidden text-left transition-colors ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-center w-12 h-full bg-green shrink-0">
          <IconCalendar size={18} color="white" />
        </div>
        <span className={`flex-1 px-4 text-sm ${value ? "text-gray-700" : "text-gray-400"}`}>
          {formatDisplay(value) ?? placeholder}
        </span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {/* Header */}
          <div className={styles.header}>
            <button type="button" className={styles.navBtn} onClick={prevMonth}>
              <IconChevronLeft size={16} />
            </button>

            <div className={styles.headerCenter}>
              <select
                className={styles.select}
                value={viewMonth}
                onChange={e => setViewMonth(Number(e.target.value))}
              >
                {MONTHS_ID.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>

              <select
                className={styles.select}
                value={viewYear}
                onChange={e => setViewYear(Number(e.target.value))}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <button type="button" className={styles.navBtn} onClick={nextMonth}>
              <IconChevronRight size={16} />
            </button>
          </div>

          {/* Weekday labels */}
          <div className={styles.weekdays}>
            {DAYS_SHORT.map(d => (
              <div key={d} className={styles.weekday}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className={styles.days}>
            {cells.map(({ day, otherMonth, date }, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(date)}
                className={[
                  styles.day,
                  isSelected(date) ? styles.daySelected : "",
                  isToday(date) && !isSelected(date) ? styles.dayToday : "",
                  isDisabled(date) ? styles.dayDisabled : "",
                  otherMonth ? styles.dayOtherMonth : "",
                ].join(" ")}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
