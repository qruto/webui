import { useMediaQuery } from '@vueuse/core'

export function isExternal(url: string) {
  const currentUrl = new URL(window.location.href)

  try {
    const targetUrl = new URL(url)

    return targetUrl.hostname !== currentUrl.hostname
  } catch {
    return false
  }
}

export function query(variant: string) {
  let mediaQuery = `(min-width: var(--breakpoint-${variant}))`

  if (variant.startsWith('max-')) {
    variant = variant.substring(4)

    mediaQuery = `not all and (min-width: var(--breakpoint-${variant}))`
  }

  if (variant === 'dark') {
    mediaQuery = '(prefers-color-scheme: dark)'
  }

  if (variant === 'portrait') {
    mediaQuery = '(orientation: portrait)'
  }

  if (variant === 'landscape') {
    mediaQuery = '(orientation: landscape)'
  }

  if (variant === 'motion-safe') {
    mediaQuery = '(prefers-reduced-motion: no-preference)'
  }

  if (variant === 'motion-reduce') {
    mediaQuery = '(prefers-reduced-motion: reduce)'
  }

  if (variant === 'contrast-more') {
    mediaQuery = '(prefers-contrast: more)'
  }

  if (variant === 'contrast-less') {
    mediaQuery = '(prefers-contrast: less)'
  }

  if (variant === 'print') {
    mediaQuery = 'print'
  }

  return useMediaQuery(mediaQuery)
}
