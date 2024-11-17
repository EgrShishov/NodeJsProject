import {useEffect, useState} from "react";

const DateTimeInfo = () => {
    const [userTimezone, setUserTimezone] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [utcDate, setUtcDate] = useState('');

    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date().toLocaleString();
        const utcDate = new Date().toUTCString();

        setUserTimezone(timezone);
        setCurrentDate(date.toString());
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