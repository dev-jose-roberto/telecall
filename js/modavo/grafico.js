const legendas = [
    'TeleMarketing',
    'Operadoras',
    'Serviços de Investimento',
    'Fraudes',
];

const data = {
    labels: legendas,
    datasets: [{
        backgroundColor: [
            'whitesmoke',
            'lightgray',
            'gray',
            '#cf1616'
        ],
        borderColor: "transparent",
        data: [4, 6, 42, 48],
        hoverOffset: 10
    }, ]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {
        cutout: '80%',
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
};

const grafico = new Chart(document.getElementById('grafico'), config);