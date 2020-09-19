// console.log('client side javascript file is loaded')



// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch(url).then((response) =>{
//     response.json().then((data) => {
        
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data)
//         }
//     })
// })

const weartherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript'



weartherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value
    // console.log(location)


    if (location) {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent ='' 

        fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
            response.json().then((data) => {
                
                if (data.error) {
                    messageOne.textContent = data.error
                    // console.log(data.error)
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast.description + `. It is currently ${data.forecast.temp} degrees out. It feels like ${data.forecast.feelslike}. There is a ${data.forecast.precip*100}% chance of rain.`
                    console.log(data)
                }
            })
        })
    
    }
    else {
        messageOne.textContent = 'No Location Provided'
        // console.log('No location provided')
    }
    

})