'use strict'

function Entry(startDate) {
  this.startDate = startDate
  this.endDate = undefined
  this.cycleDuration = 28
  this.mensDuration = 5
  this.day = 0
	this.phases = ['{{phase-menstruation}}','{{phase-folicular}}','{{phase-ovulation}}','{{phase-luteal}}']
	this.phase = ''
	this.fertile = ''

  this.update = function (id) {
  	this.day = Math.ceil(msToDays(timeDiff(new Date(), this.startDate)))
		if (id > 0) {
	   	const previous = entries[id-1].startDate
	   	this.cycleDuration = msToDays(timeDiff(previous, this.startDate))
	  } else this.cycleDuration = this.day

		this.mensDuration = this.endDate != undefined ? msToDays(timeDiff(this.endDate, this.startDate))+1 : undefined
		this.phase = this.day < this.mensDuration ? this.phases[0] : this.day < 12 ? this.phases[1] : this.day < 18 ? this.phases[2] : this.day < this.maxDuration ? this.phases[3] : '???'
		this.fertile = this.phase === this.phases[2] ? "{{yes}}" : this.day < maxDuration ? "{{no}}" : '???'
  }
	
	this.display = function(id, host) {

		const startDateID = `startDate_${id}`
		const endDateID = `endDate_${id}`
		const startDateLabel = prettyDate(new Date(this.startDate))
		const endDateLabel = this.endDate == undefined ? "{{entries-end-button}}" : prettyDate(new Date(this.endDate))
		const mensDuration = this.endDate !== undefined ? `<section class="stats"><h3>{{entries-menstruation-duration}}</h3><h2>${this.mensDuration} {{date-days}}</h2></section>` : ''
		let html = 
		`<figure class="entry">
			<header>
				<h1>{{entries-header}} ${entries.length - id}</h1>
				<span class="close" onClick="zyklus.io.delete(${id})">&#215;</span>
			</header>
			<section>
				<span>
					<h2 class="label">{{entries-start}}</h2>
	  			${host.datePicker.dateButton(startDateID, startDateLabel, this.startDate)}
	  		</span>
	  		<span>
	  			<h2 class="label">{{entries-end}}</h2>
	   			${host.datePicker.dateButton(endDateID, endDateLabel, this.endDate, this.startDate)}
   			</span>
   		</section>
			<section class="stats"><h3>{{entries-cycle-duration}}</h3><h2> ${this.cycleDuration} {{date-days}}</h2></section>
			${mensDuration}
		</figure>`

		return html
	}

	this.isMultiple = function (int) {
		return int > 1 ? "{{date-days}}" : "{{date-day}}"
	}
}