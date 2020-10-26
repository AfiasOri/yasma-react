import dayJS from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayJS.extend(relativeTime);

export const timeAgo = date => {
	return dayJS(date).fromNow();
};
