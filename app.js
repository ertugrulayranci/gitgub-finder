import Github from "./github.js";
import UI from "./ui.js";

//github ve ui class larının nir örneğini oluşturma
const github = new Github();
const ui = new UI();

//htmlden çektik

const searchUser = document.getElementById("search-user");
const searchButton = document.getElementById("search-button");

//eğer ara butonuna tıklanırsa
searchButton.addEventListener("click", getInput);
//eğer enter tuşuna tıklanırsa
searchUser.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    getInput();
  }
});
function getInput() {
  //eğer inputun içi doluysa api isteği at
  if (searchUser.value !== "") {
    github.getUser(searchUser.value).then((data) => {
      //eğer gelen verideki mesaj bulunamadı ise
      if (data.profile.message === "Not Found") {
        //hata mesajı göster
        ui.showAlert("Aradığınız kullanıcı bulunamadı", "alert alert-danger");
      } else {
        //kullanıcıyı göster
        ui.showAlert("Kullanıcı başarıyla bulundu", "alert alert-success");
        //kullanıcıyı göster
        ui.showProfile(data.profile);
        //projelerini göster
        ui.showRepos(data.repos);
      }
    });
  } else {
    //eğer input boşsa uyarı ver.
    ui.showAlert("form alanı boş olamaz", "alert alert-info");
    ui.clearProfile();
  }
  searchUser.value = "";
}
//thema

const themaBTN = document.getElementById("thema");
themaBTN.addEventListener("click", changeThema);
function changeThema() {
  const body = document.querySelector("body");
  body.classList.toggle("bg-dark");
  body.classList.toggle("text-bg-dark");

  if (body.classList.contains("bg-dark")) {
    themaBTN.innerText = "Açık Mod";
  } else {
    themaBTN.innerText = "Koyu Mod";
  }
}

//github oauth register'dan kaydoluyoruz
