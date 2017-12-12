var acc = document.getElementsByClassName("accordion");
var i,k;


for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        var panel = this.nextElementSibling;
        this.classList.toggle("active");
        for(k = 0; k < acc.length ; k++) {
          acc[k].classList.toggle("active");
          var panel_temp = acc[k].nextElementSibling;
          if(panel != panel_temp)
            panel_temp.style.display = "none";
        }
        
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}
