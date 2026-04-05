"use client";

import { useMemo, useState } from "react";
import { api } from "~/trpc/react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CATEGORY_STYLES: Record<string, { dot: string; bg: string; label: string }> = {
  music:     { dot: "bg-brand-500 dark:bg-brand-400", bg: "bg-brand-50 dark:bg-brand-700/20", label: "Music" },
  coffee:    { dot: "bg-amber-600 dark:bg-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", label: "Coffee" },
  community: { dot: "bg-sage-500 dark:bg-sage-400", bg: "bg-sage-50 dark:bg-sage-600/20", label: "Community" },
  wellness:  { dot: "bg-sky-500 dark:bg-sky-400", bg: "bg-sky-50 dark:bg-sky-900/20", label: "Wellness" },
  market:    { dot: "bg-violet-500 dark:bg-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20", label: "Market" },
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.community!;
}

type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  endTime: string | null;
  location: string;
  category: string;
};

export function EventsCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const { data: events = [], isLoading } = api.event.getByMonth.useQuery(
    { year, month },
    { staleTime: 60_000 },
  );

  // Group events by day-of-month
  const eventsByDay = useMemo(() => {
    const map = new Map<number, Event[]>();
    for (const evt of events) {
      const day = new Date(evt.date).getUTCDate();
      const arr = map.get(day) ?? [];
      arr.push(evt);
      map.set(day, arr);
    }
    return map;
  }, [events]);

  // Calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null;

  function goToPrevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDate(null);
  }

  function goToNextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDate(null);
  }

  const selectedEvents = selectedDate ? eventsByDay.get(selectedDate) ?? [] : [];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Calendar grid */}
      <div className="flex-1">
        {/* Month navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={goToPrevMonth}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            &larr; Prev
          </button>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-cream-50">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={goToNextMonth}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-cream-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Next &rarr;
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="pb-2 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-px">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = eventsByDay.get(day);
            const isToday = day === today;
            const isSelected = day === selectedDate;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition ${
                  isSelected
                    ? "bg-zinc-900 text-cream-50 dark:bg-cream-100 dark:text-zinc-900"
                    : isToday
                      ? "bg-brand-100 font-bold text-brand-700 dark:bg-brand-700/30 dark:text-brand-400"
                      : "text-zinc-700 hover:bg-cream-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{day}</span>
                {dayEvents && (
                  <div className="mt-0.5 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((evt) => (
                      <span
                        key={evt.id}
                        className={`block h-1.5 w-1.5 rounded-full ${
                          isSelected
                            ? "bg-cream-50 dark:bg-zinc-900"
                            : getCategoryStyle(evt.category).dot
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`block h-2 w-2 rounded-full ${style.dot}`} />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {style.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Event detail sidebar */}
      <div className="lg:w-80">
        {isLoading ? (
          <p className="text-sm text-zinc-400">Loading...</p>
        ) : selectedDate && selectedEvents.length > 0 ? (
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
              {MONTH_NAMES[month]} {selectedDate}
            </h3>
            <div className="space-y-4">
              {selectedEvents.map((evt) => {
                const style = getCategoryStyle(evt.category);
                return (
                  <div
                    key={evt.id}
                    className={`grain relative rounded-xl border border-cream-300/60 p-5 shadow-sm dark:border-zinc-800 ${style.bg}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`block h-2 w-2 rounded-full ${style.dot}`} />
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {style.label}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-cream-50">
                      {evt.title}
                    </h4>
                    {evt.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {evt.description}
                      </p>
                    )}
                    <div className="mt-3 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <p>
                        {evt.startTime}
                        {evt.endTime ? ` \u2013 ${evt.endTime}` : ""}
                      </p>
                      <p>{evt.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : selectedDate ? (
          <div className="grain relative rounded-xl border border-cream-300/60 bg-cream-50 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-serif text-lg font-bold text-zinc-900 dark:text-cream-50">
              No events
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Nothing scheduled for {MONTH_NAMES[month]} {selectedDate}.
            </p>
          </div>
        ) : (
          <div className="grain relative rounded-xl border border-cream-300/60 bg-cream-50 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-serif text-lg font-bold text-zinc-900 dark:text-cream-50">
              Pick a date
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Select a day on the calendar to see what&apos;s happening.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
