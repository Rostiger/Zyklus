'use strict'

function PopUp () {
	this.el = document.createElement('div')
	this.el.id = 'popup'

	this.overlay = document.createElement('div')
	this.overlay.id = 'overlay'
	this.el.appendChild(this.overlay)

	this.dialog = document.createElement('figure')
	this.dialog.id = 'dialog'
	this.el.appendChild(this.dialog)

	this.header = document.createElement('header')
	this.header.id = 'header'
	this.dialog.appendChild(this.header)

	this.content = document.createElement('section')
	this.content.id = 'content'
	this.dialog.appendChild(this.content)

	this.buttons = document.createElement('section')
	this.buttons.id = 'buttons'
	this.dialog.appendChild(this.buttons)

	this.isOpen = false
	
	this.install = function (host) {
		host.appendChild(this.el)
		this.start()
		this.close()
	}

	this.start = function () {
		this.overlay.onclick = function() { zyklus.interface.popup.close() }
	}

	this.open = function (header, content, onConfirm) {
		// header
		this.header.innerHTML = header ? `<h1>${header}</h1><span class="close" onClick="zyklus.interface.datePicker.close()">&#215;</span>` : ''
		// content
		this.content.innerHTML = content ? content : ''
		// confirmation
		if (onConfirm != undefined) {
			this.buttons.innerHTML = zyklus.interpreter.parse(
			 `<button onclick="${onConfirm}; zyklus.interface.popup.close()">{{yes}}</button>
			 	<button onclick="zyklus.interface.popup.close()">{{no}}</button>
			 `)
			this.buttons.style.display = 'flex'
		} else this.buttons.style.display = 'none'

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