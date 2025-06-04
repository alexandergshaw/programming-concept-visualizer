self.onmessage = function (e) {
    const { code } = e.data;

    // Capture console.log calls
    const logs = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        logs.push(args.map(arg => String(arg)).join(' '));
    };

    try {
        // Use Function constructor to safely execute code
        const result = new Function(code)();
        console.log = originalConsoleLog; // Restore console.log
        self.postMessage({ type: 'success', result, logs });
    } catch (error) {
        console.log = originalConsoleLog; // Restore console.log
        self.postMessage({ type: 'error', error: error.message, logs });
    }
};

const runCode = () => {
    if (!worker) return;

    const code = isEditing ? editableLines : lines.map(line => line.code).join('\n');

    // Send the code to the Web Worker
    worker.postMessage({ code });

    // Listen for messages from the Web Worker
    worker.onmessage = (e) => {
        const { type, result, error, logs = [] } = e.data; // Default logs to an empty array

        if (type === 'success') {
            const outputLogs = logs.join('\n');
            const finalOutput = result !== undefined ? `${outputLogs}\nResult: ${String(result)}` : outputLogs;
            setOutput(finalOutput || 'Code executed successfully.');
        } else if (type === 'error') {
            const outputLogs = logs.join('\n');
            setOutput(`${outputLogs}\nError: ${error}`);
        }
    };
};