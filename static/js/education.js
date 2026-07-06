document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Education.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let education = getSheetData(workbook, 'Education');
            const listContainer = document.getElementById("education-list-container");
            if (!listContainer) return;

            let html = "";
            education.forEach(edu => {
                html += `
                <div class="row clearfix layout layout-left">
                    <div class="col-xs-12 col-print-12 details">
                        <h4>${edu.institution}</h4>
                        <p><b>${edu.degree}</b></p>
                        <p>${edu.duration}</p>
                        <p>${edu.details}</p>
                    </div>
                </div>`;
            });
            listContainer.innerHTML = html;
        })
        .catch(err => console.error(err));
});