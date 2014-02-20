	
	Meteor.startup ->
	
		fiboWorkers = 
			for i in [1..8]
				do (i)->
					worker = new FiboWorker()
					worker.onmessage = (e) -> console.log "Worker #{i}:", e.data
					worker

		for i in [1..50]
			worker = fiboWorkers[i%fiboWorkers.length]
			worker.postMessage i
		#
				
		#worker.postMessage i for i in [1..50] 
				
	