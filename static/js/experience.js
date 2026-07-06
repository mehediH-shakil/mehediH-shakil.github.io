document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Experience.xlsx')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.arrayBuffer();
        })
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let companies = getSheetData(workbook, 'Companies');
            let roles = getSheetData(workbook, 'Roles');
            let responsibilities = getSheetData(workbook, 'Responsibilities');
            let environments = getSheetData(workbook, 'Environments');
            
            const container = document.getElementById("experience-list-container");
            if (!container) return;

            let htmlContent = "";
            let lastCompanyId = null;

            roles.forEach(role => {
                let company = companies.find(c => c.id === role.company_id);
                let roleResp = responsibilities.filter(r => r.role_id === role.id);
                let roleEnv = environments.filter(e => e.role_id === role.id);

                let companyHTML = "";
                if (company && company.id !== lastCompanyId) {
                    companyHTML = `<h4>${company.name}</h4>`;
                    lastCompanyId = company.id;
                }
                
                let responsibilitiesHTML = "";
                if (roleResp.length > 0) {
                    let listItems = roleResp.map(r => `<li>${r.description}</li>`).join("");
                    responsibilitiesHTML = `<ul>${listItems}</ul>`;
                }

                let environmentHTML = "";
                if (roleEnv.length > 0) {
                    let markItems = roleEnv.map(e => `<mark>${e.technology}</mark>`).join(" ");
                    environmentHTML = `
                        <p>
                            <b>Environment: </b>
                            ${markItems}
                        </p>
                    `;
                }

                htmlContent += `
                    <div class="col-xs-12 col-print-12 details">
                        ${companyHTML}
                        <p><b>${role.title || ""}</b></p>
                        <p>${role.duration || ""}</p>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-9 col-print-12">
                        ${responsibilitiesHTML}
                        ${environmentHTML}
                    </div>
                `;
            });
            container.innerHTML = htmlContent;
        })
        .catch(err => console.error(err));
});