var inputArea;

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".inputArea").forEach((e) => {
    e.addEventListener("click", ()=>{
      // if(document.querySelector("[borderStyle='groove']"))
      // e.style.borderStyle="groove";
      inputArea = e.querySelector("h3");
    });
  });
})

document.addEventListener("keydown", (k)=>{
  let nucleotides;
  //restrict DNA and mRNA to appropriate letters only
  if(inputArea){
    if(inputArea.id == "DNA"){ nucleotides = "acgt"}
    if(inputArea.id == "mRNA"){ nucleotides = "acgu"}
  }
  //handle keyup
  if(inputArea){
      if(k.key == "Backspace"){inputArea.innerText = inputArea.innerText.slice(0,inputArea.innerText.length-1)}
      if(k.key == "Escape"){document.querySelectorAll("h3").forEach((e) => {e.innerText = ""});}
      if(k.keyCode >= 65 && k.keyCode <= 90){
        //for DNA or mRNA
        if(nucleotides){
            if(nucleotides.includes(k.key)){
                inputArea.innerText = inputArea.innerText + k.key.toUpperCase();
            }
        }
        //Amino Acids <<<currently disabled in html since class != inputArea>>>
        // else{ inputArea.innerText = inputArea.innerText + k.key}
      }
      displayInfo();
  }
});

function displayInfo(){
    let mRNA=[];
    let DNA=[];
    let AA=[];

    if(inputArea.id == "DNA"){
        DNA = inputArea.innerText.split(" ").join("").split("");
        for(i = 0; i < DNA.length; i++){
          if(DNA[i]=="A"){mRNA[i]="U"}
          else if(DNA[i]=="C"){mRNA[i]="G"}
          else if(DNA[i]=="G"){mRNA[i]="C"}
          else if(DNA[i]=="T"){mRNA[i]="A"}
        }
    }

    if(inputArea.id == "mRNA"){
      mRNA = inputArea.innerText.split(" ").join("").split("");
      for(i = 0; i < mRNA.length; i++){
        if(mRNA[i]=="A"){DNA[i]="T"}
        else if(mRNA[i]=="C"){DNA[i]="G"}
        else if(mRNA[i]=="G"){DNA[i]="C"}
        else if(mRNA[i]=="U"){DNA[i]="A"}
        //remove formatting characters
        // else{mRNA.splice(i, 1)}
      }
    }
    //if no start codon, clear aminoacid and codon fields
    if(!mRNA.join("").includes("AUG")){
      translateCodons("");
      document.querySelector("#codons").innerHTML = "";

    };
    //format codon string
    if(mRNA.join("").includes("AUG")){
      let codonString = "<u style='color:green'>AUG</u>-";
      //find start codon
      let indexOfAUG = mRNA.join("").indexOf("AUG");
      //highlight start codon
      //reformat string into codons
            //start at i+3 because AUG is hardcoded in already
      for(i = indexOfAUG+3; i < mRNA.join("").length; i = i+3){
        if(mRNA.join("").slice(i,i+3).length==3){
          // //endif stop codon
          if(["UGA","UAA","UAG"].includes(mRNA.join("").slice(i,i+3))){
            codonString = codonString + mRNA.join("").slice(i,i+3);
            document.querySelector("#codons").innerHTML = codonString;
            break
          }
          //handle "normal" codons
          else {
            codonString = codonString + mRNA.join("").slice(i,i+3);
            //add trailing dash if not the last codon
            if(mRNA[i+5]){ codonString = codonString + "-"};
          }
        }
      }
      //translate codons
      document.querySelector("#codons").innerHTML = codonString;
      translateCodons(codonString);
    }
    //format mRNA strand
    let m = ""; //mRNA string
    for(i = 0; i < mRNA.join("").length; i = i+5){
      m = m + mRNA.join("").slice(i,i+5)
      //add whitespace every 5 nucleotides
      if(mRNA.join("").slice(i,i+5).length==5){
        m = m + " ";
      }
    }
    //display formatted mRNA string
    if (m.indexOf("AUG") >= 0){
      let iOfAUG = m.indexOf("AUG");
      document.querySelector("#mRNA").innerHTML = m.substring(0, iOfAUG) + "<u style='color:green'>AUG</u>" + m.substring(iOfAUG+3);
    }
    else if (m.indexOf("A UG") >= 0){
      let iOfAUG = m.indexOf("A UG");
      document.querySelector("#mRNA").innerHTML = m.substring(0, iOfAUG) + "<u style='color:green'>A UG</u>" + m.substring(iOfAUG+3);
    }
    else if (m.indexOf("AU G") >= 0){
      let iOfAUG = m.indexOf("AU G");
      document.querySelector("#mRNA").innerHTML = m.substring(0, iOfAUG) + "<u style='color:green'>AU G</u>" + m.substring(iOfAUG+3);
    }
    else {
      document.querySelector("#mRNA").innerHTML = m;
    }


    let d = ""; //DNA string
    for(i = 0; i < DNA.join("").length; i = i+5){
      d = d + DNA.join("").slice(i,i+5)
      //add whitespace every 5 nucleotides
      if(DNA.join("").slice(i,i+5).length==5){
        d = d + " ";
      }
    }
    //display formatted DNA string
    document.querySelector("#DNA").innerHTML = d;
    alignPrimes();//move 3' or 5' to stay above last nucleotide
}

