var codons =[];
var focus = "";
var aaInc = 0;
var codonInc = 0;

document.addEventListener("keydown", (e)=> {
  if(e.key == 'Backspace'){
      codons.pop();
      focus = "";
      for(i=0; i<codons.length ; i++){
          focus = focus + codons[i];
      }
      zoomOut(focus.toUpperCase());
      document.querySelector('#aaInput').firstElementChild.innerHTML = "";
  }
  if('acgu'.includes(e.key)){
      if(codons.length < 3){
          codons.push(e.key);
      }
      focus = "";
      for(i=0; i<codons.length ; i++){
          focus = focus + codons[i];
      }
      focusOn(focus.toUpperCase());
  }
  if(e.key == 'Enter' && codons.length == 3){
    if(codonInc < 10){
      let codonList = document.querySelector('#codonsListText'+codonInc).firstElementChild;
      codonList.innerHTML = focus.toUpperCase();
      codonInc++;
      document.querySelector('#aminoAcidsList'+aaInc).firstElementChild.innerHTML = translate(focus.toUpperCase());
      aaInc++;
    }
    //reset elements
    document.querySelector('#aaInput').firstElementChild.innerHTML = "";
    codons = [];
    focus = "";
    zoomOut(focus.toUpperCase());
  }
  if(e.key == 'Escape'){
    appReset();
  }
  //display codon input
  document.querySelector('#inputText').firstElementChild.innerHTML = focus.toUpperCase();
  //display aaInput
  if(focus.length == 3){
      document.querySelector('#aaInput').firstElementChild.innerHTML = translate(focus.toUpperCase());
  }
});

function focusOn(focus){
  document.querySelectorAll("[inkscape\\:label]").forEach((e) => {
        let label = e.getAttribute("inkscape:label");
        if(!label.includes('path_'+focus)){
          e.style.display = "none";
        }
  });
}

function zoomOut(focus){
  document.querySelectorAll("[inkscape\\:label]").forEach((e) => {
        let label = e.getAttribute("inkscape:label");
        if(label.includes('path_'+focus)){
          e.style.display = "block";
        }
  });
}

function appReset(){
    codons =[];
    focus = "";
    aaInc = 0;
    codonInc = 0;
    zoomOut("");
    document.querySelector('#inputText').firstElementChild.innerHTML = "";
    document.querySelector('#aaInput').firstElementChild.innerHTML = "";
    for (i=0;i < 10; i++){
        document.querySelector("#aminoAcidsList"+i).firstElementChild.innerHTML = "";
        document.querySelector("#codonsListText"+i).firstElementChild.innerHTML = "";
    }
}

function translate(codon){
    if(["UGA","UAA","UAG"].includes(codon)){
        return "STOP";
    }
    if(["UUU","UUC"].includes(codon)){
        return "phenylalanine";
    }
    if(["UUA","UUG","CUU","CUC","CUA","CUG"].includes(codon)){
        return "leucine";
    }
    if(["AUU","AUC","AUA"].includes(codon)){
        return "isoleucine";
    }
    if(["AUG"].includes(codon)){
        return "methionine";
    }
    if(["GUU","GUC","GUA","GUG"].includes(codon)){
        return "valine";
    }
    if(["UCU","UCC","UCA","UCG","AGU","AGC"].includes(codon)){
        return "serine";
    }
    if(["CCU","CCC","CCA","CCG"].includes(codon)){
        return "proline";
    }
    if(["ACU","ACC","ACA","ACG"].includes(codon)){
        return "threonine";
    }
    if(["GCU","GCC","GCA","GCG"].includes(codon)){
        return "alanine";
    }
    if(["UAU","UAC"].includes(codon)){
        return "tyrosine";
    }
    if(["CAU","CAC"].includes(codon)){
        return "histidine";
    }
    if(["CAA","CAG"].includes(codon)){
        return "glutamine";
    }
    if(["AAU","AAC"].includes(codon)){
        return "asparagine";
    }
    if(["AAA","AAG"].includes(codon)){
        return "lysine";
    }
    if(["GAU","GAC"].includes(codon)){
        return "aspartic acid";
    }
    if(["GAA","GAG"].includes(codon)){
        return "glutamic acid";
    }
    if(["UGU","UGC"].includes(codon)){
        return "cysteine";
    }
    if(["UGG"].includes(codon)){
        return "tryptophan";
    }
    if(["CGU","CGC","CGA","CGG","AGA","AGG"].includes(codon)){
        return "arginine";
    }
    if(["GGU","GGC","GGA","GGG"].includes(codon)){
        return "glycine";
    }
}
