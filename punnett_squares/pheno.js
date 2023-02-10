function showPheno(){
  if(document.querySelector("#inputAlleles").style.display= "none"){document.querySelector("#inputAlleles").style.display= "block";}
  let rules = document.querySelector("input[type=radio].pattern:checked").value;
  if( rules == "complete"){setMaxLength(2); drawComplete();}
  if( rules == "incomplete"){setMaxLength(2); drawIncomplete();}
  if( rules == "codominance"){setMaxLength(2); drawCodominance();}
  //TODO add drawMultiAlleles()
  //TODO add drawSexLinked()
  if( rules == "dihybrid"){setMaxLength(4); drawDihybrid();}
  displayLegend(rules);
}

function setMaxLength(int){
  if( document.querySelector('#mom').maxLength != int || document.querySelector('#r1c1') === null){
    document.querySelector('#mom').maxLength = int;
    document.querySelector('#dad').maxLength = int;
    makeSquare();
  }
}

function drawComplete(){
  document.querySelectorAll('td').forEach((cell) => {
    if (cell.innerText.slice(0,1).toUpperCase() != cell.innerText.slice(0,1).toLowerCase()){
      if( cell.innerText.includes(cell.innerText.slice(0,1).toUpperCase())){
        cell.innerHTML = cell.innerText+models[0];
      }
      else {
        cell.innerHTML = cell.innerText+models[2];
      }
    }
  });
}

function drawIncomplete(){
  document.querySelectorAll('td').forEach((cell) => {
    if (cell.innerText.slice(0,1).toUpperCase() != cell.innerText.slice(0,1).toLowerCase()){
      if( cell.innerText.includes(cell.innerText.slice(0,2).toUpperCase())){
        cell.innerHTML = cell.innerText+models[0];
      }
      else if (cell.innerText.includes(cell.innerText.slice(0,1).toUpperCase()) &&cell.innerText.includes(cell.innerText.slice(0,1).toLowerCase())){
        cell.innerHTML = cell.innerText+models[1];
      }
      else {
        cell.innerHTML = cell.innerText+models[2];
      }
    }
  });
}

function drawDihybrid(){
    document.querySelectorAll('td').forEach((cell) => {
    //order alleles and split the pairs into local variables here for easier typing
    let a1 = cell.innerText.slice(0,1);
    let a2 = cell.innerText.slice(1,2);
    let b1 = cell.innerText.slice(2,3);
    let b2 = cell.innerText.slice(3,4);
    //rearrange so first pair and last pair are matching alleles.
    if(a1.toUpperCase() != a2.toUpperCase()){
      let s = a2;
      a2 = b1;
      b1 = s;
      if(a1.toUpperCase() != a2.toUpperCase()){
        let s = a2;
        a2 = b2;
        b2 = s;
      }
    }
    //rearrange so dominant alleles come first within pair.
    if(a1 == a1.toLowerCase()){
      let s = a1;
      a1 = a2;
      a2 = s;
    }
    if(b1 == b1.toLowerCase()){
      let s = b1;
      b1 = b2;
      b2 = s;
    }
    cell.innerText = a1+a2+b1+b2
    if (cell.innerText.slice(0,1).toUpperCase() != cell.innerText.slice(0,1).toLowerCase()){
      //dom-dom = [0]
      if(cell.innerText.slice(0,2).includes(cell.innerText.slice(0,1).toUpperCase()) && cell.innerText.slice(2,4).includes(cell.innerText.slice(2,3).toUpperCase())){
        cell.innerHTML = cell.innerText+models[0];
      }
      //dom-rec = [1]
      else if(cell.innerText.slice(0,2).includes(cell.innerText.slice(0,1).toUpperCase())){
        cell.innerHTML = cell.innerText+models[1];
      }
      else if (cell.innerText.slice(2,4).includes(cell.innerText.slice(2,3).toUpperCase()) ) {
        cell.innerHTML = cell.innerText+models[2];
      }
      else{
        cell.innerHTML = cell.innerText+models[3];
      }
    }
  })
}

//Needs work
function drawCodominance(){
  document.querySelectorAll('td').forEach((cell) => {
    if( cell.innerText.includes(cell.innerText.slice(0,2).toUpperCase())){
      cell.innerHTML = cell.innerText+models[0];
    }
    //This isn't quite right yet since it is still looking for upper and lowercase
    else if (cell.innerText.includes(cell.innerText.slice(0,1).toUpperCase()) &&cell.innerText.includes(cell.innerText.slice(0,1).toLowerCase())){
      cell.innerHTML = cell.innerText+models[3];
    }
    else {
      cell.innerHTML = cell.innerText+models[2];
    }
  });
}

function drawSexLinked(){

}

function drawMultiAlleles(){

}
