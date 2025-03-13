// Get all users
function httpGet(){
    var url  = "https://reqres.in/api/users?page=1";
    var xhr  = new XMLHttpRequest();
    xhr.open('GET', url, true)
    //xhr.readystatechange = function () {
    //https://teamtreehouse.com/community/xhronreadystatechange-vs-xhronload
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        let  userCard = '';
        const content = document.getElementById('continut');
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users.data);
            let myUsers = users.data;
            for(let i = 0; i < myUsers.length; i++){
                userCard +=`    
                <div class="feature col">
            <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="${myUsers[i].avatar}" style="max-width:200px">
            </div>
            <h3 class="fs-2 text-body-emphasis">${myUsers[i].first_name} ${myUsers[i].last_name}</h3>
            <p>${myUsers[i].email}</p>
            <a href="${myUsers[i].avatar}" class="icon-link">
              Call to action
              <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
            </a>
          </div>
                `

            }
            content.innerHTML = userCard;
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
    }
    