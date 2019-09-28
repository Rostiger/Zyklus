'use strict'

function DatePicker () {
	this.el = document.createElement('figure')
	this.el.id = 'datepicker'
	this.el.style.display = 'none'
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	let yearSelect, monthSelect, daySelect, previousDay, setDateButton, error

	this.install = function (host) {
		host.appendChild(this.el)
		this.start()
	}

	this.start = function (host) {
		let html =
			`<header>
					<h1>Select a date</h1>
					<span class="close" onClick="zyklus.interface.datePicker.close()">&#215;</span>
				</header>
				<form>
					<section class="datepicker">
						<span>
			        <label for="day"><h2>Day</h2></label>
			        <select id="day" name="day"></select>
			      </span>
			      <span>
			        <label for="month"><h2>Month</h2></label>
			        <select id="month" name="month">`
			        for (const month in months) {
			        	month === 0 ? html+= `<option selected>${months[month]}</option>` : html += `<option>${months[month]}</option>`
			        }
			        html +=
			        `</select>
		      	</span>
		      	<span>
		        	<label for="year"><h2>Year</h2></label>
		        	<select id="year" name="year"></select>
		       	<span>
		    	</section>
		      <section id="error"></section>
		    	<section>
						<input id="setDateButton" type="button" value="Select Date"></input>
	        </section>
				</form>`
		this.el.innerHTML = html
	        	
		yearSelect = document.querySelector('#year')
		monthSelect = document.querySelector('#month')
		daySelect = document.querySelector('#day')
		setDateButton = document.querySelector('#setDateButton')
		error = document.querySelector('#error')

		yearSelect.onchange = function() { populateDays(monthSelect.value) }
		monthSelect.onchange = function() { populateDays(monthSelect.value) }
		daySelect.onchange = function() { previousDay = daySelect.value }
	  
	  populateDays(monthSelect.value)
	  populateYears()
	}

	this.open = function (id, value, min, max) {
		zyklus.interface.popup.open()
		this.el.style.display = 'block'
		error.style.display = 'none'
		const date = value != 0 ? new Date(value) : min != 0 ? new Date(min) : new Date()
		this.setDate(date)
		setDateButton.onclick = function() { zyklus.interface.datePicker.pickDate(id, min, max) }
	}

	this.close = function () {
		zyklus.interface.popup.close()
		this.el.style.display = 'none'
	}

	this.pickDate = function (id, min, max) {
		const date = `${yearSelect.value}-${leadingZero(months.indexOf(monthSelect.value)+1)}-${leadingZero(daySelect.value)}`
		const selected = new Date(date)
		if (min != 0) {
			this.min = new Date(min)
			if (this.min - selected >= 0) {
				this.displayError(0, min)
				return
			}
		} else if (max != 0) {
			this.max = new Date(max)
			if (this.max - timeStamp <= 0) {
				this.displayError(1, max)
				return
			}
		}
		id.value = date
		zyklus.getFormData(id)
		this.close()
	}

	const populateDays = function (month) {
	  while(daySelect.firstChild) daySelect.removeChild(daySelect.firstChild)

	  let dayNum

	  if (
	  	month === months[0] || 
	  	month === months[2] || 
	  	month === months[4] || 
	  	month === months[6] || 
	  	month === months[7] || 
	  	month === months[9] || 
	  	month === months[11]) dayNum = 31
	  else if (
	  	month === months[3] || 
	  	month === months[5] || 
	  	month === months[8] || 
	  	month === months[10]) dayNum = 30
	  else {
	    const year = yearSelect.value
	    const isLeap = new Date(year, 1, 29).getMonth() == 1
	    isLeap ? dayNum = 29 : dayNum = 28
	  }

	  for (let i = 1; i <= dayNum; i++) {
	    const option = document.createElement('option')
	    option.textContent = i
	    daySelect.appendChild(option)
	  }

	  if (previousDay) {
	  	daySelect.value = previousDay

	    if(daySelect.value === "") daySelect.value = previousDay - 1
	    if(daySelect.value === "") daySelect.value = previousDay - 2
	    if(daySelect.value === "") daySelect.value = previousDay - 3
	  }
	}

	const populateYears = function () {
	  const date = new Date()
	  const year = date.getFullYear()

	  for(var i = 0; i <= 10; i++) {
	    const option = document.createElement('option')
	    option.textContent = year-i
	    yearSelect.appendChild(option)
	  }
	}

	this.dateButton = function (id, label, value, min, max) {
		let args = `${id}`
		args += value != undefined ? `, '${value}'` : ", 0"
		args += min != undefined ? `, '${min}'` : ", 0"
		args += max != undefined ? `, '${max}'` : ", 0"
		const button =
			`<form>
				<input type="button" id="${id}" value="${label}" onClick="zyklus.interface.datePicker.open(${args})" />
			</form>`
		return button
	}

	this.setDate = function (date) {
		daySelect.value = date.getDate()
		monthSelect.value = months[date.getMonth()]
		yearSelect.value = date.getFullYear()
	}

	this.displayError = function (errorCode, date) {
		error.style.display = 'block'
		const preposition = errorCode < 1 ? 'after' : 'before'
		const html = `<span class="error">Please pick a date ${preposition} ${prettyDate(date, true)}</span>`
		error.innerHTML = html
	}
}