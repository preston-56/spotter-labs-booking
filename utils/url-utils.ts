/**
 * URL utilities for handling special characters in URLs
 */

/**
 * Converts a display name to a URL-friendly slug
 * - Replaces spaces with hyphens
 * - Replaces & with 'and'
 * - Removes other special characters
 * 
 * @param name The display name to convert
 * @returns A URL-safe slug
 */
export const toUrlFriendly = (name?: string): string => {
    // Handle undefined or null values
    if (!name) return '';
    
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/&/g, 'and')     // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
      .replace(/--+/g, '-')     // Replace multiple hyphens with single hyphen
  }
  
  /**
   * Converts a URL-friendly slug back to a display name
   * - Replaces hyphens with spaces
   * - Replaces 'and' with &
   * - Capitalizes words appropriately
   * 
   * @param slug The URL slug to convert
   * @returns A human-readable display name
   */
  export const fromUrlFriendly = (slug?: string): string => {
    // Handle undefined or null values
    if (!slug) return '';
    
    // First handle special case replacements
    let displayName = slug
      .replace(/-/g, ' ')     // Replace hyphens with spaces
      .replace(/and/g, '&')   // Replace 'and' with &
    
    // Capitalize first letter of each word
    return displayName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }