export default function getCurrentDate(): Date {
    const ms = Date.now();
    return new Date(ms);
}
