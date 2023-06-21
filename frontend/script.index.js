let credits = [];

fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(receivedCredits => {
        credits = receivedCredits;
        init();
    });


function init() {
    // ստուգում ենք արդյոք կան պահպանված տվյալներ
    if (localStorage.getItem('interestRate')) {
        boxes.innerHTML = ''; // ջնջում է վարկատեսակները էկրանից
        /* ֆիլտրում է վարկատեսակները ըստ պահպանված ֆիլտերների */
        credits
            .filter(function(credit) {
                return credit.duration <= +localStorage.getItem('duration') && credit.interest <=
                +localStorage.getItem('interestRate') && credit.maximal <= +localStorage.getItem('maximal') &&
                localStorage.getItem('clientType') && credit.isCorporate == (localStorage.getItem('clientType') == 'business')  
            })
            .forEach (function (credit){
               appendCredit(boxes, credit);
            });
    } else {
        /* բոլոր վարկատեսակները արտացոլում ենք էկրանին */
        credits.forEach (function (credit){
            appendCredit(boxes, credit);
        });
    }

    /* հայտարարում ենք գլոբալ փոփոխական formData */
    let formData;
    /* Կիրառել սեղմելուց կանչվում է */
    
}

function appendCredit(boxes, credit) {
    boxes.innerHTML = boxes.innerHTML + `        
        <div class="card" style="width: 250px;" id = "${credit._id}">
            <div class="card-body">
                <h5 class="card-title">${credit.name}</h5>
                <div class="card-text">
                    <ul class="list-group list-group-flush">  
                        <li class="list-group-item">Ժամկետ։ <b>${credit.duration}</b></li>
                        <li class="list-group-item">Տոկոսադրույք։ <b>${credit.interest}%</b></li>
                        <li class="list-group-item">Մաքսիմալ գումար։ <b>${credit.maximal}</b></li>
                        <li class="list-group-item">Հաճախորդի տեսակ։ <b>${credit.isCorporate ? 'Իրավաբանական': 'Ֆիզ․ անձ'}</b></li>            
                    </ul>
                </div>
                <button onclick="deleteCredit('${credit._id}')" type="button" class="btn btn-danger"> Ջնջել</button>
                <a href="/edit.html?credit=${credit._id}" type="button" class="btn btn-warning"> Խմբագրել</a>
            </div>
        </div>`
}

function deleteCredit(id) {
    fetch('http://localhost:3000/'+ id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }                
            }).then((res) => {  
                document.getElementById(id).remove()              
                const toastLiveExample = document.getElementById('liveToast')                
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)                   
                 toastBootstrap.show()                 
                })
            }
    


function submitForm(event) {
    event.preventDefault(); // կանխում ենք էջի թարմացումը (ռեֆռեշը)
    localStorage.clear(); // մաքրում է ամբողջությամբ պահպանված տվյալները
    /* ֆորմաից վերցնում է բոլոր արժեքները */
    formData = new FormData(event.target)
    const duration = formData.get('duration');
    const interestRate = formData.get('interest-rate');
    const maximal = formData.get('maximal');
    const clientType = formData.get('clientType');

    boxes.innerHTML = ''; // ջնջում է վարկատեսակները էկրանից
    /* ֆիլտրում է վարկատեսակները ըստ ընտրված ֆիլտերների */
    credits
        .filter(function(credit) {
            return credit.duration <= duration && credit.interest <=
            interestRate && credit.maximal <= maximal &&
            credit.isCorporate == (clientType == 'business')  
            
        })
        .forEach (function (credit){
           appendCredit(boxes, credit);
        });
}


function saveData() {
    const duration = formData.get('duration');
    const interestRate = formData.get('interest-rate');
    const maximal = formData.get('maximal');
    const clientType = formData.get('clientType');
    // պահպանում է բրաուզերի հիշողության մեջ
    localStorage.setItem('interestRate',interestRate);
    localStorage.setItem('duration',duration);
    localStorage.setItem('maximal',maximal);
    localStorage.setItem('clientType',clientType);
}

