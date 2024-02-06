const colorInput = document.getElementById('color-input');
const body = document.getElementById('body');
const mode = document.getElementById('mode-input');
const btn = document.getElementById('btn');
const grid = document.getElementById('grid');
const hexValue = document.getElementById('hex-value');
const copy = document.getElementById('copied');  


const clipboard = new ClipboardJS('#text')  


btn.addEventListener('click', (e)=> {
   e.preventDefault()
   getColor()
})

function getColor() {
   fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${mode.value}`)
        .then(res => res.json())
        .then(data => {
            const postColors = data.colors
            render(postColors)
        })
  }

function render(postColors) {
    let html = ''
    for (let color of postColors){
       html += `
         <div class="grid" style="background-color:${color.hex.value}">
           <h3 id="text" class="text" onclick="clicked()" data-clipboard-text="${color.hex.value}"><span>${color.hex.value}</span></h3> 
         </div>
        `}
   grid.innerHTML = html
}

clipboard.on('success', function (e) {
  // text.innerHTML = (`${e.action} ${e.text}`)
    copy.innerHTML = (`${e.action} ${e.text}`)
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    setTimeout(copy.textContent = "", 6000);
  });

// clipboard.on('error', function (e) {
//     console.info('Action:', e.action);
//     console.info('Text:', e.text);
//     console.info('Trigger:', e.trigger);
//   });

function randomColor() {
    const combination = "abcdefg0123456789";
    let result = '';
    const combLength = combination.length;
    for (let i = 0; i < 6; i++){
      result += combination.charAt(Math.floor(Math.random() * combLength))
     }
  return result
}
  
function manyColors() {
    const colores  = randomColor();
    colorInput.defaultValue = '#' + colores
    body.style.backgroundColor = '#' + colores
    getColor();
}

 manyColors()
 const timeOut = () => {
   setTimeout(copy.textContent = "YAaaaa", 10000);
};

  

