//Obter os elementos da página HTML
const frm = document.querySelector('form');
const dvQuadro = document.getElementById('divQuadro');
frm.addEventListener("submit", (e) => {
    e.preventDefault(); //evita o envio do formulário 

    console.log("Submit ok");
    const tarefa = frm.inTarefa.value; //obtem o conteudo digitado

    const h5 = document.createElement("h5");
    const texto = document.createTextNode(tarefa);
    h5.appendChild(texto); //define que o texto será filho de h5
    dvQuadro.appendChild(h5); //define que h5 será filho de divQuadro
    
    frm.inTarefa.value = "";
    frm.inTarefa.focus();

})

frm.btSelecionar.addEventListener("click", () => {
    const tarefas = document.querySelectorAll("h5");
    
    console.log(tarefas);

    if (tarefas.length == 0){
        alert("Não há tarefas para selecionar!!")
        return
    }    
    let aux = -1; //para indicar linha selecionada 
    //percorer a lista de elementos h5 inserida  na página, as tarefas
    for (let i = 0; i < tarefas.length; i++){
        //se a tag selecionada - a class tarefa selecionada deve ser utilizada
        if(tarefas[i].className == "tarefa-selecionada"){
            tarefas[i].className = "tarefa-normal"
            aux=i;
            break;

        }
            
    }
    //se a linha selecionada for a ultima
    if (aux == tarefas.length -1){
        aux= -1;
    }
    tarefas[aux + 1].className = "tarefa-selecionada"; // muda o estilo da próxima linha;

})

frm.btRetirar.addEventListener("click", () => {

    const tarefas = document.querySelectorAll("h5");
    let aux = -1;

    //percorre a lista das tarefas inseridas
    tarefas.forEach((tarefa, i) => {
        if (tarefa.className == "tarefa-selecionada"){
            aux = i;
        }
    })
    if (aux == -1) {
        alert("Selecione uma tarefa para removê-la...");
        return;
    }

    //solicitar a confirmação para remoção:
    if (confirm(`Confirma a exclusão de "${tarefas[aux].innerText}?"`)){
        dvQuadro.removeChild(tarefas[aux]);
    }
})

frm.btGravar.addEventListener("click", () => {
    const tarefas = document.querySelectorAll("h5");

    if (tarefas.length == 0){
        alert("Não há tarefas a serem salvas...");
    }

    let dados = "";//string para acumular os dados

    tarefas.forEach(tarefa => {
        dados += tarefa.innerText + ";";
    })

    //gravar no localStorage
    localStorage.setItem("tarefasDia", dados.slice(0, -1));

    if (localStorage.getItem("tarefasDia")){
        alert("ok! Tarefas salvas");
    }
})

window.addEventListener("load", () => {
    if (localStorage.getItem("tarefasDia")){
        const dados = localStorage.getItem("tarefasDia").split(";");

        dados.forEach(dado => {
            const h5 = document.createElement("h5");
            const text = document.createTextNode(dado)
            h5.appendChild(texto);
            dvQuadro.appendChild(h5);
        })
    }
})