'use strict'

function Entry(startDate) {
  this.startDate = startDate
  this.endDate = undefined
  this.cycleDuration = undefined
  this.mensDuration = undefined
  this.day = 0
	this.phases = ['Menstruation','Folicular','Ovulation','Luteal']
	this.phase = ''
	this.fertile = ''

  this.update = function (id) {
  	this.day = Math.ceil(msToDays(timeDiff(new Date(), this.startDate)))
		if (id > 0) {
	   	const previous = entries[id-1].startDate 
	  	this.cycleDuration = previous != undefined ? msToDays(timeDiff(previous, this.startDate)) : undefined  		
	  } else this.cycleDuration = this.day

		this.mensDuration = this.endDate != undefined ? msToDays(timeDiff(this.endDate, this.startDate))+1 : undefined
		this.phase = this.day < 8 ? this.phases[0] : this.day < 12 ? this.phases[1] : this.day < 18 ? this.phases[2] : this.phases[3]
		this.fertile = this.phase === this.phases[2] ? "Yes" : "No"
  }
	
	this.display = function(id, host) {

		const startDateID = `startDate_${id}`
		const endDateID = `endDate_${id}`
		const startDateLabel = prettyDate(new Date(this.startDate))
		const endDateLabel = this.endDate == undefined ? "Set End Date" : prettyDate(new Date(this.endDate))
		let html = 
		`<figure class="entry">
			<header>
				<h1>Entry ${entries.length - id}</h1>
				<span class="close" onClick="zyklus.deleteEntry(${id})">&#215;</span>
			</header>
			<section>
					<span>
						<h2>Start</h2>
		  			${host.datePicker.dateButton(startDateID, startDateLabel, this.startDate)}
		  		</span>
		  		<span>
		  			<h2>End</h2>
		   			${host.datePicker.dateButton(endDateID, endDateLabel, this.endDate, this.startDate)}
		   		</span>
		   </section>
			<section>`
		if (id > 0) html += `<p>Cycle Duration: ${this.cycleDuration} ${this.isMultiple(this.cycleDuration)}</p>`
		else html += `<p>Cycle Duration: ${this.cycleDuration} ${this.isMultiple(this.cycleDuration)}</p>`
		if (this.mensDuration != undefined) html += `<p>Mestruation: ${this.mensDuration} ${this.isMultiple(this.mensDuration)}</p>`
		html +=
			`</section>
			
		</figure>`

		return html
	}

	this.isMultiple = function (int) {
		return int > 1 ? "days" : "day"
	}
}