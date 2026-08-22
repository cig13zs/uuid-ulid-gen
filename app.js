const sample = "uuidv7 5";
const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statusEl = document.getElementById('status');
const previewEl = document.getElementById('preview');
const swatchesEl = document.getElementById('swatches');

function render(result) {
  outputEl.value = result.output == null ? '' : String(result.output);
  statusEl.textContent = result.summary || 'Done';
  if (previewEl) { previewEl.hidden = !result.preview; if (result.preview) previewEl.src = result.preview; }
  if (swatchesEl) {
    swatchesEl.textContent = '';
    (result.swatches || []).forEach(function (color) { const item = document.createElement('span'); item.style.background = color; item.title = color; swatchesEl.appendChild(item); });
  }
}

async function run() {
  statusEl.textContent = 'Working';
  try { render(await RepoTool.process(inputEl.value)); }
  catch (error) { outputEl.value = ''; statusEl.textContent = error && error.message ? error.message : 'Could not process that input'; }
}

document.getElementById('run').addEventListener('click', run);
document.getElementById('sample').addEventListener('click', function () { inputEl.value = sample; run(); });
document.getElementById('copy').addEventListener('click', async function () {
  if (!outputEl.value) return;
  await navigator.clipboard.writeText(outputEl.value);
  statusEl.textContent = 'Copied';
});
inputEl.addEventListener('keydown', function (event) { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') run(); });
