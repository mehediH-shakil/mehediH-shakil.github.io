document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Research.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let interests = getSheetData(workbook, 'Interests');
            let thesis = getSheetData(workbook, 'Thesis');
            let publications = getSheetData(workbook, 'Publications');
            
            const container = document.getElementById("research-list-container");
            if (!container) return;

            let html = '<h2>Research Interest </h2><p>';
            if (interests.length > 0 && interests[0].interests) {
                html += interests[0].interests.split('|').map(i => `<mark>${i.trim()}</mark>`).join(" ");
            }
            html += '</p>';

            if (thesis.length > 0) {
                let t = thesis[0];
                html += `
                <h2 style="padding-top: 5%;">Undergraduate Thesis</h2>
                <p style="padding-top: 2%;"><b>Title: </b>${t.title}</p>
                <div class="row clearfix layout layout-left">
                    <div class="col-xs-6 col-sm-4 col-md-5 col-print-12 details">
                        <p><mark>Supervisor</mark><br></p>
                        <p style="font-style: italic;">
                            <b>${t.supervisor_name}<br>${t.supervisor_role},</b>
                            ${t.supervisor_dept}<br>
                            <b>Email: </b>
                            <a href="mailto:${t.supervisor_email_1}" target="_blank">${t.supervisor_email_1}</a>
                            , <a href="mailto:${t.supervisor_email_2}" target="_blank">${t.supervisor_email_2}</a>
                        </p>
                    </div>
                </div>`;
            }

            if (publications.length > 0) {
                html += '<h2 style="padding-top: 5%;">Publications </h2><p><ol style="font-size: medium;">';
                publications.forEach(pub => {
                    html += `
                    <li>
                        ${pub.authors}
                        <b>"${pub.title}"</b>
                        ${pub.publisher}
                    </li>`;
                });
                html += '</ol></p>';
            }
            container.innerHTML = html;
        })
        .catch(err => console.error(err));
});