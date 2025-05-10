export const getHoursMinutes = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setUTCHours(dateObj.getUTCHours() + 3);
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};