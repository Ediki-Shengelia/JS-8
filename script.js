let divUser = document.getElementById("divClass");
let btnprev = document.querySelector(".loadprev");
let btnmore = document.querySelector(".loadmore");
let currentPage = 1;
let ulList = document.getElementById("list");
let totalPages;
function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (JS) {
      const fragment = document.createDocumentFragment();
      JS.data.forEach((element) => {
        let li = document.createElement("li");
        let image = document.createElement("img");
        image.setAttribute("src", element.avatar);

        li.innerText = `${element.first_name}  ${element.last_name}`;

        fragment.appendChild(li);
        fragment.appendChild(image);
      });
      ulList.innerHTML = " ";
      ulList.appendChild(fragment);
      totalPages = JS.total_pages;
    })
    .catch(function (error) {
      if ((error = 404)) {
        let p = document.createElement("p");
        p.innerText = "server error";
        divUser.appendChild(p);
      }
    });
}
btnprev.addEventListener("click", function () {
  if (currentPage === 1) {
    btnprev.classList.add("prev-none");
    btnmore.classList.remove("more-none");
    return;
  }
  currentPage--;
  getUsers(currentPage);
});
btnmore.addEventListener("click", function () {
  if (currentPage === totalPages) {
    btnprev.classList.remove("prev-none");
    btnmore.classList.add("more-none");
    return;
  }
  currentPage++;
  getUsers(currentPage);
});

getUsers(currentPage);
