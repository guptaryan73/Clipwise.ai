document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const fileInput = document.getElementById('fileInput');
    const linkInput = document.getElementById('linkInput');
    const generateBtn = document.getElementById('generateBtn');
    const scriptOutput = document.getElementById('scriptOutput');
    const scriptContent = document.getElementById('scriptContent');
    const savedScripts = document.getElementById('savedScripts');

    // Load saved scripts on page load
    loadSavedScripts();

    // Handle file input
    fileInput.addEventListener('change', async function(e) {
        const files = Array.from(e.target.files);
        let extractedText = '';

        for (const file of files) {
            if (file.type.startsWith('text/')) {
                const text = await file.text();
                extractedText += text + '\n';
            }
        }

        if (extractedText) {
            promptInput.value += (promptInput.value ? '\n\n' : '') + extractedText;
        }
    });

    // Handle link input
    linkInput.addEventListener('change', function() {
        const link = linkInput.value.trim();
        if (link) {
            promptInput.value += (promptInput.value ? '\n\n' : '') + `Reference link: ${link}`;
            linkInput.value = '';
        }
    });

    // Handle generate button click
    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        try {
            const response = await fetch('/generate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();

            if (data.success) {
                scriptContent.textContent = data.script;
                scriptOutput.classList.remove('hidden');
                loadSavedScripts(); // Reload saved scripts
            } else {
                throw new Error(data.error || 'Failed to generate script');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Script';
        }
    });

    // Function to load saved scripts
    async function loadSavedScripts() {
        try {
            const response = await fetch('/saved-scripts/');
            const data = await response.json();

            if (data.success) {
                savedScripts.innerHTML = data.scripts.map(script => `
                    <div class="bg-gray-700 rounded-lg p-4">
                        <div class="text-sm text-gray-400 mb-2">${script.created_at}</div>
                        <div class="font-medium mb-2">${script.prompt}</div>
                        <div class="text-gray-300 whitespace-pre-wrap">${script.generated_script}</div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Failed to load saved scripts:', error);
        }
    }
}); 