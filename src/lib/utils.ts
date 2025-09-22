import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function time2time(t: string, f: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(t).format(f)
}