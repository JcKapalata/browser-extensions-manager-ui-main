import  extensionData  from './data.js';

// Selecteur du filterAll
const filterAll = document.querySelector('.all');


function addFilterAll() {
    extensionData.forEach( element => {
        const section = document.createElement('section');
        const btn = document.createElement('button');
        section.className = `${element.name}`;
        if (section.className.includes(' ')) {
            let result = section.className.replaceAll(' ', '');
            section.className = result;
            console.log(result);
            
        }
        section.innerHTML = `
            <div id="container">
                <img src="${element.source}" alt="${element.name}">
                <div>
                    <h2>${element.name}</h2>
                    <p>${element.contenue}</p>
                </div>
            </div>
            <div id="btn">
                <button> ${element.bouton}</button>
            </div>`
        filterAll.append(section)
    });
}
addFilterAll();

// selecteur du section extension
const sectionDevLens = document.querySelector('.MarkupNotes');
console.log(sectionDevLens);

