'use strict'

function Interpreter (language) {

	this.start = function () {
		if (zyklus.language == null) zyklus.language = language
	}

	// parses an html string and searches for {{string}}
	// replaces {{string}} with the string in the selected language library and returns the string
	this.parse = function (string) {
		return string
	}
}