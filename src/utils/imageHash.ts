export async function hashImage(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Converts hash into a stable numeric score (0–99)
 * SAME hash → SAME number
 * DIFFERENT hash → DIFFERENT number
 */
export function hashToScore(hash: string): number {
  let total = 0;

  // Use multiple segments, not first char
  for (let i = 0; i < hash.length; i += 4) {
    total += parseInt(hash.slice(i, i + 4), 16);
  }

  return total % 100;
}
