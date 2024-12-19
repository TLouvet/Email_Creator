export async function toMJML() {
  const node = document.getElementById('mail-contour');
  if (!node) {
    return;
  }

  // Clone le node pour éviter de modifier l'original
  const cloneNode = node.cloneNode(true) as HTMLElement;

  // Supprime les nœuds contenant l'attribut data-hover-node="true"
  const hoverNodes = cloneNode.querySelectorAll('[data-exportable="false"]');
  hoverNodes.forEach((hoverNode) => {
    hoverNode.parentNode?.removeChild(hoverNode);
  });

  // Supprime les divs avec la classe "relative" en conservant leurs enfants
  const relativeDivs = cloneNode.querySelectorAll('div.relative');
  relativeDivs.forEach((relativeDiv) => {
    const parent = relativeDiv.parentNode;
    while (relativeDiv.firstChild) {
      parent?.insertBefore(relativeDiv.firstChild, relativeDiv);
    }
    parent?.removeChild(relativeDiv);
  });

  // Fonction récursive pour transformer HTML en MJML
  function convertToMJML(element: Element): string {
    if (element.tagName === 'DIV') {
      const style = element.getAttribute('style') || '';

      if (style.includes('display: grid')) {
        const columns = style.match(/grid-template-columns:\s*([^;]+)/)?.[1].split(' ').length || 1;

        return `
            <mj-section ${convertStylesToAttributes(style)}>
              ${Array.from(element.children)
                .map((child) => `<mj-column width="${100 / columns}%">${convertToMJML(child)}</mj-column>`)
                .join('')}
            </mj-section>
          `;
      }

      return `
      <mj-section ${convertStylesToAttributes(style)}>
        ${Array.from(element.children)
          .map((child) => convertToMJML(child))
          .join('')}
      </mj-section>
    `;
    }

    if (element.tagName === 'P') {
      const style = element.getAttribute('style') || '';
      return `
          <mj-text ${convertStylesToAttributes(style)}>${element.innerHTML}</mj-text>
        `;
    }

    if (element.tagName === 'IMG') {
      const src = element.getAttribute('src') || '';
      const alt = element.getAttribute('alt') || '';
      const width = element.getAttribute('width') || 'auto';
      const style = element.getAttribute('style') || '';

      return `
          <mj-image
            src="${src}"
            alt="${alt}"
            width="${width}"
            ${convertStylesToAttributes(style)}
          />
        `;
    }

    // Si aucune correspondance, on garde le contenu brut
    return element.innerHTML;
  }

  // Convertit les styles en attributs MJML
  function convertStylesToAttributes(styleString: string): string {
    const styleMap: Record<string, string> = {};

    // Parcourt les styles et remplit le styleMap
    styleString.split(';').forEach((style) => {
      const [key, value] = style.split(':').map((s) => s.trim());
      if (key && value) {
        const cssKey = reactToCssKey(key); // Convertit la clé React en clé CSS
        styleMap[cssKey] = value.startsWith('rgb') ? rgbToHex(value) : value;
      }
    });

    // Génère les attributs MJML à partir du styleMap
    return Object.entries(styleMap)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  }

  // Convertit une clé React-style en clé CSS-style
  function reactToCssKey(key: string): string {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  // Fonction pour convertir rgb() ou rgba() en HEX
  function rgbToHex(rgb: string): string {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return rgb;

    const [r, g, b] = match.slice(1).map(Number);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }

  // Transforme le HTML
  const mjml = convertToMJML(cloneNode);

  const mjmlDocument = `
  <mjml>
    <mj-head>
      <mj-preview>Aperçu rapide</mj-preview>
      <mj-style inline="inline">
        /* Vos styles MJML ici */
      </mj-style>
    </mj-head>
    <mj-body>
      ${mjml}
    </mj-body>
  </mjml>
`;

  const res = await fetch('http://localhost:3000/to-mjml', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mjml: mjmlDocument }),
  });

  return mjmlDocument;
}
