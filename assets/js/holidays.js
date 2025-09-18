const holidays = [
    { name: "New Year's Day", date: new Date("2025-01-01T00:00:00") },
    { name: "Martin Luther King, Jr. Day", date: new Date("2025-01-20T00:00:00") },
    { name: "Washington's Birthday", date: new Date("2025-02-17T00:00:00") },
    { name: "Memorial Day", date: new Date("2025-05-26T00:00:00") },
    { name: "Juneteenth National Independence Day", date: new Date("2025-06-19T00:00:00") },
    { name: "Independence Day", date: new Date("2025-07-04T00:00:00") },
    { name: "Labor Day", date: new Date("2025-09-01T00:00:00") },
    { name: "Columbus Day", date: new Date("2025-10-13T00:00:00") },
    { name: "Veterans Day", date: new Date("2025-11-11T00:00:00") },
    { name: "Thanksgiving Day", date: new Date("2025-11-27T00:00:00") },
    { name: "Christmas Day", date: new Date("2025-12-25T00:00:00") },
];

function getNextHoliday(now) {
    const upcoming = holidays.filter(h => h.date > now);
    if (upcoming.length > 0) {
        return upcoming[0];
    } else {
        // If no holidays are left in the current year, check next year's holidays
        const nextYearHolidays = holidays.map(h => {
            const nextYearDate = new Date(h.date);
            nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
            return { ...h, date: nextYearDate };
        });
        return nextYearHolidays[0];
    }
}