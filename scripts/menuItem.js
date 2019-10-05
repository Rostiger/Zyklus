'use strict'
function MenuItem (id) {
	this.id = id
	this.active = false
	this.hover = false

  this.el = document.createElement('div')
  this.el.id = 'item'
  
  let name

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.update = function () {
	  this.el.style = !this.active ? 'cursor:pointer' : ''
	  this.icons = {
			0 : `<path d="M 250,135 A 90,90 0 0,1 250,375 A 90,90 0 0,1 250,135" fill="none" style="stroke-width: 100" />`,
			1 : `<path d="M 400 100 A 90,90 0 0,1 100,100 Z M 100,400 A 90,90 0 0,1 400,400 Z" stroke="none" />`,
			2 : `<path d="M410.016,410L89.984,410L89.984,157.975C127.321,157.975 153.99,185.978 169.992,241.983C185.993,289.988 209.996,313.991 241.999,313.991C274.002,313.991 298.005,277.987 314.006,205.98C330.008,125.971 362.011,87.301 410.016,89.968L410.016,410Z" stroke="none" />`,
			3 : `<path d="M 250,170 A 80 80 0 0 1 250 330 A 80 80 0 0 1 250 170" fill="none" style="stroke-width: 80" />
						<circle cx="250" cy="120" r="60" transform ="rotate(45 250 250)" stroke="none" />
						<circle cx="380" cy="250" r="60" transform ="rotate(45 250 250)" stroke="none" />
						<circle cx="250" cy="380" r="60" transform ="rotate(45 250 250)" stroke="none" />
						<circle cx="120" cy="250" r="60" transform ="rotate(45 250 250)" stroke="none" />`
		}
		const css = this.active ? 'selected' : ''
		const html =
			`<svg
				id="${this.name}"
				class="${css}"
				onMouseDown="zyklus.interface.changeSection(${this.id})"
				viewBox="0 0 500 500">
				${this.icons[this.id]}
			</svg>`

		this.el.innerHTML = html
  }
}
