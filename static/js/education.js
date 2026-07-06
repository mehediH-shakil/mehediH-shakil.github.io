document.addEventListener("DOMContentLoaded", () => {
    fetch('./static/data/Education.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            let workbook = XLSX.read(data, { type: "array" });
            let education = getSheetData(workbook, 'Education');
            const listContainer = document.getElementById("education-list-container");
            const dotsContainer = document.getElementById("education-dots-container");
            if (!listContainer || !dotsContainer) return;

            let html = "";
            let dotsHtml = "";
            education.forEach(edu => {
                html += `
                <div class="slide">
                  <div class="slide-content">
                    <h4>${edu.institution}</h4>
                    <p><b>${edu.degree}</b></p>
                    <p>${edu.duration}</p>
                    <p>${edu.details}</p>
                  </div>
                </div>`;
                dotsHtml += `<span class="dot"></span>\n`;
            });
            listContainer.innerHTML = html;
            dotsContainer.innerHTML = dotsHtml;
            
            if (typeof showSlides === 'function') {
                slideIndex = 1;
                showSlides(slideIndex);
            }
        })
        .catch(err => console.error(err));
});