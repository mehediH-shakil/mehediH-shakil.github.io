document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Training.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let trainings = getSheetData(workbook, 'Training');
            const container = document.getElementById("training-list-container");
            if (!container) return;

            let html = "";
            trainings.forEach(t => {
                html += `<li style="padding-bottom: 1%;">${t.description}</li>`;
            });
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});