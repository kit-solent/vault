function random_hex() {
    var return_value = "";
    var hex_values = "0123456789abcdef";

    for ( var i = 0; i < 6; i++ ) {
      return_value += hex_values.charAt(Math.floor(Math.random() * hex_values.length));
    }
    return return_value;
}

function random_gradient() {
    return `linear-gradient(to top    left,  #${random_hex()}, transparent),`+
           `linear-gradient(to top    right, #${random_hex()}, transparent),`+
           `linear-gradient(to bottom left,  #${random_hex()}, transparent),`+
           `linear-gradient(to bottom right, #${random_hex()}, transparent)`;
}

function setup_gradient_changes() {
    var colour_effect_elements = document.getElementsByClassName("colour-effect");
    for (let i=0; i<colour_effect_elements.length; i++) {
        console.log("Adding colour-effect2 div to colour-effect element.")
        var element = colour_effect_elements[i]
        if (element.children.length == 1  &&
            element.children[0].classList.contains("cover-container") &&
            element.children[0].classList.contains("colour-effect2")) {
                continue
        }
        else {
            // This happens if the colour-effect element does not have one div child with the cover-container and colour-effect2 classes.
            element.innerHTML = "<div class=\"cover-container colour-effect2\">" + element.innerHTML + "</div>"
        }
    }
}

function next_gradient() {
    var colour_effect_elements = document.getElementsByClassName("colour-effect");
    for (let i=0; i<colour_effect_elements.length; i++) {
        var old_grad = colour_effect_elements[i].style.background
        colour_effect_elements[i].style.background = random_gradient();
        colour_effect_elements[i].children[0].style.background = old_grad;
        colour_effect_elements[i].children[0].classList.remove("colour-effect2"); // remove the transition so we can instantly change the background_color
        colour_effect_elements[i].children[0].style.background_color = "transparent";
        colour_effect_elements[i].children[0].style.background_color = "transparent";
    }
}

//document.addEventListener("DOMContentLoaded",setup_gradient_changes);
//setInterval(next_gradient,2000)