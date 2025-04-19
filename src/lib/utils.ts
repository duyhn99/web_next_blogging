import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param date
 * @returns "dd MMM yyyy"
 */
export const formatDateWithShortMonth = (date: string) =>
  new Date(date).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
