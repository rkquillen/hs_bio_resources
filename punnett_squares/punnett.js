var momA1 = "";
var momA2 = "";
var dadA1 = "";
var dadA2 = "";
var momB1 = "";
var momB2 = "";
var dadB1 = "";
var dadB2 = "";

const sqId2 = ["#r1c1", "#r1c2",
               "#r2c1", "#r2c2"];

var r1 = "";
var r2 = "";
var r3 = "";
var r4 = "";
var c1 = "";
var c2 = "";
var c3 = "";
var c4 = "";

const sqId4 = ["#r1c1", "#r1c2", "#r1c3", "#r1c4",
              "#r2c1", "#r2c2", "#r2c3", "#r2c4",
              "#r3c1", "#r3c2", "#r3c3", "#r3c4",
              "#r4c1", "#r4c2", "#r4c3", "#r4c4"]

//makeGametes and makeSquare get cue for size from the input maxlength.  which is set during showPheno();
function makeGametes(id, alleles){
    let size = document.querySelector('#mom').maxLength;
    if( id == "mom" ){
        momA1 = alleles.substring(0,1);
        document.querySelector('#c1head').innerText = momA1;
        momA2 = alleles.substring(1,2);
        document.querySelector('#c2head').innerText = momA2;
        if( size == 4){
            momB1 = alleles.substring(2,3);
            momB2 = alleles.substring(3,4);
            document.querySelector('#c1head').innerText = momA1+momB1;
            c1 = momA1+momB1;
            document.querySelector('#c2head').innerText = momA1+momB2;
            c2 = momA1+momB2;
            document.querySelector('#c3head').innerText = momA2+momB1;
            c3 = momA2+momB1;
            document.querySelector('#c4head').innerText = momA2+momB2;
            c4 = momA2+momB2;
        }
    }
    if( id == "dad"){
        dadA1 = alleles.substring(0,1);
        document.querySelector('#r1head').innerHTML = dadA1;
        dadA2 = alleles.substring(1,2);
        document.querySelector('#r2head').innerHTML = dadA2;
        if( size == 4){
            dadB1 = alleles.substring(2,3);
            dadB2 = alleles.substring(3,4);
            document.querySelector('#r1head').innerText = dadA1+dadB1;
            r1 = dadA1+dadB1;
            document.querySelector('#r2head').innerText = dadA1+dadB2;
            r2 = dadA1+dadB2;
            document.querySelector('#r3head').innerText = dadA2+dadB1;
            r3 = dadA2+dadB1;
            document.querySelector('#r4head').innerText = dadA2+dadB2;
            r4 = dadA2+dadB2;
        }
    }
    if( size == 2){
        const sqText2 = [momA1+dadA1, momA2+dadA1,
                         momA1+dadA2, momA2+dadA2];
        for(i=0; i<4; i++){
            document.querySelector(sqId2[i]).innerText = sqText2[i];
        }
    }
    if( size == 4){
        const sqText4 = [r1+c1, r1+c2, r1+c3, r1+c4,
                         r2+c1, r2+c2, r2+c3, r2+c4,
                         r3+c1, r3+c2, r3+c3, r3+c4,
                         r4+c1, r4+c2, r4+c3, r4+c4];
        for(i=0; i<16; i++){
            document.querySelector(sqId4[i]).innerText = sqText4[i];
        }
    }
}

function makeSquare(){
  let size = document.querySelector('#mom').maxLength;
  if( size == 2){
    document.querySelector("#punnettSquare").innerHTML =`
      <table style="text-align:center; margin:auto; width:50%; height:10rem" class="">
        <thead>
          <tr style="">
            <th class="table-borderless">&nbsp;&nbsp;</th>
            <th id="c1head" class="table-borderless" style="min-width:100px">&nbsp;&nbsp;</th>
            <th id="c2head" class="table-borderless" style="min-width:100px">&nbsp;&nbsp;</th>
            <th class="table-borderless">&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tr style="">
          <th id="r1head" class="table-borderless">&nbsp;&nbsp;</th>
          <td id="r1c1" class="table-bordered">&nbsp;&nbsp;</td>
          <td id="r1c2" class="table-bordered">&nbsp;&nbsp;</td>
          <th class="table-borderless">&nbsp;&nbsp;</th>
        </tr>
        <tr style="">
          <th id="r2head" class="table-borderless">&nbsp;&nbsp;</th>
          <td id="r2c1" class="table-bordered">&nbsp;&nbsp;</td>
          <td id="r2c2" class="table-bordered">&nbsp;&nbsp;</td>
          <th class="table-borderless">&nbsp;&nbsp;</th>
        </tr>
      </table>`

    }
  if( size == 4){
    document.querySelector("#punnettSquare").innerHTML = `
      <table style="text-align:center; margin:auto; width:50%; height:10rem" class="">
      <thead>
        <tr style="">
          <th class="table-borderless">&nbsp;&nbsp;</th>
          <th id="c1head" class="table-borderless">&nbsp;&nbsp;</th>
          <th id="c2head" class="table-borderless">&nbsp;&nbsp;</th>
          <th id="c3head" class="table-borderless">&nbsp;&nbsp;</th>
          <th id="c4head" class="table-borderless">&nbsp;&nbsp;</th>
          <th class="table-borderless">&nbsp;&nbsp;</th>
        </tr>
      </thead>
      <tr style="">
        <th id="r1head" class="table-borderless">&nbsp;&nbsp;</th>
        <td id="r1c1" class="table-bordered" style="min-width:100px">&nbsp;&nbsp;</td>
        <td id="r1c2" class="table-bordered" style="min-width:100px">&nbsp;&nbsp;</td>
        <td id="r1c3" class="table-bordered" style="min-width:100px">&nbsp;&nbsp;</td>
        <td id="r1c4" class="table-bordered" style="min-width:100px">&nbsp;&nbsp;</td>
        <th class="table-borderless">&nbsp;&nbsp;</th>
      </tr>
      <tr style="">
        <th id="r2head" class="table-borderless">&nbsp;&nbsp;</th>
        <td id="r2c1" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r2c2" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r2c3" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r2c4" class="table-bordered">&nbsp;&nbsp;</td>
        <th class="table-borderless">&nbsp;&nbsp;</th>
      </tr>
      <tr style="">
        <th id="r3head" class="table-borderless">&nbsp;&nbsp;</th>
        <td id="r3c1" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r3c2" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r3c3" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r3c4" class="table-bordered">&nbsp;&nbsp;</td>
        <th class="table-borderless">&nbsp;&nbsp;</th>
      </tr>
      <tr style="">
        <th id="r4head" class="table-borderless">&nbsp;&nbsp;</th>
        <td id="r4c1" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r4c2" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r4c3" class="table-bordered">&nbsp;&nbsp;</td>
        <td id="r4c4" class="table-bordered">&nbsp;&nbsp;</td>
        <th class="table-borderless">&nbsp;&nbsp;</th>
      </tr>
    </table>
    `
  }
}
