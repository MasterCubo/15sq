// leaderboard file

function loadLeaderboard(){
  
  let json = loadJSON("leaderboard.json", loadLB)
  
}

function orderDivs() {
    // bring the selected leaderboard to the top
  let cont = document.getElementById("LBS")
  let lbDiv = document.getElementById(`${sel}d`)
  if (cont && lbDiv) {
        cont.insertBefore(lbDiv, cont.firstChild);
      }
}

function loadLB(json) {
  
  for (let i = 2; i < 11; i++){
    let sizeData = json[i]
    let sizeTable = document.getElementById(`${i}t`)
    let tbody = sizeTable.querySelector('tbody');
    
    for (let d of sizeData) {
      
      var newRow = document.createElement("tr");
        
          var newCell = document.createElement("td");
          let inner = document.createElement("p")
          inner.innerText = d.name
          newCell.appendChild(inner)
          newRow.appendChild(newCell)
      
           newCell = document.createElement("td");
           inner = document.createElement("p")
          let dateObj = new Date(d.date)
          let string = ''
          string += dateObj.getMonth()+1+"/"
          string += dateObj.getDate()+"/"
          string += dateObj.getFullYear().toString().slice(-2)+" "
          string += dateObj.getHours()+":"
          string += dateObj.getMinutes()
          inner.innerText = string
          
          newCell.appendChild(inner)
          newRow.appendChild(newCell)
      
           newCell = document.createElement("td");
           inner = document.createElement("p")
            let timeNum = d.time/1000
            let timeText =
            zeroPad(floor(timeNum / 60), 2) +
            ":" + // minutes
            zeroPad(floor(timeNum % 60), 2) +
            "." + // seconds
            str(timeNum).split(".")[1]; // millis
          inner.innerText = timeText
          newCell.appendChild(inner)
          newRow.appendChild(newCell)
      
           newCell = document.createElement("td");
           inner = document.createElement("p")
          inner.innerText = d.moves
          newCell.appendChild(inner)
          newRow.appendChild(newCell)
      
        tbody.appendChild(newRow)
    }
    
    
  }

  
}

function createLB() {
  let div = document.getElementById("LBS")

  // this is what im making 
  
  // <h2>3x3</h2>
  //   <table id="3">
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Date</th>
  //         <th>Time</th>
  //         <th>Moves</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <!-- Rows will be added here -->
  //     </tbody>
  //   </table>
  
      for (let i=2; i < 11; i++){
        let tableDiv = document.createElement("div")
        tableDiv.id = `${i}d`
        div.appendChild(tableDiv)
        
        let newH2 = document.createElement("h2")
        newH2.innerHTML = `${i}x${i}`
        tableDiv.appendChild(newH2)
        
        let table = document.createElement("table")
        table.id = `${i}t`
        tableDiv.appendChild(table)
        //table.width="100px"
        
        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        table.appendChild(thead)
        table.appendChild(tbody)
        
        let tr = document.createElement("tr")
        thead.appendChild(tr)
        
        let th1 = document.createElement("th")
        th1.innerText="Name"
        th1.width="50px"
        
        let th2 = document.createElement("th")
        th2.innerText="Date"
        th2.width="120px"
        
        let th3 = document.createElement("th")
        th3.innerText="Time"
        th3.width="60px"

        
        let th4 = document.createElement("th")
        th4.innerText="Moves"
        th4.width="20px"

        
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(th4)
  
      }
}
let globjson
let passSel
let passlbTime
function checkLeaderboard(sel, lbTime) {
  passSel = sel
  passlbTime = lbTime
  loadJSON("leaderboard.json", checkLB)
}
function checkLB(json){
  globjson = json
  let sele = passSel
  let lbTime = passlbTime
  passSel = null
  passlbTime = null

    if(json[sele][0].time > lbTime){
      LBwin(nameInput.value(), new Date(), lbTime, moves, json, sele)
    }
}

function LBwin(pname, pdate, ptime, pmoveC, json, sele) {
  json[sele].unshift({name: pname, date: pdate, time: ptime, moves: pmoveC})
  
  let newJSON = JSON.stringify(json)
  fs.writeFile('leaderboard.json', json, 'utf8', callback);
  
  
}
