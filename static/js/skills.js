document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Skill.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let skills = getSheetData(workbook, 'Skills');
            const container = document.getElementById("skills-list-container");
            if (!container) return;

            let html = '<div class="col-xs-12 col-print-12 details"></div><div class="col-xs-12 col-sm-8 col-md-9 col-print-12">';
            skills.forEach(skill => {
                let items = skill.items ? skill.items.split('|').map(i => `<mark>${i.trim()}</mark>`).join(" ") : "";
                html += `<p><b>${skill.category}: </b> ${items}</p>`;
            });
            html += '</div>';
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});