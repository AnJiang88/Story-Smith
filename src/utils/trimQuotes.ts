export default function trimQuotes(str: string) {
  str = str.trim()
  if (str[0] === `"`) {
    str = str.substring(1)
  }

  if (str[str.length - 1] === `"`) {
    str = str.substring(0, str.length - 2)
  }

  return str
}
