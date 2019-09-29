'use strict'

function Interpreter (language) {

	this.start = function () {
		if (zyklus.language == null) zyklus.language = language
		console.info(languages[language])
	}

	// parses an html string and searches for {{string}}
	// replaces {{string}} with the string in the selected language library and returns the string
	this.parse = function (string) {
		const start = string.indexOf('{{')
		const end = string.indexOf('}}')
		this.string = string.slice(start+2,end)
		const result = language[zyklus.langugage]
		// console.info(result)
		return string
	}
}