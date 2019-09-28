'use strict'

function PopUp () {
	this.el = document.createElement('div')
	this.el.id = 'popup'
	this.isOpen = false
	
	this.install = function (host) {
		host.appendChild(this.el)
		this.start()
		this.close()
	}

	this.start = function () {
		const html = `<div id="overlay" onClick="zyklus.interface.popup.close()"></div>`
		this.el.innerHTML = html
	}

	this.open = function () {
		this.el.style.display = 'block'
		this.isOpen = true
	}

	this.close = function () {
		this.el.style.display = 'none'
		this.isOpen = false
	}
}

window.onkeydown = function (event) {
	if (event.keyCode == 27 && zyklus.interface.popup.isOpen) zyklus.interface.popup.close()
}