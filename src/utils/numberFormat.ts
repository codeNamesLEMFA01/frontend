export const numberWithSpaces = (x: number) =>
  new Intl.NumberFormat("fr-FR", { maximumSignificantDigits: 3 }).format(x)
