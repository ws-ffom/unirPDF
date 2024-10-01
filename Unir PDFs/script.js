document.getElementById('mergeBtn').addEventListener('click', async function () {
    const inputElement = document.getElementById('pdfs');
    const files = inputElement.files;

    if (files.length === 0) {
        alert('Por favor, selecione pelo menos dois PDFs.');
        return;
    }

    // Carregar os PDFs usando PDF-lib
    const pdfDoc = await PDFLib.PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const existingPdfBytes = new Uint8Array(arrayBuffer);
        const existingPdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        const copiedPages = await pdfDoc.copyPages(existingPdfDoc, existingPdfDoc.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    // Salvar o PDF unificado
    const mergedPdfBytes = await pdfDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

    // Criar link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    link.click();
});
