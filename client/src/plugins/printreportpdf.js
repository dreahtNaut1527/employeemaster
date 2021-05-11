// import imageToBase64 from 'image-to-base64/browser'

function printData(header, data) {
    let headerFields = []
    let detailsBody = []
    let docDefinition = {}
    let pdfMake = require('pdfmake/build/pdfmake.js')
    if (pdfMake.vfs == undefined){
        let pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    // let image = null
    // imageToBase64(`${this.photo}/33959.jpg`).then(res => {
    //     image = `data:image/jpeg;base64,${res}`
    // })

    // Format headers
    header.forEach(rec => {
        headerFields.push({
            text: rec.value,
            style: 'tableHeader'
        })
    })

    //content
    docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [ 40, 60, 40, 60 ],
        content: [
            {text: 'Results', style: 'header'},
            {
				headerRows: 1,
                style: 'tableExample', 
				widths: ['*', 'auto'],
                table: {
                    body: [
                        headerFields
                    ]
                }
            },
            // {
            //   image: image,
            //   width: 150,
            //   height: 150
            // },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
    }

    // Get details based on headers
    data.forEach(rec => {
        headerFields.forEach(val => {
            detailsBody.push(rec[val.text])
        })
        docDefinition.content[1].table.body.push(detailsBody)
        detailsBody = []
    })

    window.open(pdfMake.createPdf(docDefinition).open(), '_blank')
}

export default printData