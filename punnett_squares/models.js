const redNewt = '<br><img src="svg/newt_red.svg" style="height:4rem"> ';
const orangeNewt = '<br><img src="svg/newt_orange.svg" style="height:4rem"> ';
const yellowNewt = '<br><img src="svg/newt_yellow.svg" style="height:4rem"> ';
const stripedNewt = '<br><img src="svg/newt_striped.svg" style="height:4rem">' ;
const newts = [redNewt, orangeNewt, yellowNewt, stripedNewt]
const newtsText = ["DOMINANT", "heterozygous (inc. dominance)", "recessive", "heterozygous (codominance)"]

const blackRedDros = '<br><img src="svg/dros_black.svg" style="height:6rem">'
const blackGreenDros = '<br><img src="svg/dros_black_geyes.svg" style="height:6rem">'
const tanRedDros = '<br><img src="svg/dros_tan.svg" style="height:6rem">'
const tanGreenDros = '<br><img src="svg/dros_tan_geye.svg" style="height:6rem">'
const tanBodyDros = '<br><img src="svg/dros_tanbody.svg" style="height:6rem">'
const blackBodyDros = '<br><img src="svg/dros_blackbody.svg" style="height:6rem">'
const redEyeDros = '<br><img src="svg/dros__wteyes.svg" style="height:6rem">'
const greenEyeDros = '<br><img src="svg/dros__geye.svg" style="height:6rem">'
const dros = [blackRedDros, blackGreenDros, tanRedDros, tanGreenDros, blackBodyDros, tanBodyDros, redEyeDros, greenEyeDros]
const drosText = ["DOMINANT", "", "recessive", "", "DOMINANT BODY", "recessive body", "DOMINANT EYES", "recessive eyes"]

var models = [];
var modelsText = [];

function setModels(){
  models = [];
  modelsText = [];
  let model =  document.querySelector("input[type=radio].model:checked").value;
  if( model == "newt" ){
    for (i = 0; i < newts.length; i++){models[i] = newts[i]}
    for (i = 0; i < newtsText.length; i++){ modelsText[i] = newtsText[i];}
    setRadioPheno(["complete","incomplete","codominance"]);
  }
  if (model == "dros" ){
    for (i = 0; i < dros.length; i++) {models[i] = dros[i]}
    for (i = 0; i < drosText.length; i++) {modelsText[i] = drosText[i]}
    setRadioPheno(["complete", "dihybrid"]);
  }
}

function setRadioPheno(patterns){
  let radio = document.querySelector('#radioPheno');
  radio.innerHTML= "";
  for (i = 0; i<patterns.length; i++){
    radio.innerHTML = radio.innerHTML + '<input type="radio" name="pattern" id="'+patterns[i]+'" value="'+patterns[i]+'" class="pattern" onclick="showPheno()"><label for="'+patterns[i]+'">'+patterns[i]+'</label>&nbsp;&nbsp;&nbsp;&nbsp;'
  }
}

function displayLegend(pattern){
    document.querySelectorAll('.legend').forEach((cell) => { cell.innerHTML = ""}); //resets legend
    let legText = document.querySelectorAll('.legendText');
    let legModel = document.querySelectorAll('.legendModel');

    if (pattern == "complete"){
        legModel[0].innerHTML = models[0];
        legText[0].innerHTML = modelsText[0];
          if(momA1) { legText[0].innerHTML=  modelsText[0] + " ("+momA1.toUpperCase()+")"};
        legModel[1].innerHTML = models[2];
        legText[1].innerHTML = modelsText[2];
          if(momA1) { legText[1].innerHTML=  modelsText[2] + " ("+momA1.toLowerCase()+")"};
    }
    if (pattern == "incomplete"){
        legModel[0].innerHTML = models[0];
        legText[0].innerHTML = modelsText[0];
        // legModel[1].innerHTML = models[1];
        // legText[1].innerHTML = modelsText[1];
        legModel[2].innerHTML = models[2];
        legText[2].innerHTML = modelsText[2];
    }
    // TODO Display svgs that represent just the individual allele.  so Dom1 rec1 Dom2 rec2
    if (pattern == "dihybrid"){
        legModel[0].innerHTML = models[4];
        legText[0].innerHTML = modelsText[4];
            if(r1){legText[0].innerHTML = modelsText[4] + " ("+r1.slice(0,1).toUpperCase()+")"};
        legModel[1].innerHTML = models[5];
        legText[1].innerHTML = modelsText[5];
            if(r1){legText[1].innerHTML = modelsText[5] + " ("+r1.slice(0,1).toLowerCase()+")"};
        legModel[2].innerHTML = models[6];
        legText[2].innerHTML = modelsText[6];
            if(r1.slice(1,2)){legText[2].innerHTML = modelsText[6] + " ("+r1.slice(1,2).toUpperCase()+")"};
        legModel[3].innerHTML = models[7];
        legText[3].innerHTML = modelsText[7];
            if(r1.slice(1,2)){legText[3].innerHTML = modelsText[7] + " ("+r1.slice(1,2).toLowerCase()+")"};
    }
}
