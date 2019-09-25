'use strict'
function MenuItem (id) {
	this.id = id
	this.names = ['HOME','ENTRIES','STATS','SETTINGS']
	this.name = this.names[id]
	this.active = false
	this.hover = false

  this.el = document.createElement('div')
  this.el.id = 'item'
  
  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.update = function () {
	  this.el.style = !this.active ? 'cursor:pointer' : ''
	  this.icons = {
			HOME :  `<path d="M 250,135 A 90,90 0 0,1 250,375 A 90,90 0 0,1 250,135" fill="none" style="stroke-width: 100" />`,
			ENTRIES : `<path d="M 400 100 A 90,90 0 0,1 100,100 Z M 100,400 A 90,90 0 0,1 400,400 Z" stroke="none" />`,
			STATS : `<path d="M50,135 Q120,135 150,240 Q180,330 240,330 Q300,330 330,195 Q360,45 450,50 L450,50 L450,450 L450,450 L50,450 Z" stroke="none" />`,
			SETTINGS : 
					 `<path d="M 250,170 A 80 80 0 0 1 250 330 A 80 80 0 0 1 250 170" fill="none" style="stroke-width: 80" />
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
				${this.icons[this.name]}
			</svg>`

		this.el.innerHTML = html
  }

  this._hover = function (hover) {
  	this.hover = hover
  	this.update()
  }
}
