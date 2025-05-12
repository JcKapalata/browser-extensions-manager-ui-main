import  extensionData  from './data.js';

// Selecteur du filterAll
const filterAll = document.querySelector('.all');

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
                divInputRadio.style.backgroundColor = val === 'true' ? 'hsl(226, 25%, 17%)' : 'hsl(3, 77%, 44%)';
            }
            // Gestion du changement de couleur au clic
            input.addEventListener('change', () => {
                divInputRadio.style.backgroundColor = val === 'true' ? 'hsl(226, 25%, 17%)' : 'hsl(3, 77%, 44%)';
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


// Appel de la fonction pour ajouter les extensions
addFilterAll();

// Appel de la fonction pour ajouter le bouton filter all
btnAllfilter();

// Appel de la fonction pour supprimer une extension
removeExtension();





