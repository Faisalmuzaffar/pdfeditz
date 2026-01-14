/**
 * Tools configuration file
 * Focused list of PDF editing and annotation tools.
 */

import { Tool, ToolCategory } from '@/types/tool';

/**
 * Default file size limits - No restrictions
 */
const DEFAULT_MAX_FILE_SIZE = Infinity; // No limit

/**
 * All tools configuration
 * Each tool must have:
 * - Unique id and slug
 * - Exactly one category from the defined categories
 * - At least 2 related tools
 */
export const tools: Tool[] = [
  {
    id: 'edit-pdf',
    slug: 'edit-pdf',
    icon: 'pocket-knife',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['annotate', 'highlight', 'redact', 'comment', 'shapes', 'images', 'search'],
    relatedTools: ['sign-pdf', 'add-watermark', 'form-filler'],
  },
  {
    id: 'sign-pdf',
    slug: 'sign-pdf',
    icon: 'pen-tool',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['draw-signature', 'type-signature', 'upload-signature', 'multiple-signatures'],
    relatedTools: ['edit-pdf', 'form-filler', 'add-stamps'],
  },
  {
    id: 'crop-pdf',
    slug: 'crop-pdf',
    icon: 'crop',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['trim-margins', 'custom-crop', 'all-pages'],
    relatedTools: ['edit-pdf', 'remove-blank-pages', 'page-numbers'],
  },
  {
    id: 'bookmark',
    slug: 'bookmark',
    icon: 'bookmark',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['add-bookmarks', 'edit-bookmarks', 'import-bookmarks', 'delete-bookmarks', 'extract-bookmarks'],
    relatedTools: ['table-of-contents', 'edit-pdf', 'page-numbers'],
  },
  {
    id: 'table-of-contents',
    slug: 'table-of-contents',
    icon: 'list',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['generate-toc', 'from-bookmarks', 'custom-style'],
    relatedTools: ['bookmark', 'page-numbers', 'header-footer'],
  },
  {
    id: 'page-numbers',
    slug: 'page-numbers',
    icon: 'list-ordered',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['custom-position', 'custom-format', 'start-number', 'skip-pages'],
    relatedTools: ['header-footer', 'add-watermark', 'table-of-contents'],
  },
  {
    id: 'add-watermark',
    slug: 'add-watermark',
    icon: 'droplets',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['text-watermark', 'image-watermark', 'position', 'opacity', 'rotation'],
    relatedTools: ['header-footer', 'page-numbers', 'add-stamps'],
  },
  {
    id: 'header-footer',
    slug: 'header-footer',
    icon: 'pilcrow',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['custom-text', 'page-numbers', 'date', 'position'],
    relatedTools: ['page-numbers', 'add-watermark', 'table-of-contents'],
  },
  {
    id: 'invert-colors',
    slug: 'invert-colors',
    icon: 'contrast',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['dark-mode', 'invert-all', 'preserve-images'],
    relatedTools: ['background-color', 'text-color', 'edit-pdf'],
  },
  {
    id: 'background-color',
    slug: 'background-color',
    icon: 'palette',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['custom-color', 'page-range', 'opacity'],
    relatedTools: ['invert-colors', 'text-color', 'add-watermark'],
  },
  {
    id: 'text-color',
    slug: 'text-color',
    icon: 'type',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['change-text-color', 'all-text', 'selected-text'],
    relatedTools: ['background-color', 'invert-colors', 'edit-pdf'],
  },
  {
    id: 'add-stamps',
    slug: 'add-stamps',
    icon: 'stamp',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['preset-stamps', 'custom-stamps', 'position', 'opacity'],
    relatedTools: ['sign-pdf', 'add-watermark', 'edit-pdf'],
  },
  {
    id: 'remove-annotations',
    slug: 'remove-annotations',
    icon: 'eraser',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['remove-comments', 'remove-highlights', 'remove-markup'],
    relatedTools: ['edit-pdf', 'add-stamps', 'form-filler'],
  },
  {
    id: 'form-filler',
    slug: 'form-filler',
    icon: 'form-input',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['fill-fields', 'save-form', 'export'],
    relatedTools: ['form-creator', 'sign-pdf', 'edit-pdf'],
  },
  {
    id: 'form-creator',
    slug: 'form-creator',
    icon: 'layout-grid',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['text-fields', 'checkboxes', 'dropdowns', 'drag-drop'],
    relatedTools: ['form-filler', 'edit-pdf', 'sign-pdf'],
  },
  {
    id: 'remove-blank-pages',
    slug: 'remove-blank-pages',
    icon: 'file-minus-2',
    category: 'edit-annotate',
    acceptedFormats: ['.pdf'],
    outputFormat: 'pdf',
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFiles: 1,
    features: ['auto-detect', 'threshold-setting', 'preview'],
    relatedTools: ['crop-pdf', 'edit-pdf', 'page-numbers'],
  },
];

/**
 * Get all tools
 */
export function getAllTools(): Tool[] {
  return tools;
}

/**
 * Get tool by ID
 */
export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

/**
 * Get all tool IDs
 */
export function getAllToolIds(): string[] {
  return tools.map((tool) => tool.id);
}

/**
 * Check if a tool ID exists
 */
export function toolExists(id: string): boolean {
  return tools.some((tool) => tool.id === id);
}

/**
 * Popular tool IDs - curated list of commonly used tools
 * These tools remain in their original categories
 */
export const POPULAR_TOOL_IDS = [
  'edit-pdf',
  'sign-pdf',
  'crop-pdf',
  'page-numbers',
  'add-watermark',
  'form-filler',
];

/**
 * Get popular tools
 * Returns a curated list of commonly used tools
 */
export function getPopularTools(): Tool[] {
  return POPULAR_TOOL_IDS
    .map(id => getToolById(id))
    .filter((tool): tool is Tool => tool !== undefined);
}
