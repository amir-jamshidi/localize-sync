export function flattenKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flattenKeys(value, fullKey));
    } else {
      acc[fullKey] = String(value);
    }
    return acc;
  }, {});
}
