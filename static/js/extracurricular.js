document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Extracurricular.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let extracurriculars = getSheetData(workbook, 'Extracurricular');
            const container = document.getElementById("extracurricular-list-container");
            if (!container) return;

            let html = "";
            extracurriculars.forEach(extra => {
                let detailsHtml = "";
                if (extra.details) {
                    let items = extra.details.split('|').map(d => `<li>${d.trim()}</li>`).join("");
                    detailsHtml = `<ul>${items}</ul>`;
                }
                html += `
                <div class="row clearfix layout layout-left">
                    <div class="col-xs-12 col-print-12 details">
                        <h4>${extra.role}</h4>
                        <p><b>${extra.organization}</b></p>
                        <p>${extra.duration}</p>
                    </div>
                    ${detailsHtml}
                </div>`;
            });
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});