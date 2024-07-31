// resize.ts

export const isSmallScreen = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 640
}