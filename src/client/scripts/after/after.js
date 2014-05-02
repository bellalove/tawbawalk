;(function(){

var modalimg = document.getElementById("modal-img");
var modalrow = document.getElementById("modal-row");
var modalcontainer = document.getElementById("modal-container");
var tstamp = (new Date()).getTime();

modalimg.src += '?' + tstamp;

if (/work/.test(document.baseURI)) { // REMOVE LATER

  modalimg.onclick = function () {
    modalcontainer.className ="normal";
    modalrow.className ="normal";
    modalimg.className ="normal";
  };

}


}).call(this);
