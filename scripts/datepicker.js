'use strict'

function DatePicker () {
	this.el = document.createElement('div')
	this.el.id = 'popup'
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	let yearSelect, monthSelect, daySelect, previousDay, setDateButton
	this.isOpen = false

	this.install = function (host) {
		host.appendChild(this.el)
		this.start()
		this.close()
	}

	this.start = function () {
		let html =
			`<div id="overlay" onClick="zyklus.interface.datePicker.close()"></div>
			<figure id="datepicker">
				<header>
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
		    	<section>
						<input id="setDateButton" type="button" value="Select Date"></input>
	        </section>
				</form>
			</figure>`
		this.el.innerHTML = html
	        	
		yearSelect = document.querySelector('#year')
		monthSelect = document.querySelector('#month')
		daySelect = document.querySelector('#day')
		setDateButton = document.querySelector('#setDateButton')

		yearSelect.onchange = function() { populateDays(monthSelect.value) }
		monthSelect.onchange = function() { populateDays(monthSelect.value) }
		daySelect.onchange = function() { previousDay = daySelect.value }
	  
	  populateDays(monthSelect.value)
	  populateYears()
	}

	this.open = function (id) {
		setDateButton.onclick = function() { zyklus.interface.datePicker.pickDate(id) }
		this.el.style.display = 'block'
		this.isOpen = true
	}

	this.close = function () {
		this.el.style.display = 'none'
		this.isOpen = false
	}

	this.pickDate = function (id) {
		const date = `${yearSelect.value}-${leadingZero(months.indexOf(monthSelect.value)+1)}-${leadingZero(daySelect.value)}`
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

	  for(let i = 1; i <= dayNum; i++) {
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

	this.dateButton = function (id, label, value, min = "") {
		const button =
			`<form>
				<input type="button" id="${id}" value="${label}" onClick="zyklus.interface.datePicker.open(${id})" />
			</form>`
		return button
	}

	this.getDay
}

window.onkeydown = function( event ) {
	if (event.keyCode == 27 && zyklus.interface.datePicker.isOpen) zyklus.interface.datePicker.close()
}