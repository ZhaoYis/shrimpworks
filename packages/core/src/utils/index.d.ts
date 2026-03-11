/**
 * Utility functions
 */
import { type ClassValue } from 'clsx';
/**
 * Generate a unique ID
 */
export declare function generateId(): string;
/**
 * Sleep for a given number of milliseconds
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Retry a function with exponential backoff
 */
export declare function retry<T>(fn: () => Promise<T>, options?: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
}): Promise<T>;
/**
 * Format a date to ISO string
 */
export declare function formatDate(date: Date | string): string;
/**
 * Deep clone an object
 */
export declare function deepClone<T>(obj: T): T;
/**
 * Check if a value is not null or undefined
 */
export declare function isNotNil<T>(value: T | null | undefined): value is T;
/**
 * Merge class names
 */
export declare function cn(...inputs: ClassValue[]): string;
//# sourceMappingURL=index.d.ts.map