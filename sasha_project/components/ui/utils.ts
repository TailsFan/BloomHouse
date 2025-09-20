export type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: any };

export function clsx(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .map(input => {
      if (typeof input === 'string' || typeof input === 'number') {
        return input.toString();
      }
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}