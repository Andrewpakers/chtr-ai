export default function truncateString(strArg, num) {
    const str = String(strArg);
    if (!str) {
        return "";
    }
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}