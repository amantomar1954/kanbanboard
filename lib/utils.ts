import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique short ID for cards, columns, and tree nodes.
 * Uses base-36 encoding of a random number for compactness.
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
