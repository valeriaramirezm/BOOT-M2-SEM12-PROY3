export const createChart = (ctx, datos, etiquetas) => {
const existingChart = Chart.getChart("myChart");

    if (existingChart) {
        existingChart.destroy();
    }

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: "Producto por precio en Dolares",
                    data: datos,
                    borderWidth: 1,
                    backgroundColor: [
                        "rgba(54, 187, 217, 1)",
                        "rgba(217, 65, 136, 1)",
                        "rgba(125, 125, 125, 1)",
                        "rgba(0, 0, 0, 1)",
                        "rgba(191, 10, 109, 1)",
                    ],
                    borderColor: [
                        "rgb(0, 176, 217)",
                        "rgb(182, 65, 136)",
                        "rgb(122, 122, 122)",
                        "rgb(0, 0, 0)",
                        "rgb(178, 1, 98)",
                    ],
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};
