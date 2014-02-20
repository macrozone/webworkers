#createFiboWorker

creates a Fibonacci calcluation webWorker



	class @FiboWorker extends InlineWorker

		workerCode: ->

This wrapper here contains the worker workerCode
Be sure to not use any code from outside of this context here because webworkers need to have their own context

			fibo = (n) -> 
				if n < 2 then n else fibo(n-1) + fibo(n-2)
			@onmessage = (e) -> 
				@postMessage "start fibo #{e.data}"
				@postMessage "fibo #{e.data} is "+fibo parseInt e.data, 10

	



		