const tipoBeneficiario = ["Empleado","Hijo(a)"]
function exportData(table){
    const format = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
    let wb = XLSX.utils.book_new()
    wb.Props = {
        Title: "Alistamiento de Becas",
        Subject: "Becas",
        Author: "Tecnoglass INC",
        createDate: new Date()
    }
    wb.SheetNames.push("Alistamiento")
    
    let cont = 0
    const tableData = table.rows().data()
    let ws_data = [[
        'Empresa',
        'Convenio',
        'Empleado',
        'Sección/Cargo',
        'Antigüedad',
        'Salario',
        'Referencia Jefe',
        'Becado',
        'Promedio',
        'Universidad/Carrera/Semestre',
        'Valor semestre',
        'Propuesta (Teniendo en cuenta antigüedad y salario)',
        'Valor Propuesta',
        'Ayudas Anteriores',
    ]]
    for (let i = 0; i < tableData.length; i++) {
        const cell = tableData[i]
        console.log('cell', cell)
        const salario = cell.salario < 5000000 ? format.format(cell.salario): '>$5.000.000'
        const check = $(`[name='id[${cell.convenio}]']`)
        if(check.is(':checked')){
            ws_data.push([
                cell.empresa,
                cell.convenio,
                cell.empleado,
                cell.cargo,
                cell.antiguedad,
                salario,
                cell.referencia,
                tipoBeneficiario[cell.tipo_beneficiario - 1],
                cell.promedio ? cell.promedio:'Cumple con los requisitos de ICFES',
                cell.universidad,
                format.format(cell.valor_matricula),
                `${cell.porcentaje_propuesto * 100}%`,
                format.format(cell.valor_beca),
                '',       
            ])
            cont ++;
        }
    }
    wb.Sheets["Alistamiento"] = XLSX.utils.aoa_to_sheet(ws_data) //? Adding worksheet to workbook
    return [XLSX.write(wb, {bookType:'xlsx',  type: 'binary'}), cont]

}

function getDataToSave(table){
    data = []

    const tableData = table.rows().data()
    for (let i = 0; i < tableData.length; i++) {
        const cell = tableData[i]
        const check = $(`[name='id[${cell.convenio}]']`)
        if(check.is(':checked')){
            data.push({
                becaId: cell.id,
                becaDetalleId: cell.beca_detalle_id
            })
        }
    }
    return JSON.stringify(data)
}

function s2ab(s){
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}