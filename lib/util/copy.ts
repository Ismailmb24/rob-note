// lib/utils/copy-to-clipboard.ts

export async function copyHtmlToClipboard(html: string, text: string) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    console.warn("Clipboard API not supported");
    return;
  }

  const htmlBlob = new Blob([html], { type: "text/html" });
  const plainTextBlob = new Blob([text], { type: "text/plain" });
  const clipboardItem = new ClipboardItem({ "text/html": htmlBlob, "text/plain": plainTextBlob });

  try {
    await navigator.clipboard.write([clipboardItem]);
    console.log("copied");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
