const Http = new XMLHttpRequest();
const url = "https://fortnite-api.com/v2/shop/br";
Http.open("GET", url)
Http.send();

let listOfNames = [];

Http.onload=()=>{
    const obj = JSON.parse(Http.response);
    let item = obj["data"]["featured"]["entries"]; 
    // console.log(item);
    let ct = 0;

   item.forEach(element => {

        // console.log(element)
        // console.log("----------------------------------------")

        var images_in_bundle = []

        element['items'].every(element1 =>{
            console.log(element1['bundle'])
            
            if(element['bundle'] == undefined)
            {
                let img = document.createElement("img");
                img.src = element1['images']['featured'];
                let nameOfItem = element1["name"];
                let itemType = element1['type']['value'];
                let itemRarity = ""
                let itemPrice = ""
                itemPrice = element['regularPrice'];
                itemRarity = element1['rarity']['value'];
                if(itemPrice == undefined)
                {
                    itemPrice = "NA"
                }
                if(itemRarity == undefined)
                {
                    itemRarity = "NA"
                }
                let itemDescription = element1['description']
                if(img.src.includes("null"))
                {
                    img.src = element1['images']['icon'];
                }
                
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
            } 
            else{
                new_dict = {}
                new_dict['imageSrc'] = element1['images']['icon']
                new_dict['caption'] = element1['type']['displayValue'] + ": " +element1['description']
                images_in_bundle.push(new_dict)
                return true;
            }
        });


        if(element['bundle'] != undefined)
            {
                console.log(images_in_bundle)
                let img = document.createElement("img");
                let nameOfItem = element['bundle']['name']
                let bundleImage = element['bundle']['image']
                img.src = bundleImage 
                itemPrice = element['finalPrice']
                let itemType = "bundle"
                let itemDescription = element['bundle']['info']
                images_in_bundle.unshift({imageSrc : bundleImage, caption : itemDescription})
                if(img.src.includes("null"))
                {
                    img.src = element1['images']['icon'];
                }
                
                img.classList.add("img-edited");

                // Select the carousel container
                const carouselContainer = document.createElement("div")

                // Create the carousel indicators
                const indicators = document.createElement('ol');
                indicators.className = 'carousel-indicators';

                // Create the carousel inner div
                const carouselInner = document.createElement('div');
                carouselInner.className = 'carousel-inner';

                
                // Create an array of slide data
                const slideData = images_in_bundle

                // Loop through the slide data and create carousel items
                slideData.forEach((slide, index) => {
                const indicator = document.createElement('li');
                indicator.setAttribute('data-target', '#myCarousel');
                indicator.setAttribute('data-slide-to', index);
                indicator.className = index === 0 ? 'active' : '';

                const item = document.createElement('div');
                item.className = 'carousel-item';
                if (index === 0) {
                    item.className += ' active';
                }

                const image = document.createElement('img');
                image.src = slide.imageSrc;
                image.alt = slide.caption;
                image.classList.add("img-edited");
                const caption = document.createElement('div');
                caption.className = 'carousel-caption';
                caption.classList.add('text-light');
                caption.classList.add('bg-dark');
                caption.classList.add('h4');
                caption.textContent = slide.caption;

                item.appendChild(image);
                item.appendChild(caption);

                indicators.appendChild(indicator);
                indicators.classList.add("text-white");
                indicators.classList.add("p-2");
                indicators.classList.add("bg-dark");
                carouselInner.appendChild(item);
                });

                // Append indicators and inner div to the carousel container
                carouselContainer.appendChild(indicators);
                carouselContainer.appendChild(carouselInner);

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
                columnBlock.classList.add("col-sm");
                carouselContainer.classList.add("carousel");
                carouselContainer.classList.add("slide");
                carouselContainer.id = "myCarousel";
                carouselContainer.setAttribute('data-ride', 'carousel')

                myCarousel = carouselContainer
                var carousel = new bootstrap.Carousel(myCarousel, {
                    interval: 3500, // Adjust the interval (in milliseconds) for auto-sliding
                  });
                
                  // Add left and right arrow controls
                  var leftArrow = document.createElement('a');
                  leftArrow.className = 'carousel-control-prev';
                  leftArrow.href = '#myCarousel';
                  leftArrow.role = 'button';
                  leftArrow.setAttribute('data-slide', 'prev');
                  leftArrow.classList.add('object-fit-contain')
                
                  var leftArrowIcon = document.createElement('span');
                  leftArrowIcon.className = 'carousel-control-prev-icon';
                  leftArrowIcon.setAttribute('aria-hidden', 'true');
                
                  leftArrow.appendChild(leftArrowIcon);
                  myCarousel.appendChild(leftArrow);
                
                  var rightArrow = document.createElement('a');
                  rightArrow.className = 'carousel-control-next';
                  rightArrow.href = '#myCarousel';
                  rightArrow.role = 'button';
                  rightArrow.setAttribute('data-slide', 'next');

                  var rightArrowIcon = document.createElement('span');
                  rightArrowIcon.className = 'carousel-control-next-icon';
                  rightArrowIcon.setAttribute('aria-hidden', 'true');
                
                  rightArrow.appendChild(rightArrowIcon);
                  myCarousel.appendChild(rightArrow);
                
                  // Function to manually advance the carousel
                  leftArrow.addEventListener('click', function() {
                    carousel.prev();
                  });
                
                  rightArrow.addEventListener('click', function() {
                    carousel.next();
                  });




                columnBlock.appendChild(carouselContainer);

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
                rowBlock.appendChild(columnBlock);
                document.getElementById("cont").appendChild(rowBlock);
                ct++; 
                return true;
            }
       
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
