export function capitalized(word: string | undefined) {
  if (!word) return
  return word.charAt(0).toUpperCase() + word.slice(1)
}
