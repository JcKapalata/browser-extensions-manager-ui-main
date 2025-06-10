import  extensionData  from './data.js';

// Selecteur
const body = document.body;
const buttonTheme = document.querySelector('.theme-toggle');
const filterAll = document.querySelector('.all');
const btnActiveFilter = document.querySelector('#filter-buttons-active');
const filterActiver = document.querySelector('.active')


// fonction pour changer le theme
function changeTheme() {
    buttonTheme.addEventListener('click', () =>{
        const curreTheme = body.getAttribute('data-theme');
        const newTheme = curreTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme)
        
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

        // creation du bouton
        const btn = document.createElement('button');
        btn.className = `${element.name}-btn`;
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        deleteEspaceClassName(btn.className);
        btn.className = deleteEspaceClassName(btn.className);
        btn.innerHTML = `${element.bouton}`;

        //creation d'un div pour input radio
        const divInputRadio = document.createElement('div');
        divInputRadio.className = `${element.name}-input`;
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        deleteEspaceClassName(divInputRadio.className);
        divInputRadio.className = deleteEspaceClassName(divInputRadio.className);
        
        ['true', 'false'].forEach( (val, index) =>{
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = deleteEspaceClassName(divInputRadio.className);
            input.id = `radio-${element.name}-${val}`;
            input.value = val;

            // Cocher si la valeur correspond à element.isActive
            if (String(element.isActive) === val) {
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

// focntion pour le filtrer active
function activeFilter() {

    btnActiveFilter.addEventListener('click', () =>{   
        const inputRadioList = document.querySelectorAll(`input`);  
        filterAll.style.display = 'none';

        //creation de la section
        const section = document.createElement('section');
        // appel de la fonction pour supprimer les espaces dans le nom de la class
        section.className = deleteEspaceClassName(section.className);

        let inputArray = Array.from(inputRadioList);
        
        let inputActiveFilter = inputArray.filter( elementRadio => elementRadio.checked && elementRadio.value == 'false')
        inputActiveFilter.forEach( element => {
            const section = element.closest('section');
            console.log(section);

            // div.className = `divAction`;
            // div.append(btn);
            // div.append(divInputRadio);

             section.innerHTML = `
                <div id="container">
                    <img src="${element.source}" alt="${element.name}">
                    <div>
                        <h2>${element.name}</h2>
                        <p>${element.contenue}</p>
                    </div>
                </div>`
            // const div = document.createElement('div');
            
            // section.append(div);
            filterActiver.append(section)
        })
    })
}

// fonction pour changer le theme
changeTheme();
// Appel de la fonction pour ajouter les extensions
addFilterAll();

// Appel de la fonction pour ajouter le bouton filter all
btnAllfilter();
// Appel de la fonction pour supprimer une extension
removeExtension();
// Appel de la focntion pour le active filter
activeFilter();




