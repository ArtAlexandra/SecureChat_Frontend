export const getHoursMinutes = (date: string) => {
    const [hours, minutes] = date.split("T")[1].split(":");
    return `${hours}:${minutes}`;
};