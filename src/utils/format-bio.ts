
export function formatBio(bio: string, maxLength: number = 100): string {
  return bio.substring(0, maxLength)
}

