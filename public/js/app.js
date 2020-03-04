// console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast) 
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

// msgOne.textContent = 'from JavaScript'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value;
    const url = '/weather?address=' + location;

    msgOne.textContent = 'Loading ...'
    msgTwo.textContent = ''
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = data.error
            console.log(data.error)
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast) 
        }
    })
})
    console.log(search.value)
})