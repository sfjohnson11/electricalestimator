import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculatePercentage = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100
}

export const formatCurrency = (amount: number): string => {
  return amount.toFixed(2)
}
