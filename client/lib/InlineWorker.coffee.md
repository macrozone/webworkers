


	@InlineWorker = class

you can either overwrite this class and define the property workerCode
or you can create an anyonymous class by passing a function to the constructor

		constructor: (workerCode) ->
			@worker = generateWorker workerCode || @workerCode
			@worker.onmessage = (e) =>
				@onmessage e

		postMessage: (e) ->
			@worker.postMessage e

		



## Helpers

taken from [this thread](http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string)

and converted to coffescript

	# New thread worker code
	FakeWorkerCode = (code, worker) ->
		code.call this
		@worker = worker
		return

	FakeWorkerCode::postMessage = (e) ->
		@worker.onmessage data: e
		return

	# Main thread worker side
	FakeWorker = (code) ->
		@code = new FakeWorkerCode(code, this)
		return

	FakeWorker::postMessage = (e) ->
		@code.onmessage data: e
		return


	# Utilities for generating workers
	
	stringifyFunction = (func) ->
		
		# Stringify the code
		"(" + func + ").call(self);"

	generateWorker = (code) ->
		
		# URL.createObjectURL
		windowURL = window.URL or window.webkitURL
		blob = undefined
		worker = undefined
		stringified = stringifyFunction(code)
		try
			blob = new Blob([stringified],
				type: "application/javascript"
			)
		catch e # Backwards-compatibility

			window.BlobBuilder = window.BlobBuilder or window.WebKitBlobBuilder or window.MozBlobBuilder
			blob = new BlobBuilder()
			blob.append stringified
			blob = blob.getBlob()
		if "Worker" of window
			worker = new Worker(windowURL.createObjectURL(blob))
		else
			worker = new FakeWorker(code)
		worker