function alignPrimes(){
  let mP = document.querySelector("#mPrime");
  let dP = document.querySelector("#dPrime");

  if (!inputArea || inputArea.innerText.length < 3){
    mP.style.display = "none";
    dP.style.display = "none";
    mP.innerHTML="5'";
    dP.innerHTML="3'";
  }
  if (inputArea.innerText.length >= 3){
    mP.style.display = "inline";
    dP.style.display = "inline";
    let spaces = "";
    for ( i=0; i<inputArea.innerText.length-3; i++){
      spaces = "&nbsp"+spaces;
    }
    mP.innerHTML = spaces+"5'";
    dP.innerHTML = spaces+"3'";
  }
}

function translateCodons(codonString){
  let codonArray = codonString.split("-");
  let aminoArray = [];
  for(i = 0; i < codonArray.length; i++){
    if(codonArray[i].length==3){
        if(["UGA","UAA","UAG"].includes(codonArray[i])){
            aminoArray.push( "STOP");
        }
        if(["UUU","UUC"].includes(codonArray[i])){
            aminoArray.push( "phenylalanine");
        }
        if(["UUA","UUG","CUU","CUC","CUA","CUG"].includes(codonArray[i])){
            aminoArray.push( "leucine");
        }
        if(["AUU","AUC","AUA"].includes(codonArray[i])){
            aminoArray.push( "isoleucine");
        }
        if(["AUG"].includes(codonArray[i])){
            aminoArray.push( "methionine");
        }
        if(["GUU","GUC","GUA","GUG"].includes(codonArray[i])){
            aminoArray.push( "valine");
        }
        if(["UCU","UCC","UCA","UCG","AGU","AGC"].includes(codonArray[i])){
            aminoArray.push( "serine");
        }
        if(["CCU","CCC","CCA","CCG"].includes(codonArray[i])){
            aminoArray.push( "proline");
        }
        if(["ACU","ACC","ACA","ACG"].includes(codonArray[i])){
            aminoArray.push( "threonine");
        }
        if(["GCU","GCC","GCA","GCG"].includes(codonArray[i])){
            aminoArray.push( "alanine");
        }
        if(["UAU","UAC"].includes(codonArray[i])){
            aminoArray.push( "tyrosine");
        }
        if(["CAU","CAC"].includes(codonArray[i])){
            aminoArray.push( "histidine");
        }
        if(["CAA","CAG"].includes(codonArray[i])){
            aminoArray.push( "glutamine");
        }
        if(["AAU","AAC"].includes(codonArray[i])){
            aminoArray.push( "asparagine");
        }
        if(["AAA","AAG"].includes(codonArray[i])){
            aminoArray.push( "lysine");
        }
        if(["GAU","GAC"].includes(codonArray[i])){
            aminoArray.push( "aspartic acid");
        }
        if(["GAA","GAG"].includes(codonArray[i])){
            aminoArray.push( "glutamic acid");
        }
        if(["UGU","UGC"].includes(codonArray[i])){
            aminoArray.push( "cysteine");
        }
        if(["UGG"].includes(codonArray[i])){
            aminoArray.push( "tryptophan");
        }
        if(["CGU","CGC","CGA","CGG","AGA","AGG"].includes(codonArray[i])){
            aminoArray.push( "arginine");
        }
        if(["GGU","GGC","GGA","GGG"].includes(codonArray[i])){
            aminoArray.push( "glycine");
        }
    }
  }
  if(codonArray[0].length != 3 && codonArray.includes("<u style='color:green'>AUG</u>"))  {aminoArray.splice(0,0,"methionine")}
  document.querySelector("#AA").innerHTML = aminoArray.join(" - ")
}
