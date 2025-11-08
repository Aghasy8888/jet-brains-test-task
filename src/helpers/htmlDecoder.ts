// Decodes HTML entities in a string
// Converts entities like &quot;, &amp;, &#039;, etc. to their actual characters
const textarea = document.createElement('textarea');

function decodeHtmlEntities(text: string): string {
  textarea.innerHTML = text;
  return textarea.value;
}

export { decodeHtmlEntities };

