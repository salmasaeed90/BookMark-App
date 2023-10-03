var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submit");
var updatetBtn = document.getElementById("update");
var uiBody = document.getElementById("tableBody");
// empty arr to push new url
var websitesArr;
var mainIndex = 0;
//check if localstorage is empty or not
if (localStorage.getItem("url") == null) {
  websitesArr = [];
} else {
  //get data from storage and then show it in ui
  websitesArr = JSON.parse(localStorage.getItem("url"));
  showData(websitesArr);
}

//create new website
submitBtn.onclick = function () {
  if (submitBtn.innerHTML == "Update") {
    submitBtn.innerHTML = "Submite";
    var websitesObj = {
      webName: siteName.value,
      webUrl: siteURL.value,
    };
    websitesArr.splice(mainIndex, 1, websitesObj);
  } else {
    var websitesObj = {
      webName: siteName.value,
      webUrl: siteURL.value,
    };
    websitesArr.push(websitesObj);
  }
  localStorage.setItem("url", JSON.stringify(websitesArr));
  showData(websitesArr);
  emptyInput();

  // for (let i = 0; i < websitesArr.length; i++) {
  //   if (websitesArr[i].webName === siteName.value) {
  //     // if (validationbokmrk() == true) {

  //     // } else {
  //     //   // Swal.fire("Any fool can use a computer");
  //     //   alert("enter valid name and url");
  //     // }
  //   } else {
  //     break;
  //   }
  // }
};

//show data in app

function showData(arr) {
  var trs = "";
  for (var i = 0; i < arr.length; i++) {
    trs += `  <tr>
    <td>${i + 1}</td>
    <td>${arr[i].webName}</td>
    <td>
        <button class="btn btn-outline-warning" id='visiturl' >
        
        <a href='${arr[i].webUrl}' target="_blank">
            Visit
            <i class="fa-solid fa-edit"></i>
        </a>
        </button>
    </td>
    <td>
    <button onclick="updatebookmark(${i})" class="btn text-center text-white bg-info" id="update">
          Update
        </button>
        </td>
    <td>

        <button class="btn btn-outline-danger" id="deleturl" onclick="deletdata(${i})">
            Delete
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>
    </tr>`;
  }
  uiBody.innerHTML = trs;
}
//delete url function
function deletdata(i) {
  websitesArr.splice(i, 1);
  localStorage.setItem("url", JSON.stringify(websitesArr));
  showData(websitesArr);
}

//function to reset inputs
function emptyInput() {
  siteName.value = "";
  siteURL.value = "";
}
// update data function

function updatebookmark(i) {
  siteName.value = websitesArr[i].webName;
  siteURL.value = websitesArr[i].webUrl;
  submitBtn.innerHTML = "Update";
  mainIndex = i;
}

///search url function

function search(term) {
  var searchResautl = [];
  for (let i = 0; i < websitesArr.length; i++) {
    if (websitesArr[i].webName.toLowerCase().includes(term)) {
      searchResautl.push(websitesArr[i]);
    }
  }
  showData(searchResautl);
}

//validation
function isNameValid() {
  var nameRegax = /^[A-Za-z_]{1,}$/;
  if (nameRegax.test(siteName.value)) {
    return true;
  } else {
    return false;
  }
}

function isUrlValid() {
  var urlRegex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-z]{3}$/;

  if (urlRegex.test(siteURL.value)) {
    return true;
  } else {
    return false;
  }
}

siteName.onkeyup = function () {
  if (isNameValid() && isUrlValid()) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.disabled = "true";
  }
};

siteURL.onkeyup = function () {
  if (isNameValid() && isUrlValid()) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.disabled = "true";
  }
};
