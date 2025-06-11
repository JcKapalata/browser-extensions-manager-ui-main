import  extensionData  from './data.js';

// Selecteur
const body = document.body;
const buttonTheme = document.querySelector('.theme-toggle');
const filterAll = document.querySelector('.all');
const btnActiveFilter = document.querySelector('#filter-buttons-active');
const filterActiver = document.querySelector('.active');
const btnInactiveFilter = document.querySelector('#filter-buttons-inactive')
const filterInactiver = document.querySelector('.inactive');


// fonction pour changer le theme
function changeTheme() {
    buttonTheme.addEventListener('click', () =>{
        const curreTheme = body.getAttribute('data-theme');
        const newTheme = curreTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);

        // Changer l'image du button
        const img = document.querySelector('.theme-toggle img');
        const curreImage = img.getAttribute('src');
        const newImage = curreImage === './assets/images/icon-moon.svg' ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
        img.setAttribute('src', newImage);
    })
}

// fonction pour supprimer le espace dans le nom de la class
function deleteEspaceClassName(name) {
    if (name.includes(' ')) {
        let result = name.replaceAll(' ', '');
        return result;
    }else{
        return name;
    }
}

function addFilterAll() {
    extensionData.forEach( element => {
        //creation de la section
        const section = document.createElement('section');
        section.className = `${element.name}`;
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        section.className = deleteEspaceClassName(section.className);
        
        section.innerHTML = `
            <div id="container">
                <img src="${element.source}" alt="${element.name}">
                <div>
                    <h2>${element.name}</h2>
                    <p>${element.contenue}</p>
                </div>
            </div>`
        ActionExtension(section, element)
        filterAll.append(section)
    });
}


// fonction pour supprimer une extension
function removeExtension() {
    const btnRemove = document.querySelectorAll('.divAction button');
    btnRemove.forEach(element => {
        element.addEventListener('click', () => {
            const section = element.closest('section');
            section.remove();
        });
    });
}

// fonction pour afficher le filter all
function btnAllfilter() {
    const btnFilterAll = document.querySelector('#filter-buttons-all');
    
    btnFilterAll.addEventListener('click', () => {
        filterAll.style.display = '';
        filterActiver.style.display = 'none';
        const sections = document.querySelectorAll('#all section');
        sections.forEach(element => {
            element.style.display = 'none';
        });
        // Appel de la fonction pour ajouter les extensions
        addFilterAll();
        // Appel de la fonction pour supprimer une extension
        removeExtension();
    }); 
}

// fonction pour le filtrer active
function optionfilterExtension() {
    // action pour afficher active
    btnActiveFilter.addEventListener('click', () =>{   
        const inputRadioList = document.querySelectorAll(`input`); 
        filterActiver.style.display = ''; 
        filterAll.style.display = 'none';
        filterInactiver.style.display = 'none';
        //Appel de lafonction filterViewsExtension
        filterViewsExtension(inputRadioList, filterActiver, 'false')    
    });

    //action pour afficher inactive
    btnInactiveFilter.addEventListener('click', ()=> {
        const inputRadioList = document.querySelectorAll('input');
        filterInactiver.style.display ='';
        filterAll.style.display = 'none';
        filterActiver.style.display = 'none';
        // Appel de la fonction filterViewsExtension
        filterViewsExtension(inputRadioList, filterInactiver, 'true');
    })
}

// fonction pour filter les extension 
function filterViewsExtension(inputRadio, filterExtension, inputChecked) {
    //creation de la section
    const section = document.createElement('section');
    // appel de la fonction pour supprimer les espaces dans le nom de la class
    section.className = deleteEspaceClassName(section.className);
        
    let inputArray = Array.from(inputRadio);
        
    let inputFilter = inputArray.filter( elementRadio => elementRadio.checked && elementRadio.value == inputChecked)
    filterExtension.innerHTML = ``;
    inputFilter.forEach( element => {
    const section = element.closest('section');

    extensionData.forEach( extension  => {
        if (section.className == deleteEspaceClassName(extension.name)) {
            section.innerHTML = `
                <div id="container">
                    <img src="${extension.source}" alt="${extension.name}">
                    <div>
                        <h2>${extension.name}</h2>
                        <p>${extension.contenue}</p>
                    </div>
                </div>`
            ActionExtension(section, extension);
            filterExtension.append(section);
            }
        })     
    })    
}

// fonction pour gere les action de chacun extension
function ActionExtension(sectionAction, elementAction) {
    // creation du bouton
        const btn = document.createElement('button');
        btn.className = `${elementAction.name}-btn`;
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        deleteEspaceClassName(btn.className);
        btn.className = deleteEspaceClassName(btn.className);
        btn.innerHTML = `${elementAction.bouton}`;

        //creation d'un div pour input radio
        const divInputRadio = document.createElement('div');
        divInputRadio.className = `${elementAction.name}-input`;
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        deleteEspaceClassName(divInputRadio.className);
        divInputRadio.className = deleteEspaceClassName(divInputRadio.className);
        
        ['true', 'false'].forEach( (val, index) =>{
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = deleteEspaceClassName(divInputRadio.className);
            input.id = `radio-${elementAction.name}-${val}`;
            input.value = val;

            // Cocher si la valeur correspond à element.isActive
            if (String(elementAction.isActive) === val) {
                input.checked = true;
                divInputRadio.style.backgroundColor = val === 'true' ? 'hsl(226, 11%, 37%)' : 'hsl(3, 77%, 44%)';
            }
            // Gestion du changement de couleur au clic
            input.addEventListener('change', () => {
                divInputRadio.style.backgroundColor = val === 'true' ? 'hsl(226, 11%, 37%)' : 'hsl(3, 77%, 44%)';
            });

            divInputRadio.appendChild(input);
        })

        const div = document.createElement('div');
        div.className = `divAction`;
        div.append(btn);
        div.append(divInputRadio);
        
        sectionAction.append(div);
}

// fonction pour changer le theme
changeTheme();
// Appel de la fonction pour ajouter les extensions
addFilterAll();

// Appel de la fonction pour ajouter le bouton filter all
btnAllfilter();
// Appel de la fonction pour supprimer une extension
removeExtension();
// Appel de la focntion pour filter active et inactive
optionfilterExtension();




