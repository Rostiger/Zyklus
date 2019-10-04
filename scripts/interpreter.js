'use strict'

function Interpreter () {
	const defaultLanguage = 'ENGLISH'

	this.start = function () {
		if (zyklus.language === undefined || zyklus.language === null) zyklus.language = defaultLanguage
	}

	// parses an html string and searches for {{string}}
	// replaces {{string}} with the string in the selected language library and returns the string
	this.parse = function (string) {
		let parsing = true
		let result = string
		while (parsing) {
			const start = result.indexOf('{{')
			if (start === -1) {
				parsing = false
				break
			}
			const end = result.indexOf('}}')
			this.string = result.slice(start+2,end)
			const localisedString = languages[zyklus.language][this.string]
			result = localisedString == undefined ? `${result.slice(0, start)}${this.string}${result.slice(end+2)}` : `${result.slice(0, start)}${localisedString}${result.slice(end+2)}`
		}
		return result
	}
}