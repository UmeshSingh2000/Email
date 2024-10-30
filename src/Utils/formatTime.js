export const formattedDate = (date) => {
    return date
        ? new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }) +
        " " +
        new Date(date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "No date";
}
