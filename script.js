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
    var colour_effect_elements = document.getElementsByClassName("background-placer");

    // loop over all elements with the class background-placer
    for (let i=0; i<colour_effect_elements.length; i++) {
        var element = colour_effect_elements[i];

        var found_background_primary = false;   // background-primary
        var found_background_secondary = false; // background-secondary
        var found_double = false;

        // loop over all the elements children
        for (let j=0; i<element.children.length; i++) {
             var child = element.children[i];

            if (child.classList.contains("background-primary")) {
                // if the element has both background classes then remove the background-seoncdary class and warn the console.
                // also take note of this because if no background-secondary element is found then it may be that this element
                // only has the background-primary by mistake and was intended as a background-secondary element.
                if (child.classList.contains("background-secondary")) {
                    console.warn("Elements cannot use both background-primary and background-secondary classes. Removing background-secondary.");
                    child.classList.remove("background-secondary");
                    found_double = true;
                }

                // if a background-primary class has already been found
                if (found_background_primary) {
                    // warn the console but don't change anything
                    console.warn("Multuple elements with the class background-primary found.");
                }

                found_background_primary = true;
            }
            else if (child.classList.contains("background-secondary")) {
                found_background_secondary = true;
            }
            else {
                continue;
            }
        }

        // if no background-primary was found then make one.
        if (!found_background_primary) {
            element.innerHTML = "<div class=\"background-primary\"></div?" + element.innerHTML;
        }

        // if no background-secondary was found then make one.
        if (!found_background_secondary) {
            if (found_double) {
                console.warn("No background-secondary class found but one was removed earlyer due to the presence of a background-primary class. One will be created now.");
            }
            element.innerHTML = "<div class=\"background-secondary\"></div>" + element.innerHTML;
        }
    }
}
document.addEventListener("DOMContentLoaded",setup_gradient_changes);

function next_gradient(gradient=null) { // TODO: add optional gradient overide.
    var colour_effect_elements = document.getElementsByClassName("background-placer");
    for (let i=0; i<colour_effect_elements.length; i++) {
        var element = colour_effect_elements[i];
        var background_primarys = element.getElementsByClassName("background-primary");
        var background_secondarys = element.getElementsByClassName("background-secondary");

        // loop over all background-primary elements and establish a gradient (old_grad).
        var old_grad = null
        var already_warned = false
        for (let i=0; i<element.children.length; i++) {
            var child = element.children[i];

            // because of the setup_gradient_changes call we can assume that elements will be either background-primary, background-secondary, or neither, but never both.
            if (child.classList.contains("background-primary")) {
                // warn the console if the element has a different gradient to an element we have already seen.
                if (old_grad && old_grad != child.style.background && !already_warned) {
                    console.warn("Multuple background-primary elements with different gradients have been detected. The gradient of the first element will be used and all subsequent elements will be overidden.");
                    already_warned = true;
                    child.style.background = old_grad;
                }

                // remember the gradient
                old_grad = child.style.background;
                console.log("Hello"+old_grad);
                console.log(typeof(old_grad));
            }

            // this iteration only looks at background-primary elements. background-secondary elements are looked at next loop.
        }

        // if old_grad is still null then no background-primary elements were found.
        // continue to the next background-placer element.
        if (!old_grad) {
            continue;
        }

        // loop over all background-secondary elements and set their gradients to old_grad.
        // set the opacity of all background-secondary elements to 1 (fully shown) so that the background-primary elements are hidden.
        // This lets us change them without it being seen.
        for (let i=0; i<element.children.length; i++) {
            var child = element.children[i];

            // if the child is a background-secondary then set its gradient.
            if (child.classList.contains("background-secondary")) {
                child.style.background = old_grad;

                // remove the opacity-fade class so that we can instantly set the opacity to 1 (fully shown)
                child.classList.remove("opacity-fade");

                child.style.opacity = "1.0"; // This should be a string. I checked.

                // add the class back on so that we can fade it out.
                child.classList.add("opacity-fade");
            }
        }

        // generate a new gradient and apply it to all the background-primarys
        var new_grad;

        if (gradient) {
            new_grad = gradient;
        }
        else {
            var new_grad = random_gradient();
        }

        for (let i=0; i<element.children.length; i++) {
            var child = element.children[i];

            if (child.classList.contains("background-primary")) {
                child.style.background = new_grad;
            }
        }

        // fade out the background-secondarys
        for (let i=0; i<element.children.length; i++) {
            var child = element.children[i];

            if (child.classList.contains("background-secondary")) {
                child.style.opacity = "0.0"
            }
        }
    }
}

setInterval(next_gradient,2000)