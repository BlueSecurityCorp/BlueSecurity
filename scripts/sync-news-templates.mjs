import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = process.env.NEWS_TEMPLATE_DIR
  ? resolve(process.env.NEWS_TEMPLATE_DIR)
  : resolve(projectRoot, '..', 'News', 'templates');
const targetDirectory = resolve(projectRoot, 'src', 'content', 'news-templates');
const previewSourceDirectory = resolve(sourceDirectory, '..', 'previews');
const previewTargetDirectory = resolve(projectRoot, 'src', 'content', 'news-previews');
const previewAssetTargetDirectory = resolve(projectRoot, 'public', 'news-preview-assets');
const templateFiles = [
  '01-weekly-action-brief.md',
  '02-critical-security-alert.md',
  '03-vulnerability-radar.md',
  '04-executive-security-brief.md',
  '05-monthly-threat-deep-dive.md',
  '06-security-decision-brief.md',
  '07-visual-news-brief.md',
];
const previewFiles = templateFiles.map((file) => file.replace(/\.md$/, '.html'));
const previewAssetFiles = [
  'visual-browser-patch.png',
  'visual-identity-mfa.png',
  'visual-remote-access.png',
  'visual-supply-chain.png',
];

mkdirSync(targetDirectory, { recursive: true });
mkdirSync(previewTargetDirectory, { recursive: true });
mkdirSync(previewAssetTargetDirectory, { recursive: true });

const missingSourceFiles = templateFiles.filter((file) => !existsSync(resolve(sourceDirectory, file)));
if (missingSourceFiles.length === 0) {
  for (const file of templateFiles) {
    copyFileSync(resolve(sourceDirectory, file), resolve(targetDirectory, file));
  }
  console.log(`Synced ${templateFiles.length} news templates from ${sourceDirectory}`);
} else {
  const missingFallbackFiles = templateFiles.filter((file) => !existsSync(resolve(targetDirectory, file)));
  if (missingFallbackFiles.length > 0) {
    throw new Error(`News templates are unavailable: ${missingFallbackFiles.join(', ')}`);
  }
  console.warn(`News template source was not found at ${sourceDirectory}; using the bundled copies.`);
}

const missingPreviewFiles = previewFiles.filter((file) => !existsSync(resolve(previewSourceDirectory, file)));
const missingPreviewAssets = previewAssetFiles.filter((file) => !existsSync(resolve(previewSourceDirectory, 'assets', file)));
if (missingPreviewFiles.length === 0 && missingPreviewAssets.length === 0) {
  for (const file of previewFiles) {
    copyFileSync(resolve(previewSourceDirectory, file), resolve(previewTargetDirectory, file));
  }
  for (const file of previewAssetFiles) {
    copyFileSync(resolve(previewSourceDirectory, 'assets', file), resolve(previewAssetTargetDirectory, file));
  }
  console.log(`Synced ${previewFiles.length} published news sources from ${previewSourceDirectory}`);
} else {
  const missingFallbackPreviews = previewFiles.filter((file) => !existsSync(resolve(previewTargetDirectory, file)));
  if (missingFallbackPreviews.length > 0) {
    throw new Error(`Published news sources are unavailable: ${missingFallbackPreviews.join(', ')}`);
  }
  console.warn(`Published news source was not found at ${previewSourceDirectory}; using the bundled copies.`);
}
