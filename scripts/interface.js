'use strict'

function Interface(zyklus) {
  this.el = document.createElement('div')
  this.el.id = 'zyklus'
  this.el.appendChild(this.menu_el = document.createElement('div'))
  this.menu_el.id = 'menu'
  this.el.appendChild(this.content_el = document.createElement('div'))
  this.content_el.id = 'content'
  
  this.sections = ['home','entries','stats','settings']
  this.items = [
  	new MenuItem(0),
  	new MenuItem(1),
  	new MenuItem(2),
  	new MenuItem(3)
  ]
  this.activeSection = 0

  this.popup = new PopUp()
  this.datePicker = new DatePicker()

  this.install = function (host) {
    host.appendChild(this.el)
    for (const item in this.items) {
    	this.items[item].install(this.menu_el)
    }
    this.popup.install(this.el)
    this.datePicker.install(this.popup.el)
  }

  this.update = function () {
  	this.section = window.location.hash.slice(1)
		this.activeSection = this.sections.indexOf(this.section)
		for (const item in this.items) {
			this.items[item].active = item == this.activeSection ? true : false
			this.items[item].update()
		}
  	this.createContent(this.activeSection)
  }

	this.changeSection = function (id) {
		this.activeSection = id
		window.location.hash = this.sections[id]
		this.update()
	}
  
  this.createContent = function(section) {
		let html = ''
		let empty = false
		if (entries.length < 1) empty = true

		switch (section) {
			case 0:
				html = empty ? this.createEmpty() : this.createHome()
			break
			case 1:
				html = empty ? this.createEmpty() : this.createEntries()
			break
			case 2:
				html = empty ? this.createEmpty() : this.createStats()
			break
			case 3:
				html = this.createSettings()
			break
		}
		this.content_el.innerHTML = html

		if (section == 3) {
			const themeSelect = document.querySelector('#theme')

			themeSelect.onchange = function () { 
				zyklus.themeName = themeSelect.value
				zyklus.io.save()
				zyklus.theme.load(themes[themeSelect.value])
				zyklus.theme.start()
			}
		}
  }

  this.createEmpty = function () {
  	const html = 
		 `<figure>
		 		<header><h1 style="text-align: center;">No dates added.</h2></header>
				<section class="button">${this.datePicker.dateButton("newEntry", "Add Date")}</section>
			</figure>`
  	return html
  }

  this.createHome = function () {
		let html = ''
		const entry = entries[0]
		const cycleDuration = 28
		const legendSize = 16
  	html += 
  		`<figure class="info">
  			<header><h1>Current Cycle</h1></header>
  			<section>
	  			<div class="day"><h1>${entry.day}</h1></div>
	  			<div class="stats">
	  				<h2>Cycle: <span style="color: var(--f_med);">${prettyDate(new Date(entry.startDate))}</span></h2>
	  				<h2>Phase: <span style="color: var(--f_med);">${entry.phase}</span></h2>
	  				<h2>Fertile: <span style="color: var(--f_med);">${entry.fertile}</span></h2>
	  			</div>
  			</section>
  		</figure>
  		<figure class="overview">
	  		<section class="bar">${this.createCycle()}</section>
	  		<section class="legend">
	  			<ul class="items">
		  			<li class="item">
							<svg width="${legendSize}px" height="${legendSize}px">
								<rect x="0" y="0" width="100%" height="100%" fill="${zyklus.theme.active.f_high}" stroke="transparent" />
							</svg>
							<h3>Today</h3>
						</li>

		  			<li class="item">
							<svg width="${legendSize}px" height="${legendSize}px">
								<rect x="0" y="0" width="100%" height="100%" fill="${zyklus.theme.active.f_med}" stroke="transparent" />
							</svg>
							<h3>Menstruation</h3>
						</li>

		  			<li class="item">
							<svg width="${legendSize}px" height="${legendSize}px">
								<rect x="0" y="0" width="100%" height="100%" fill="${zyklus.theme.active.f_low}" stroke="transparent" />
							</svg>
							<h3>Ovulation</h3>
						</li>
					</ul>
  			</section>
  		</figure>
  		<figure>
  			<section class="button">`
		  	if (entry.endDate === undefined) {
					const endDateID = `endDate_0`
					const endDateLabel = entry.endDate == undefined ? "Menstruation End" : prettyDate(new Date(entry.endDate))
			  	html += `${this.datePicker.dateButton(endDateID, endDateLabel, entry.endDate, entry.startDate)}`
			  } else html += `${this.datePicker.dateButton("newEntry", "Menstruation Start")}`
		  	html += 
  			`</section>
  	</figure>
  	<figure>
  		<header><h1>Next Cycle Prognosis</h1></header>
  		<section>
  			<h1>${prettyDate(stats.nextCycle, true)}</h1>
  		</section>
  	</figure>`
  	
  	return html
  }

	this.createCycle = function () {
		const entry = entries[0]
		const amt = 28
		const gapSize = 1
		const width = ((100 - (gapSize * (amt-1)))/amt).toFixed(2)
		const phases = [amt * 0.1, amt * 0.35, amt * 0.6]
		let rects = ""
		let color = ""
		const menst = entry.mensDuration === undefined ? entry.day : entry.mensDuration
		for (let i=0; i<amt; i++) {
			const x = (i * width + i * gapSize).toFixed(1)
			if (i === entry.day-1) color = zyklus.theme.active.f_high
			else if (i < menst) color = zyklus.theme.active.f_med
			else if (i > phases[1] && i < phases[2]) color = zyklus.theme.active.f_low
			else color = zyklus.theme.active.background
			rects += `<rect x="${x}%" y="0" width="${width}%" height="100%" fill="${color}" stroke="transparent" />`
		}
		const svg = `
			<svg width="100%" height="100%">
				${rects}
			</svg>
		`
		return svg
	}

  this.createEntries = function () {
		let html = ''
	  for (const id in entries) {
	  	entries[id].update(id)
	  	html += entries[id].display(id,this)
	  }
	  return html
  }

	this.createStats = function () {
		const html =
	  	`<figure>
	  		<header><h1>Stats</h1></header>
	  		<section>
	  			<p>Average Cycle Duration: ${stats.avrgCycleDuration} days </p>
	  			<p>${stats.cyclesSinceLastEntry} cycles passed since last entry.</p>
	  		</section>
	  	</figure>`
	  return html
	}

	this.createSettings = function () {
  	let html = ``
  	html += 
		 `<figure>
		 		<header><h1>Settings</h2></header>
		 		<form>
					<section>
						<label for="language"><h2>Language</h2></label>
						<select id="language" name="language">
							<option>English</option>
						</select>
					</section>
					<section>
						<label for="theme"><h2>Theme</h2></label>
						<select id="theme" name="theme">`
							for (const theme in themes) html+= theme == zyklus.themeName ? `<option selected>${theme}</option>` : `<option>${theme}</option>`
						html+=
					`</select>
					</section>
					<section>
						<input type="button" value="Import Data" onClick=""></input>
					</section>
					<section>
						<input type="button" value="Export Data" onClick=""></input>
					</section>
					<section>
						<input type="button" value="Delete Data" onClick="zyklus.io.reset()"></input>
					</section>
				</form>
			</figure>`
  	return html	
  }
}