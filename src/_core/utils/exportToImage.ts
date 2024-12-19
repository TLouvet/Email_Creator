import { toPng } from 'html-to-image';

export function exportToImage(node: HTMLElement, filename: string) {
  toPng(node, { cacheBust: true })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
}
