function makeBook(name,desc,hmtl,book)
{
    name = (name || document.getElementById("bookName"));   // name Element
    desc = (desc || document.getElementById("bookDesc"));   // description Element
    name.value = name.value.trim()      // void white space in name
    desc.value = desc.value.trim()      // void white space in description

    if(!name.value||!desc.value)    // validates name & description
    {console.error("invalid makebook params"); return};    // ignores - invalid

    html = document.getElementById("template").innerHTML;     // html template
    html = html.split("{{ name }}").join(name.value);       // change name
    html = html.split("{{ desc }}").join(desc.value);       // change description

    book = document.createElement("book");      // creates book now

    book.Name = name.value; book.Desc = desc.value      // shortcut attribute
    book.addEventListener("click",function(){readBook(this)});        // read it
    book.innerHTML = html       // puts new html into new book

    document.getElementById("view").appendChild(book);     // view new book
    name.value = ""; desc.value = "";       // clears input for next new book
}

function findBook(fltr, list)
{
    fltr = fltr.trim().toLowerCase();
    list = [].slice.call(document.getElementByTagName("book"));

    list.forEach((book)=>
    {
        book.ClassName = "hide";    // hide all for now
        if(book.id == "template"){return};  // not interesting
        if(!fltr || (fltr=="*")){book.ClassName = "show"; return};  // find all

        let name = book.Name.toLowerCase();
        let desc = book.Desc.toLowerCase();

        if(name.indexOf(fltr)< 0 &&(desc.indexOf(fltr)< 0)){return};
        book.ClassName = "show"
    });
}

    function readBook(book,done,item)
    {
        done = document.getElementById("doneList");
        item = document.createElement("li");

        item.innerHTML = book.Name;
        done.appendChild(item);

        book.parentNode.removeChild(book);
    };
