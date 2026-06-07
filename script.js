var root = document.querySelector(":root");
var root_style = getComputedStyle(root);
const page_id = $("meta[name='page-id']").attr("content")

function random_hex() {
    var return_value = "";
    var hex_values = "0123456789abcdef";

    for (let i=0; i < 6; i++) {
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

function cover_focus_lost() {
    $(this).scrollTop(0);
}

function process_book_directory(data) {
    data.forEach(book => load_book_cover(book))
}

function load_book_cover(book) {
    
}

function book_directory_not_found() {

}

function setup(event) {
    //// set the random background gradient
    gradient = random_gradient();
    
    // we could set the background directly
    // $(".background").css("background-image", gradient).show();

    // or via the variable
    root.style.setProperty("--background-gradient", gradient);

    //// locate all the books in the directory
    $.getJSON("books/directory.json", process_book_directory)
        .fail(book_directory_not_found)



    //// bind loss of mouse focus for covers
    $(".cover").attr("tabindex", -1);
    $(".cover").on("mouseout", cover_focus_lost);
}

document.addEventListener("DOMContentLoaded", setup);














/**
 * creates and sets up the background elements if required.
 * runs the first transition.
function setup_gradient_changes(gradient = null) {
    if (!gradient) {
        gradient = random_gradient();
    }

    var color_effect_elements = document.getElementsByClassName("background-placer");

    // loop over all elements with the class background-placer
    for (let i=0; i<color_effect_elements.length; i++) {
        var element = color_effect_elements[i];

        // count the number of elements with both background-primary and background-secondary classes
        var double_count = element.getElementsByClassName("background-primary background-secondary").length;

        // if there are any double ups then warn the console and remove the background-secondary class from all of them.
        if (double_count > 0) {
            console.warn("Elements cannot use both background-primary and background-secondary classes. The background-secondary class will be removed from all that have both.");

            element.getElementsByClassName("background-primary background-secondary").forEach(element => element.classList.remove("background-secondary"))
        }

        // tally up the background-primary and background-secondary elements.
        var background_primary_count = element.getElementsByClassName("background-primary").length;
        var background_secondary_count = element.getElementsByClassName("background-secondary").length;

        if (background_primary_count >= 2) {
            // warn the console but don't change anything
            console.warn("Multiple elements with the class background-primary found.");
        }

        // if no background-primary was found then make one.
        if (background_primary_count == 0) {
            var primaryDiv = document.createElement("div");
            primaryDiv.className = "background-primary";
            element.prepend(primaryDiv);
        }

        // if no background-secondary was found then make one.
        if (background_secondary_count == 0) {
            // since we removed the background-secondary class from all the double ups warn the console
            // that this could have caused the current lack of background-secondary element.
            if (double_count > 0) {
                console.warn("No background-secondary class found but one was removed earlier due to the presence of a background-primary class. One will be created now.");
            }

            var secondaryDiv = document.createElement("div");
            secondaryDiv.classList = "background-secondary";
            element.prepend(secondaryDiv);
        }

        // put the backgrounds into the correct order. This is required for the fading effect to work.
        reorder_children(element);

        // prevents initial black screen before fist transition.
        next_gradient();
    }
}
*/