export const formatDate = (timestamp) => {
    const date = new Date(timestamp); // Convert the timestamp to a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
    const year = date.getFullYear(); // Get the full year

    return `${day}.${month}.${year}`; // Format as "8.11.2024"
};