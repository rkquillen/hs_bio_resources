//TODO move td styling to css file

var roster = [];
var heldStudent = null;
var bumpedStudent = null;

class Student {
  constructor(name, id){
    this.name = name;
    this.seatID = null;
    this.listID = "li"+id;
  }
  //hide entry on roster list
  hide(){
    document.querySelector("#"+this.listID).style.display = "none";
  }
  //re-show entry on roster list
  show(){
    document.querySelector("#"+this.listID).style.display = "block";
    document.querySelector("#"+this.listID).style.color = "black";
  }
  //clear student name from any previously assigned seat
  clearSeat(){
    if(this.seatID){
      let seat = document.querySelector("#"+this.seatID);
      seat.innerText = "";
      seat.classList.remove("table-primary")
    }
  }
}

//get roster from pasted list in textarea
function getRoster() {
  var arrayOfLines = document.getElementById("paste").value.split("\n");
  for (let i = 0; i < arrayOfLines.length; i++) {
    if (arrayOfLines[i] != ""){
      let newStudent = new Student(arrayOfLines[i], i);
      roster.push(newStudent);
    }
  }
  document.getElementById('pasteform').remove();
  showRoster();
  //TODO probably want to only enable the next buttons after this step is complete?
}

//show <ul> containing each student's name
function showRoster(){
  let list = document.querySelector("#ulRoster");
  for (let i = 0; i < roster.length; i++) {
      let s = roster[i];
      let li = document.createElement('li');
      li.innerText = s.name;
      li.id = s.listID;
      li.setAttribute("onclick", "heldStudent = roster.find(s => s.listID == this.id);  this.style.color = 'orange'")
      li.classList.add('list-group', 'col-1', 'm-1', 'border', 'p-1', 'overflow-hidden','border-dark')
      document.getElementById('ulRoster').append(li);
  }
}

function createLayout(){
  roomcols = document.getElementById('roomcols').value;
  roomrows = document.getElementById('roomrows').value;
  //make "empty seats" into objects that can be placed like a student would
  let length = roster.length;
  for (i=0; i < (roomcols * roomrows)-length; i++ ) {
      //create EMPTY SEAT object and add it to roster
      let newStudent = new Student("EMPTY SEAT "+(i+1), "e"+(i+1));
      roster.push(newStudent);
      //make corresponding <li> for EMPTY SEAT
      li = document.createElement('li');
      li.innerText = newStudent.name;
      li.id = newStudent.listID;
      li.setAttribute("onclick", "heldStudent = roster.find(s => s.listID == this.id); this.style.color = 'orange'")
      li.classList.add('list-group', 'col-1', 'm-1', 'border', 'p-1', 'overflow-hidden','border-dark')
      document.getElementById('ulRoster').append(li);
  }
  for (i=0; i < roomrows; i++){
      //make new row
      let row = document.querySelector('#tablePlaceholder').insertRow(i);
      //TODO add bootstrap styling
      row.classList.add();
      //fill row
      for (j=0; j<roomcols; j++){
          let cell = row.insertCell(j);
          cell.id = "r"+i+"c"+j;
          // cell.innerText = "placeholder for #"+cell.id;
          cell.setAttribute("onclick", "assignSeat(this.id)");
          cell.style.borderWidth = "2px"
          cell.style.borderColor = "black"
          cell.style.height = "3em"
          cell.style.width = "10em"


      }
  }
  document.querySelector("#rowcolform").style.display = "none";
  //show randomize button
  document.querySelector("#shuffleButton").style.display = "block";
}

function assignSeat(seatID){
  let seat = document.querySelector("#"+seatID);
  //re-display bumped student on the roster list so they can be re-placed
  if (seat.innerText){
    bumpedStudent = roster.find(s => s.name == seat.innerText);
    bumpedStudent.show();
    bumpedStudent.seatID = null;
  }
  //clear name from old seat
  heldStudent.clearSeat();
  //update seat info
  seat.innerText = heldStudent.name;
  seat.classList.add("table-primary");
  heldStudent.seatID = seat.id;
  //hide student's name in roster list
  heldStudent.hide();
}

function shuffleChart(){
  let remStuds = roster.filter(s => s.seatID == null);
  shuffle(remStuds);
  //TODO finish this function by assigning to unoccupied seats
  let seats = [];
  let remSeats = [];
  let takenSeats = [];
  //set takenSeats
  for (i=0; i<roster.length ;i++){
    if (roster[i].seatID != null){ takenSeats.push(roster[i].seatID)}
  }
  //set seats
  document.querySelectorAll("td").forEach((td) => {seats.push(td.id)});
  remSeats = seats.filter(s => !takenSeats.includes(s));

  for (i=0; i<remStuds.length; i++){
    document.getElementById(remSeats[i]).innerText = remStuds[i].name;
  }
}

//shuffle array in place
function shuffle(arr) {   //ctrl-v from some stackexchange thread, seems random enough though?
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
