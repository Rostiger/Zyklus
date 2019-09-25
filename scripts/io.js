'use strict'

function IO () {

  this.load = function() {
    console.log('Database', 'Loading Entries..')
    const request = new XMLHttpRequest()
    const path = `users/${username}/database.json`
    request.open("GET", path)
    request.overrideMimeType("application/json")
    request.onreadystatechange = function() {
      if (this.readyState == this.DONE && this.status == 200) {
        if (this.responseText) parseData(this.responseText)
      } else {
          console.log('Database', 'Database is Empty.')
          zyklus.update()
      } 
    } 
    request.send()
  }

  this.save = function() {
    let entriesOBJ = {}
    for (const id in entries) {
      entriesOBJ[id] = {}
      entriesOBJ[id].startDate = entries[id].startDate
      entriesOBJ[id].endDate = entries[id].endDate
    }
    const entriesJSON = JSON.stringify(entriesOBJ)
    const request = new XMLHttpRequest()
    request.open("POST", "scripts/save.php", true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.send("data=" + entriesJSON)
  }

  function parseData(data) {
    if (data == null || data.trim() == "") return
    const dataArray = JSON.parse(data)

    for (const id in dataArray) {
      const startDate = dataArray[id].startDate
      const entry = new Entry(startDate)
      if (dataArray[id].endDate !== undefined) entry.endDate = dataArray[id].endDate 
      entries.push(entry)

    }
    console.log('Database', 'Entries Loaded!')
    zyklus.update()
  }
}