function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res)=> { return res.json()})
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</otion>`
        }

        
    })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( (res)=> { return res.json()})
    .then( cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</otion>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

    const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //add or remove class with javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    //verificar se existem itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId) //true or false

    //se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item =! itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se nao estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}