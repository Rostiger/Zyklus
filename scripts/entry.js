'use strict'

function Entry(startDate) {
  this.startDate = startDate
  this.endDate = undefined
  this.cycleDuration = 28
  this.mensDuration = 8
  this.day = 0
	this.phases = ['{{phase-menstruation}}','{{phase-folicular}}','{{phase-ovulation}}','{{phase-luteal}}']
	this.phase = ''
	this.fertile = ''

  this.update = function (id) {
  	this.day = Math.ceil(msToDays(timeDiff(new Date(), this.startDate)))
		if (id > 0) {
	   	const previous = entries[id-1].startDate
	   	const diff = msToDays(timeDiff(previous, this.startDate))
	  	this.cycleDuration = diff < maxDuration ? diff : 28
	  }

		this.mensDuration = this.endDate != undefined ? msToDays(timeDiff(this.endDate, this.startDate))+1 : undefined
		this.phase = this.day < this.mensDuration ? this.phases[0] : this.day < 12 ? this.phases[1] : this.day < 18 ? this.phases[2] : this.day < this.maxDuration ? this.phases[3] : '???'
		this.fertile = this.phase === this.phases[2] ? "{{yes}}" : this.day < maxDuration ? "{{no}}" : '???'
  }
	
	this.display = function(id, host) {

		const startDateID = `startDate_${id}`
		const endDateID = `endDate_${id}`
		const startDateLabel = prettyDate(new Date(this.startDate))
		const endDateLabel = this.endDate == undefined ? "{{entries-end-button}}" : prettyDate(new Date(this.endDate))
		const duration = this.endDate !== undefined ? `<h2 style="margin-bottom:8px;">{{duration}}: ${this.mensDuration} {{date-days}}</h2>` : ''
		let html = 
		`<figure class="entry">
			<header>
				<h1>{{entries-header}} ${entries.length - id}</h1>
				<span class="close" onClick="zyklus.io.delete(${id})">&#215;</span>
			</header>
			<section>
			${duration}
				<div>
					<span>
						<h2>{{entries-start}}</h2>
		  			${host.datePicker.dateButton(startDateID, startDateLabel, this.startDate)}
		  		</span>
		  		<span>
		  			<h2>{{entries-end}}</h2>
		   			${host.datePicker.dateButton(endDateID, endDateLabel, this.endDate, this.startDate)}
	   			</span>
	   		</div>
		   </section>
		</figure>`

		return html
	}

	this.isMultiple = function (int) {
		return int > 1 ? "{{date-days}}" : "{{date-day}}"
	}
}