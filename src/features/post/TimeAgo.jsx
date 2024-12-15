import React from 'react'
import { parseISO,formatDistanceToNow } from 'date-fns'


function TimeAgo({timestamp}) {
    let timeAgo=''

    const date= parseISO(timestamp)
    const timePeriod= formatDistanceToNow(date)
    timeAgo=`${timePeriod} ago`

  return (
    <div>
        <span>
            &nbsp; <i>{timeAgo}</i>
        </span>
    </div>
  )
}

export default TimeAgo