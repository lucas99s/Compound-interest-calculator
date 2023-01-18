var entry = document.getElementById("entry")
entry.addEventListener("click", setValues)

let cor1 = 'rgba(0, 223, 45, 1)'
let cor2 = 'rgba(28, 42, 92,1)'
let corTransparente1 = 'rgba(0, 223, 45, 0.2)'
let corTransparente2 = 'rgba(28, 42, 92, 0.2)'

const ctx = document.getElementById('myChart').getContext("2d");
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: meses = ['Meses'],
        datasets: [{
            label: 'Acumulo do mês',
            data: [0],
            backgroundColor: [
                corTransparente1
            ],
            borderColor: [
                cor1
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

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

    if(document.getElementById('meses').value == '') {
        resetTable(false)
    } else {
        resetTable(true)
    }

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
    grafico(acumuloTotalArr, meses)

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
function grafico(acumuloTotalArr, meses) {
    let tempo = []
    for(i = 0; i < meses; i++){
        tempo[i] = i + 1
    }
    if(tempo.length == 0) {
        tempo[0] = 'Meses'
    }
    myChart.destroy()
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tempo,
            datasets: [{
                label: 'Acumulo do mês',
                data: acumuloTotalArr,
                backgroundColor: [
                    corTransparente1,
                    corTransparente2
                ],
                borderColor: [
                    cor1,
                    cor2
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('reset').addEventListener('click', function(){
    grafico(0, 0)
    resetTable(false)
    document.getElementById('valorInicial').value = ''
    document.getElementById('investimentoMensal').value = ''
    document.getElementById('juros').value = ''
    document.getElementById('meses').value = ''
    document.getElementById('valorTotal').innerText = 'R$0.00'
    document.getElementById('valorInvestido').innerText = 'R$0.00'
    document.getElementById('jurosTotais').innerText = 'R$0.00'
})

function resetTable(cond) {
    let novoCalculo = cond

    document.getElementById('display').innerHTML = `
    <tr>
        <th class="table-th-1">Mês</th>
        <th class="table-th-2">Juros do mês</th>
        <th class="table-th-3">Juros acumulado</th>
        <th class="table-th-4">Total investido</th>
        <th class="table-th-5">Total acumulado</th>
    </tr>`

    if(novoCalculo == false) {
        document.getElementById('display').innerHTML += `
        <tr style="background-color: white;">
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
            <td> 0 </td>
        </tr>
        `
    } 
}