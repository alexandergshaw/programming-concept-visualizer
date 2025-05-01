self.onmessage = function (e) {
    const { code } = e.data;

    try {
        // Use Function constructor to safely execute code
        const result = new Function(code)();
        self.postMessage({ type: 'success', result });
    } catch (error) {
        self.postMessage({ type: 'error', error: error.message });
    }
};