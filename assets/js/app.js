document.addEventListener('DOMContentLoaded', () => {
    const settings = {
        annualSalary: 80000,
        workStartTime: '09:00',
        workEndTime: '17:00',
    };

    const workdayTimerEl = document.getElementById('workday-timer');
    const workdayTitleEl = workdayTimerEl.previousElementSibling;
    const weekendTimerEl = document.getElementById('weekend-timer');
    const holidayNameEl = document.getElementById('holiday-name');
    const holidayTimerEl = document.getElementById('holiday-timer');
    const earningsEl = document.getElementById('earnings');
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');

    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings-btn');

    const annualSalaryInput = document.getElementById('annual-salary');
    const workStartTimeInput = document.getElementById('work-start-time');
    const workEndTimeInput = document.getElementById('work-end-time');

    function loadSettings() {
        const savedSettings = localStorage.getItem('workdayTimerSettings');
        if (savedSettings) {
            Object.assign(settings, JSON.parse(savedSettings));
        }
        annualSalaryInput.value = settings.annualSalary;
        workStartTimeInput.value = settings.workStartTime;
        workEndTimeInput.value = settings.workEndTime;
    }

    function saveSettings() {
        settings.annualSalary = parseInt(annualSalaryInput.value, 10);
        settings.workStartTime = workStartTimeInput.value;
        settings.workEndTime = workEndTimeInput.value;
        localStorage.setItem('workdayTimerSettings', JSON.stringify(settings));
        settingsModal.classList.add('hidden');
    }

    function getEndTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    }

    function renderTimers() {
        const now = new Date();
        const workdayStart = getEndTime(settings.workStartTime);
        const workdayEnd = getEndTime(settings.workEndTime);

        // Workday Timer Logic
        if (now < workdayStart) {
            workdayTitleEl.textContent = 'Workday Starts In';
            workdayTimerEl.textContent = formatTimeDiff(workdayStart - now);
        } else if (now > workdayEnd) {
            workdayTitleEl.textContent = 'Day Is Over!';
            workdayTimerEl.textContent = "Enjoy your evening!";
        } else {
            workdayTitleEl.textContent = 'Workday Ends In';
            workdayTimerEl.textContent = formatTimeDiff(workdayEnd - now);
        }

        // Weekend
        const fridayEnd = new Date(now);
        const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday
        const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
        fridayEnd.setDate(now.getDate() + daysUntilFriday);
        const [endHours, endMinutes] = settings.workEndTime.split(':').map(Number);
        fridayEnd.setHours(endHours, endMinutes, 0, 0);
        weekendTimerEl.textContent = formatTimeDiff(fridayEnd - now);

        // Holiday
        const nextHoliday = getNextHoliday(now);
        holidayNameEl.textContent = nextHoliday.name;
        holidayTimerEl.textContent = formatTimeDiff(nextHoliday.date - now);
    }

    function renderEarnings() {
        const now = new Date();
        const workdayStart = getEndTime(settings.workStartTime);
        const workdayEnd = getEndTime(settings.workEndTime);

        if (now < workdayStart || now > workdayEnd) {
            earningsEl.textContent = formatCurrency(0);
            return;
        }

        const hourlyRate = settings.annualSalary / 2080;
        const hoursWorked = (now - workdayStart) / (1000 * 60 * 60);
        const earnings = hourlyRate * hoursWorked;
        earningsEl.textContent = formatCurrency(earnings);
    }

    function renderQuote() {
        const dailyQuote = getDailyQuote();
        quoteTextEl.textContent = `"${dailyQuote.quote}"`;
        quoteAuthorEl.textContent = `- ${dailyQuote.author}`;
    }

    function init() {
        loadSettings();
        renderTimers();
        renderEarnings();
        renderQuote();
        setInterval(() => {
            renderTimers();
            renderEarnings();
        }, 1000);

        settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
        closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
        saveSettingsBtn.addEventListener('click', saveSettings);
    }

    init();
});
