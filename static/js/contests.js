document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Contests.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let contests = getSheetData(workbook, 'Contests');
            const container = document.getElementById("contests-list-container");
            if (!container) return;

            let html = "";
            contests.forEach(c => {
                html += `<li>${c.description}</li>`;
            });
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});