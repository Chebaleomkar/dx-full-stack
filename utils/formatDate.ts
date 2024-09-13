export const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });
};