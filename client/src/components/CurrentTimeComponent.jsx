import {useEffect, useState} from "react";

const DateTimeInfo = () => {
    const dateTimestamp = '2023-10-29T10:00:00Z';
    const [userTimezone, setUserTimezone] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [utcDate, setUtcDate] = useState('');

    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date(dateTimestamp).toLocaleString();
        const utcDate = new Date(dateTimestamp).toUTCString();

        setUserTimezone(timezone);
        setCurrentDate(date.toString('YYYY-MM-DD HH:mm:ss'));
        setUtcDate(utcDate);
    }, []);

    return (
        <div className="current-time">
            <p>Текущая дата и время в вашей временной зоне ({userTimezone}): {currentDate}</p>
            <p>UTC дата и время: {utcDate}</p>
        </div>
    )
};

export default DateTimeInfo;