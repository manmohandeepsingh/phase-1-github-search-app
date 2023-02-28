document.addEventListener("DOMContentLoaded", () => {
  userInput()
});
function userInput(){
  document.querySelector("#github-form").addEventListener("submit", (e) => {
      e.preventDefault()
      gitUser = document.querySelector("#search").value
      findUser(gitUser)
      e.target.reset()
  });
}
function findUser(gitUser){
  fetch(`https://api.github.com/users/${gitUser}`)
      .then(resp => resp.json())
      .then(json => gitUserInfo(json))
}
function gitUserInfo(json){
  const userList = document.querySelector("#user-list")
  const h2 = document.createElement("h2")
  h2.innerText = `${json.login}`
  const img = document.createElement("img")
  img.setAttribute("src", `${json.avatar_url}`)
  const a = document.createElement("a");
  a.setAttribute("target", "_blank")
  a.setAttribute("href", `https://github.com/${json.login}`)
  a.innerText = img
  const btn = document.createElement("button")
  btn.setAttribute("id", `${json.login}`)
  btn.innerText = "Repositories"
  btn.addEventListener("click", () => {
    fetch(`https://api.github.com/users/${json.login}/repos`)
      .then(resp => resp.json())
      .then(json => repoInfo(json))
})
const usr = document.createElement("userList");
usr.append(h2, img, btn);
userList.appendChild(usr);
}
function repoInfo(json){
  const userList2 = document.querySelector("#repos-list")
  repositoryNames = []
  for (const info of json) {
    const p = document.createElement("p")
    p.innerText = (info.name)
    userList2.append(p)
  }
}
