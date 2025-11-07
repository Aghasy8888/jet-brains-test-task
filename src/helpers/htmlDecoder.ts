/**
 * Decodes HTML entities in a string
 * Converts entities like &quot;, &amp;, &#039;, etc. to their actual characters
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

