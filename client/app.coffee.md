	
	Meteor.startup ->
	
		n = 40
		for i in [1..8] 
			do ->
				worker = createFiboWorker()
				worker.onmessage = (e) -> console.log "fibo #{n} is #{e.data}"
				worker.postMessage n
	