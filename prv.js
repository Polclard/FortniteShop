const Http = new XMLHttpRequest();
const url = "https://fortnite-api.com/v2/shop/br";
Http.open("GET", url)
Http.send();

let listOfNames = [];

Http.onload=()=>{
    const obj = JSON.parse(Http.response);
    let item = obj["data"]; 
    console.log(obj);
    let ct = 0;

   item.forEach(element => {
        let img = document.createElement("img");
        img.src = element["item"]["images"]["featured"];
        let nameOfItem = element["item"]["name"];
        let itemType = element["item"]["type"];
        let itemPrice = element["store"]["cost"];
        let itemRarity = element["item"]["rarity"];
        let itemDescription = element["item"]["description"];
        if(img.src.includes("null"))
        {
            img.src = element["item"]["images"]["background"];
        }
        //console.log(img.src);
        img.classList.add("img-edited");

        if(itemRarity == "uncommon")
        {
            img.style.background = "gray";
        }
        else if(itemRarity == "common"){
            img.style.background = "#319236";
        }
        else if(itemRarity == "rare"){
            img.style.background = "#4c51f7";
        }
        else if(itemRarity == "epic"){
            img.style.background = "#9d4dbb";
        }
        else if(itemRarity == "legendary"){
            img.style.background = " #f3af19";
        }
        //container-----------------------------------

        if(ct % 4 == 0)
        {
            var rowBlock = document.createElement("div");
            rowBlock.id = "rw";
        }
        else{
            var rowBlock = document.getElementById("cont").lastChild;
        }
        rowBlock.classList.add("row");    
        var columnBlock = document.createElement("div");
        columnBlock.classList.add("col-sm")
        columnBlock.appendChild(img);


        //--------------------------------------------


        //text--------------------------------------
        let imgText = document.createElement("h2");
        imgText.innerHTML = "Name of the " + 
        itemType + ": " + nameOfItem;

        let priceText = document.createElement("h2");
        priceText.innerHTML = "Price: " + itemPrice + " V-Bucks";

        let descriptionText = document.createElement("h2");
        descriptionText.innerHTML = "Description: " + itemDescription;

        priceText.classList.add("text-under-image");
        imgText.classList.add("text-under-image");
        descriptionText.classList.add("text-under-image");
        columnBlock.appendChild(imgText);
        columnBlock.appendChild(priceText);
        columnBlock.appendChild(descriptionText);
        columnBlock.id = ct;
        listOfNames.push([nameOfItem,  ct]);
        //------------------------------------------

        rowBlock.appendChild(columnBlock);
        document.getElementById("cont").appendChild(rowBlock);
        ct++;
    });

}

function findItem()
{
    let userInputName = document.getElementById("fndnm").value;
   listOfNames.forEach(element => {
       //console.log(element);
       if(element[0].includes(userInputName))
       {
            console.log("FOUND as :" + element[1]);
            document.getElementById(element[1]).scrollIntoView();
       }
    });
}
