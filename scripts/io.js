'use strict'

function IO () {

  this.load = function() {
    const count = localStorage.getItem('entriesCount')
    console.log('Database', 'Loading Entries..')    
    for (let i=0; i<count; i++) {
      const item = JSON.parse(localStorage.getItem(i))
      const startDate = item.startDate
      const entry = new Entry(startDate)
      if (item.endDate !== undefined) entry.endDate = item.endDate 
      entries.push(entry)
    }
    console.log('Database', 'Entries Loaded!')
    zyklus.themeName = localStorage.getItem('themeName')
    zyklus.language = localStorage.getItem('language')
  }

  this.save = function() {
    localStorage.clear()
    let count = 0
    for (const id in entries) {
      const entry = {}
      entry.startDate = entries[id].startDate
      entry.endDate = entries[id].endDate
      localStorage.setItem(id, JSON.stringify(entry));
      count++
    }
    localStorage.setItem('entriesCount',count)
    localStorage.setItem('themeName',zyklus.themeName)
    localStorage.setItem('language',zyklus.language)
  }

  this.delete = function (id) {
    entries.splice(id,1)
    zyklus.update()
    this.save()
  }

  this.reset = function () {
    entries = []
    zyklus.update()
    this.save()
  }

  this.import = function (file) {
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      const fileContent = JSON.parse(e.target.result)
      const count = fileContent['entriesCount']
      zyklus.themeName = fileContent['themeName']
      zyklus.language = fileContent['language']
      console.log('Database', 'Importing Entries..')
      entries = []
      for (let i=0; i<count; i++) {
        const item = JSON.parse(fileContent[i]);
        const startDate = item.startDate
        const entry = new Entry(startDate)
        if (item['endDate'] !== undefined) entry.endDate = item['endDate'] 
        entries.push(entry)
      }
      console.log('Database', 'Entries Imported!')
      zyklus.io.save()
      zyklus.update()
      zyklus.theme.load(themes[zyklus.themeName])
      zyklus.theme.start()
    }
    fileReader.readAsText(file, "UTF-8")
  }

  this.export = function (filename, text) {
    let url = document.createElement('a')
    url.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    url.setAttribute('download', filename)

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      url.dispatchEvent(event)
    } else url.click()
  }
}