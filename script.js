var root = document.querySelector(":root");
var root_style = getComputedStyle(root);
const page_id = $("meta[name='page-id']").attr("content");

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

function cover_clicked() {
    window.location.href = "books/"+$(this).attr("id").slice(5)+".html";
}

function process_book_directory(data) {
    console.log(data);
    data.forEach(book => load_book_cover(book));
    // TODO: make and here remove a message saying that books are still being loaded
}

function load_book_cover(book) {
    // load the cover template and extract the contents as jQuery data
    const cover_template = $("#cover-template");
    const cover_raw = cover_template.prop("content");
    const cover = $(cover_raw).find(".cover");

    // console.log(cover);

    // remove the ".html" from the book name
    var cover_id = "book-"+book.slice(0, -5);
    cover.attr("id", cover_id);

    cover.find(".cover-title").attr("id", cover_id + "-title");
    cover.find(".cover-blurb").attr("id", cover_id + "-blurb");

    // insert the new cover into the page before filling
    // it with a title and blurb
    $("#background").append(cover);

    // load the book data
    // $(`#${cover_id}-title`).load(`books/${book} .book-title`, function () {
    //     $(this).find(`.book-title`).replaceWith(function () {
    //         return $(this).contents();
    //     });
    // });

    // $(`#${cover_id}-blurb`).load(`books/${book} .book-blurb`, function () {
    //     $(this).find(`.book-blurb`).replaceWith(function () {
    //         return $(this).contents();
    //     })
    // });
}

function book_directory_not_found() {
    console.log("Can't find books/directory.json");
    $("#background").append("<p>books/directory.json can't be found, whoever made this website needs to lock in</p>")
}

function setup(event) {    
    root.style.setProperty("--background-gradient", random_gradient());
    root.style.setProperty("--title-gradient", random_gradient());

    if (page_id == "index") {
        // locate all the books in the directory
        $.getJSON("books/directory.json", process_book_directory)
            .fail(book_directory_not_found)
    }

    //// bind loss of mouse focus for covers
    $(".cover").attr("tabindex", -1);
    $(".cover").on("mouseout", cover_focus_lost);
    $(document).on("click", ".cover", cover_clicked);
}

document.addEventListener("DOMContentLoaded", setup);