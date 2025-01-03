var coll = document.getElementsByClassName("pop_up_Text");
var i;



document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("mouseover", display_on_hover);
        coll[i].addEventListener("mouseout", display_on_hover);
    }

    function display_on_hover() {
        console.log("hovering over: " + this.id);
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log("content: " + content);
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
});

