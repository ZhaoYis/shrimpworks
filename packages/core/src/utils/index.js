/**
 * Utility functions
 */
import { clsx } from 'clsx';
/**
 * Generate a unique ID
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Retry a function with exponential backoff
 */
export async function retry(fn, options = {}) {
    const { maxAttempts = 3, initialDelay = 1000, maxDelay = 30000, backoffFactor = 2, } = options;
    let lastError;
    let delay = initialDelay;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            if (attempt < maxAttempts) {
                await sleep(delay);
                delay = Math.min(delay * backoffFactor, maxDelay);
            }
        }
    }
    throw lastError;
}
/**
 * Format a date to ISO string
 */
export function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString();
}
/**
 * Deep clone an object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Check if a value is not null or undefined
 */
export function isNotNil(value) {
    return value !== null && value !== undefined;
}
/**
 * Merge class names
 */
export function cn(...inputs) {
    return clsx(inputs);
}
//# sourceMappingURL=index.js.map