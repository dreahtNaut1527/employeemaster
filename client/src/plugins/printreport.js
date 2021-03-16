
function printData(header, data) {
    let docDefinition = {}
    let pdfMake = require('pdfmake/build/pdfmake.js')
    if (pdfMake.vfs == undefined){
        let pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    //content
    console.log(`${header}, ${data}`);
    
    window.open(pdfMake.createPdf(docDefinition).open(), '_blank')
}

export default printData