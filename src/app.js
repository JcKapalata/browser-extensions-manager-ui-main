import  extensionData  from './data.js';

// Selecteur du filterAll
const filterAll = document.querySelector('.all');


function addFilterAll() {
    extensionData.forEach( element => {
        const section = document.createElement('section');
        const btn = document.createElement('button');
        section.className = `${element.name}`;
        section.innerHTML = `
            <div>
                <h2>${element.name}</h2>
            </div>
            <div>
                <p>${element.contenue}</p>
            </div>
            <div>
                <button> ${element.bouton}</button>
            </div>`
        filterAll.append(section)
    });
}
addFilterAll();

// selecteur du section extension
const sectionDevLens = document.querySelector('.DevLens');
console.log(sectionDevLens.innerText);

