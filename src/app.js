import  extensionData  from './data.js';

// Selecteur du filterAll
const filterAll = document.querySelector('.all');


function addFilterAll() {
    extensionData.forEach( element => {
        //creation de la section
        const section = document.createElement('section');
        section.className = `${element.name}`;
        // condition pour supprimer les espaces dans le nom de la class s' il existe
        if (section.className.includes(' ')) {
            let result = section.className.replaceAll(' ', '');
            section.className = result;
        }

        // creation du bouton
        const btn = document.createElement('button');
        btn.className = `${element.name}`;
        // condition pour supprimer les espaces dans le nom de la class s' il existe
        if (btn.className.includes(' ')) {
            let result = btn.className.replaceAll(' ', '');
            btn.className = result;
        }
        btn.innerHTML = `${element.bouton}`;

        const div = document.createElement('div');
        div.className = `divAction`;
        div.append(btn);
        
        section.innerHTML = `
            <div id="container">
                <img src="${element.source}" alt="${element.name}">
                <div>
                    <h2>${element.name}</h2>
                    <p>${element.contenue}</p>
                </div>
            </div>`
        section.append(div);
        filterAll.append(section)
    });
}


// fonction pour supprimer une extension
function removeExtension() {
    const btnRemove = document.querySelectorAll('.divAction button');
    btnRemove.forEach(element => {
        element.addEventListener('click', () => {
            console.log(element.className);
            const section = document.querySelector(`.${element.className}`);
            section.remove();
        });
    });
}

// fonction pour afficher le filter all
function btnAllfilter() {
    const btnFilterAll = document.querySelector('#filter-buttons-all');
    
    btnFilterAll.addEventListener('click', () => {
        const sections = document.querySelectorAll('#all section');
        sections.forEach(element => {
            console.log(element.className);
            element.style.display = 'none';
        });
        // Appel de la fonction pour ajouter les extensions
        addFilterAll();
        // Appel de la fonction pour supprimer une extension
        removeExtension();
    });
//     
}

// Appel de la fonction pour ajouter les extensions
addFilterAll();

// Appel de la fonction pour ajouter le filter all
btnAllfilter();

// Appel de la fonction pour supprimer une extension
removeExtension();




