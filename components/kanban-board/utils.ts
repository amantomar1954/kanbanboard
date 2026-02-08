import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Generates a unique short ID for cards and columns.
 */
export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}
