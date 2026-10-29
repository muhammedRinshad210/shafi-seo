/**
 * Visual Editing & Presentation Tool Helper
 * Enables Sanity Click-to-Edit overlays, Presentation comlink channel,
 * and element-level data-sanity attributes for direct CMS editing.
 */

export interface CreateDataAttributeProps {
  id: string;
  type: string;
  path?: string;
  baseUrl?: string;
}

export interface DataAttributeBuilder {
  toString: () => string;
  scope: (nestedPath: string) => string;
  combine: (nestedPath: string) => string;
}

const DEFAULT_STUDIO_URL = 'https://shafi-seo.sanity.studio';

/**
 * Creates standard `data-sanity` attribute string compatible with
 * Sanity Presentation Tool and Visual Editing overlays.
 * Format: id=<id>;type=<type>;path=<path>;base=<baseUrl>
 */
export function createDataAttribute(props: CreateDataAttributeProps): DataAttributeBuilder {
  const { id, type, path, baseUrl = DEFAULT_STUDIO_URL } = props;

  const build = (subPath?: string): string => {
    const fullPath = subPath ? (path ? `${path}.${subPath}` : subPath) : path || '';
    const parts = [
      `id=${encodeURIComponent(id)}`,
      `type=${encodeURIComponent(type)}`,
      `base=${encodeURIComponent(baseUrl)}`,
    ];
    if (fullPath) {
      parts.push(`path=${encodeURIComponent(fullPath)}`);
    }
    return parts.join(';');
  };

  return {
    toString: () => build(),
    scope: (nested: string) => build(nested),
    combine: (nested: string) => build(nested),
  };
}

/**
 * Detects whether the current page is running inside Sanity Studio Presentation
 * iframe or in preview mode.
 */
export function isVisualEditingActive(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const isInsideIframe = window.self !== window.top;
    const urlParams = new URLSearchParams(window.location.search);
    const hasPreviewParam =
      urlParams.get('preview') === 'true' ||
      urlParams.get('previewMode') === 'true' ||
      urlParams.has('sanity-preview');

    return isInsideIframe || hasPreviewParam;
  } catch {
    return false;
  }
}

/**
 * Sends a focus request to Sanity Presentation Tool to open the target document/field in Studio sidebar.
 */
export function sendStudioFocus(node: { id: string; type: string; path?: string }): void {
  if (typeof window === 'undefined' || window.self === window.top) return;

  const payload = {
    type: 'visual-editing/focus',
    data: {
      id: node.id,
      type: node.type,
      path: node.path || '',
      baseUrl: DEFAULT_STUDIO_URL,
    },
  };

  try {
    window.parent.postMessage(payload, '*');
    // Also send fallback legacy overlay focus event
    window.parent.postMessage(
      {
        type: 'overlay/focus',
        data: payload.data,
      },
      '*'
    );
  } catch (err) {
    console.debug('[VisualEditing] postMessage error:', err);
  }
}
