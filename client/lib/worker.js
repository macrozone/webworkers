//http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string


// New thread worker code
var FakeWorkerCode = function(code, worker) {
    code.call(this);
    this.worker = worker;
}
FakeWorkerCode.prototype.postMessage = function(e) {
    this.worker.onmessage({data: e});
}
// Main thread worker side
FakeWorker = function(code) {
    this.code = new FakeWorkerCode(code, this);
}
FakeWorker.prototype.postMessage = function(e) {
    this.code.onmessage({data: e});
}

// Utilities for generating workers
this.Workers = {
    stringifyFunction: function(func) {
        // Stringify the code
        return '(' + func + ').call(self);';
    },
    generateWorker: function(code) {
        // URL.createObjectURL
        windowURL = window.URL || window.webkitURL;   
        var blob, worker;
        var stringified = Workers.stringifyFunction(code);
        try {
            blob = new Blob([stringified], {type: 'application/javascript'});
        } catch (e) { // Backwards-compatibility
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            blob = new BlobBuilder();
            blob.append(stringified);
            blob = blob.getBlob();
        }

        if ("Worker" in window) {
            worker = new Worker(windowURL.createObjectURL(blob));
        } else {
            worker = new FakeWorker(code);
        }
        return worker;
    }
};
