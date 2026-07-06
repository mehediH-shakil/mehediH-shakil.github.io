document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Projects.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let projects = getSheetData(workbook, 'Projects');
            const container = document.getElementById("projects-list-container");
            if (!container) return;

            let html = "";
            projects.forEach(proj => {
                let techItems = proj.technologies ? proj.technologies.split('|').map(t => `<mark>${t.trim()}</mark>`).join(" ") : "";
                html += `
                <div class="row clearfix layout layout-left">
                    <div class="col-xs-12 col-sm-4 col-md-3 col-print-12 details">
                        <h4>${proj.name}</h4>
                        <p><b>${proj.subtitle}</b></p>
                        <p>${proj.year}</p>
                        <p style="font-style: italic; font-size: 12px;">${proj.date || ""}</p>
                        ${proj.link ? `
                        <p class="no-print aditional-links">
                            <a href="${proj.link}" target="_blank">
                                <i class="fab fa-github" title="GitHub"></i>
                            </a>
                        </p>` : ""}
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-9 col-print-12 content">
                        <p>${proj.description}</p>
                        <p><b>Technologies: </b>${techItems}</p>
                    </div>
                </div>`;
            });
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});