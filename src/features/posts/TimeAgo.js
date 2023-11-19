import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} Ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i> {timeAgo} </i>
    </span>
  );
};

export default TimeAgo;
