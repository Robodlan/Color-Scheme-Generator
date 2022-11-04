const colorInput = document.getElementById('color-input')
const mode = document.getElementById('mode-input')
const btn = document.getElementById('btn')
const grid = document.getElementById('grid')
const hexValue = document.getElementById('hex-value')  
const copied = document.getElementById('copied')
var clipboard = new ClipboardJS('.text')  

btn.addEventListener('click', getColor)

function getColor() {
  
     fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${mode.value}`)
        .then(res => res.json())
        .then(data => {
            const postColors = data.colors
            render(postColors)
            copied.style.display = "none"
        })
}


function render(postColors) {
    let html = ''
    for (let color of postColors){
       html += `
         <div class="grid" style="background-color:${color.hex.value}">
           <h2 class="text " data-clipboard-text="${color.hex.value}"><span>${color.hex.value}</span></h2> 
         </div>
        `}
    grid.innerHTML = html
}

clipboard.on('success', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    copied.color = 'red'
 });

 


  clipboard.on('error', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
  });

// function copyNames(postColors) {
//     let copyText = ""
//     let text = color.hex.value
//     for (let names of postColors) {
//      copyText += 
//         names.addEventListener('click', ()=> {
        
//         navigator.clipboard.writeText(`${text}`)
//       })       
//     }

//     grid.innerHTML =  copyText
// }

function randomColor() {
    let result = ''
    const combination = "abcdefghijklm123456789";
    const combLength = combination.length
     for (let i = 0; i < 6; i++){
      result += combination.charAt(Math.floor(Math.random() * combLength[i]))
     }
    return result
  }
  

  function manyColors() {
    const colores  = randomColor();
    colorInput.defaultValue = '#' + colores
    getColor();
  }
  manyColors()


