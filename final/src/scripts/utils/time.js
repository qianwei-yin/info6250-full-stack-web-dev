import dayjs from 'dayjs';

export function formatTimeForServer() {
	return dayjs().format('YYYY-MM-DD[T]HH:mm');
}
