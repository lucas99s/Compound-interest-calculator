var entry = document.getElementById("entry")
entry.addEventListener("click", setValues)

function setValues() {
    let q = Number(document.getElementById('valorInicial').value)
    let w = Number(document.getElementById('investimentoMensal').value)
    let e = Number(document.getElementById('juros').value)
    let r = Number(document.getElementById('meses').value)
    let t = document.getElementById('valorTotal')
    let y = document.getElementById('valorInvestido')
    let u = document.getElementById('jurosTotais')
    calcular(q, w, e, r, t, y, u)
}

function calcular(valorInicial, investimentoMensal, juros, meses, valorTotal, valorInvestido, jurosTotais) {
    let acumuloTotal = valorInicial
    let totalInvestido = valorInicial
    let totalJuros = Number()
    let dividendo = Number()
    let jurosAcumuladoArr = []
    let acumuloTotalArr = []
    let totalInvestidoArr = []
    let dividendoMesArr = []

    for(i = 0; i < meses; i++) {
        dividendo = acumuloTotal * juros / 100
        dividendoMesArr[i] = dividendo.toFixed(2)

        if(jurosAcumuladoArr.length < 1) {
            jurosAcumuladoArr[i] = dividendo
        } else {
            jurosAcumuladoArr[i] = dividendo + jurosAcumuladoArr[i - 1]
        }
        
        acumuloTotal += dividendo + investimentoMensal
        acumuloTotalArr[i] = acumuloTotal.toFixed(2)
        
        totalInvestido += investimentoMensal
        totalInvestidoArr[i] = totalInvestido.toFixed(2)
        
        totalJuros += dividendo

        // listaMesesArr[i] = `Mes ${i} : ${acumuloTotal.toFixed(2)}`
    }
    valorTotal.innerHTML = "R$" + acumuloTotal.toFixed(2)
    valorInvestido.innerHTML = "R$" + totalInvestido.toFixed(2)
    jurosTotais.innerHTML = "R$" + totalJuros.toFixed(2)

    lista()
    
    function lista() {
        let linha = 1
    
        for (i = 0; i < meses; i++) {
            let display = document.getElementById('display')
            
            let novaLinha = display.insertRow(linha)
    
            let cell1 = novaLinha.insertCell(0)
            let cell2 = novaLinha.insertCell(1)
            let cell3 = novaLinha.insertCell(2)
            let cell4 = novaLinha.insertCell(3)
            let cell5 = novaLinha.insertCell(4)
    
            cell1.innerHTML = i + 1
            cell2.innerHTML = dividendoMesArr[i]
            cell3.innerHTML = jurosAcumuladoArr[i].toFixed(2)
            cell4.innerHTML = totalInvestidoArr[i]
            cell5.innerHTML = acumuloTotalArr[i]

            linha++
        }
    }
}