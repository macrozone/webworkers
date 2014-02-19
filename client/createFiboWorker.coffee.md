
	@createFiboWorker = -> Workers.generateWorker ->
		fibo = (n) -> 
			if n < 2 then n else fibo(n-1) + fibo(n-2)
		@onmessage = (e) -> 
			@postMessage fibo parseInt e.data, 10