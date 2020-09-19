
const weartherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weartherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value


    if (location) {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent ='' 

        fetch(`/weather?address=${location}`).then((response) =>{
            response.json().then((data) => {
                
                if (data.error) {
                    messageOne.textContent = data.error
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
    }
    

})