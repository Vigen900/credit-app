function submitForm(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    

    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.get('name'),
            interest: data.get('interest'),
            duration: data.get('duration'),
            maximal: data.get('maximal'),
            isCorporate: data.get('clientType') === 'business',
        })
    }).then((res) => {
        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
         toastBootstrap.show()
         })
        }
