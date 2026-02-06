// const notesContainer = document.querySelector(".notes-container");
// const createBtn = document.querySelector(".edit");
// const createBtn = document.querySelector(".create-btn");

// let notes= document.querySelectorAll(".input-box")

// function showNotes(){
//     notesContainer.innerHTML =localStorage.getItem("notes")
// }
// showNotes();

// function updateStorage(){
//     localStorage.setItem("notes", notesContainer.innerHTML);
// }




// createBtn.addEventListener("click" ,()=>{
//     let inputBox = document.createElement("p");
//     let img= document.createElement("img");
//     inputBox.className="input-box"
//     inputBox.setAttribute("contenteditable", "true");
//     img.src=  "images/delete.jpg";
//     notesContainer.appendChild(inputBox).appendChild(img);
// })
// notesContainer.addEventListener("click" , function(e){
//     if(e.target.tagName ==="IMG"){
//         e.target.parentElement.remove();
//         updateStorage();
//     }
//     else if(e.target.tagName ==="p"){
//         notes =document.querySelectorAll(".input-box");
//         notes.forEach(nt =>{
//             nt.onkeyup =function(){
//                 updateStorage();
//             }
//         })
//     }
// })
// document.addEventListener("keydown", event =>{
//     if(event.key ==="Enter"){
//         document.execCommand("insertLineBreak");
//         event.preventDefault();
//     }
// })

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create-btn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];


function renderNotes(){
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteEl = document.createElement("p");
    noteEl.className = "input-box";
    noteEl.contentEditable = true;
    noteEl.innerText = note.text;

    const del = document.createElement("img");
    del.src = "images/delete.jpg";

    del.onclick = () => {
      notes.splice(index,1);
      saveNotes();
      renderNotes();
    };

    noteEl.oninput = () => {
      notes[index].text = noteEl.innerText;
      saveNotes();
    };

    noteEl.appendChild(del);
    notesContainer.appendChild(noteEl);
  });
}

function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click", () => {
  notes.push({ text: "" });
  saveNotes();
  renderNotes();

 
  const allNotes = document.querySelectorAll(".input-box");
  allNotes[allNotes.length - 1].focus();
});

renderNotes();

