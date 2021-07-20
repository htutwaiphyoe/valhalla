export const updateState = (oldObj, newObj) => ({
    ...oldObj,
    ...newObj,
});

export const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "long",
    });
