// Weekly exclusions in Europe/London wall-clock time. Sessions last 60 minutes.
function sessionConflict(date, time) {
  if (!date || !time) return '';
  const [year, month, day] = date.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const [hour, minute] = time.split(':').map(Number);
  const start = hour * 60 + minute;
  const end = start + 60;
  const exclusions = {
    1: [[930, 1020, 'Monday 15:30–17:00']],
    2: [[945, 1035, 'Tuesday 15:45–17:15']],
    4: [[735, 795, 'Thursday 12:15–13:15'], [930, 990, 'Thursday 15:30–16:30']]
  };
  if (end > 1440) return 'Choose a one-hour session that finishes before midnight.';
  const conflict = (exclusions[weekday] || []).find(([from, to]) => start < to && end > from);
  return conflict ? 'This one-hour session overlaps an unavailable period: ' + conflict[2] + ' (UK time). Please choose another time.' : '';
}
if (typeof module !== 'undefined') module.exports = { sessionConflict };
