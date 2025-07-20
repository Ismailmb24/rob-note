// lib/utils/copy-to-clipboard.ts

export async function copyHtmlToClipboard(html: string) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    console.warn("Clipboard API not supported");
    return;
  }

  const blob = new Blob([html], { type: "text/html" });
  const clipboardItem = new ClipboardItem({ "text/html": blob });

  try {
    await navigator.clipboard.write([clipboardItem]);
    console.log("copied");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
