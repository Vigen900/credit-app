    
var queryString = location.search
let params = new URLSearchParams(queryString)
const id = params.get('credit')

fetch(`http://localhost:3000/${id}`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    },
                    
})
.then(res => res.json())    
.then((res) => {
   document.querySelector('input[name="name"]').value = res.name;
   document.querySelector('input[name="interest"]').value = res.interest;
   document.querySelector('input[name="duration"]').value = res.duration;
   document.querySelector('input[name="maximal"]').value = res.maximal;
   document.querySelector('input[name="clientType"]').value = res.isCorporate?"business":"person";
    
    console.log(res);
});
         
function submitForm(event) {

    event.preventDefault();
    
    const data = new FormData(event.target);

    fetch(`http://localhost:3000/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.get('name'),
            interest: data.get('interest'),
            duration: data.get('duration'),
            maximal: data.get('maximal'),
            isCorporate: data.get('clientType') === 'business',
        })           
    })
    .then(res => res.json())    
    .then((res) => {
        const toastLiveExample = document.getElementById('liveToast')                
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)                   
        toastBootstrap.show()
    });
}
