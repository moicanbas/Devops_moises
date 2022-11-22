const initValidation = () => ([
    // informacion general
    // FormValidation.formValidation(formEl, {
    //     "fields": {
    //         ...(notEmptyFields('convenio',)),

    //     },
    //     "plugins": {
    //         "trigger": new FormValidation.plugins.Trigger(),
    //         "bootstrap": new FormValidation.plugins.Bootstrap(),
    //     },
    // }),

    // Información laboral
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('nombre_jefe','telefono_jefe'),
            'email_jefe':{
                "validators":{
                    "notEmpty": {
                        "message": 'Este campo es requerido'
                    },
                    "emailAddress": {
                        "message": 'Ingrese un email válido'
                    }
                }
            }
            // ...notEmptyDisabledFields('nombre_conyugue', 'genero_conyugue', 'ocupacion_conyugue',
            //     'nombre_hijo', 'genero_hijo', 'fecha_nacimiento_hijo', 'ocupacion_hijo'),
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),

    // Informacion financiera
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields("egreso_arriendo",
                "egreso_educacion",
                "egreso_servicios",
                "egreso_transporte",
                "egreso_alimentacion",
                ),
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),

    // Aplicacion beca
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('celular_empleado','tipo_beneficiario','semestre_cursar','valor_semestre','otra_institucion_name','otra_carrera_name','institucion_name','carrera_name','cod_beneficiario'),
            'volante_matricula': {
                "validators": {
                    "file": {
                        "extension": "pdf",
                        "type": 'application/pdf',
                        "message": "EL documento debe estar en formato PDF y con tamaño no mayor a 3 MB",
                        "maxSize": 3145728,
                    },
                }
            },
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),

    // Requisitos academicos
    FormValidation.formValidation(formEl, {
        "fields": {
            // ...notEmptyFields('nombre_materia','nota_materia','creditos_materia'),
            // 'url_certificado_nota':{
            //     "validators": {
            //         "notEmpty": {
            //             "message": 'Este campo es requerido'
            //         },
            //         "file": {
            //             'enabled': false,
            //             "extension": "pdf",
            //             "type": 'application/pdf',
            //             "message": "EL documento debe estar en formato PDF y con tamaño no mayor a 3 MB",
            //             "maxSize": 3145728,
            //         },
            //     }
            // },
            // 'documento_icfes':{
            //     "validators": {
            //         "notEmpty": {
            //             "message": 'Este campo es requerido'
            //         },
            //         "file": {
            //             'enabled': false,
            //             "extension": "pdf",
            //             "type": 'application/pdf',
            //             "message": "EL documento debe estar en formato PDF y con tamaño no mayor a 3 MB",
            //             "maxSize": 3145728,
            //         },
            //     }
            // },
            // 'documento_notas_colegio':{
            //     "validators": {
            //         "notEmpty": {
            //             "message": 'Este campo es requerido'
            //         },
            //         "file": {
            //             'enabled': false,
            //             "extension": "pdf",
            //             "type": 'application/pdf',
            //             "message": "EL documento debe estar en formato PDF y con tamaño no mayor a 3 MB",
            //             "maxSize": 3145728,
            //         },
            //     }
            // },
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),
    // Otras donaciones
    FormValidation.formValidation(formEl, {
        "fields": {
            // ...notEmptyFields('nombre_materia','nota_materia','creditos_materia'),
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),
]);

const notEmptyFields = (...fieldArr) => {
    const fields = {}
    for (field of fieldArr) {
        fields[field] = {
            "validators": {
                "notEmpty": {
                    "message": 'Este campo es requerido'
                }
            }
        }
    }
    return fields;
}

const notEmptyConditionalFields = (fieldArr, triggerField, triggerValues) => {
    const fields = {}
    for (field of fieldArr) {
        fields[field] = {
            "validators": {
                "callback": {
                    "message": 'Este campo es requerido',
                    "callback": (input) => {
                        const value = parseIntOrString($(triggerField).val());

                        if (!triggerValues.includes(value)) return true; 

                        return (input.value.length > 0);
                    }
                }
            }
        }
    }
    return fields;
}

const notEmptyDisabledFields = (...fieldArr) => {
    const fields = {}
    for (field of fieldArr) {
        fields[field] = {
            "validators": {
                "notEmpty": {
                    "message": 'Este campo es requerido',
                    'enabled': false,
                }
            }
        }
    }
    return fields;
}

const getStepData = (step) => {
    const stepDiv = $(`#step-${step}`).clone();
    const stepForm = $('<form></form>').append(stepDiv).get(0);
    return new FormData(stepForm);
}

const pageChangedPost = async (step, final='') => {
    const data = getStepData(step);
    data.append('step', step);
    data.append('final', final);
    csrfToken = $("[name=csrfmiddlewaretoken]").val();
    data.append('csrfmiddlewaretoken', csrfToken);
    let response;

    try {
        response = await fetch(url, {
            method: 'POST',
            body: data
        });
        response = await response.json();
    } catch (error) {
        console.log(error);
    }
    
    return response;
}

function btnWaitDisable(btn, spinnerClass, msg) {
    $(btn).prop('disabled', true);
    KTUtil.btnWait(btn, spinnerClass, msg);
}

function btnReleaseEnable(btn) {
    $(btn).prop('disabled', false);
    KTUtil.btnRelease(btn);
}

const buildSummary = () => {
    const nSteps = 6
    for (let step = 1; step < nSteps; step++) {
        const stepDiv = $(`#step-${step}`);
        const resDiv = $(`#res-step-${step}`);
        resDiv.html("")

        // Inputs sin select ni checkbox y visibles
        appendFields(
            resDiv,
            stepDiv.children("input:not( [type=file], [type=hidden], .hidden), select, textarea, div.row, .form-group"),
        );

        stepDiv.children("div:not(.row, .hidden)").each((i, el) => {
            $(el).find(".card").filter((i, el) => $(el).css('display') != 'none' ).each((i, card) => {
                const cardLabel = $(card).find(".card-label").text();
                resDiv.append(`<div class="pt-2"><strong>${cardLabel}</strong></div>`);

                appendFields(resDiv, card)
            })
        })
    }
}

const appendFields = (parentEl, objectToSearch) => {
    $(objectToSearch).find("input:not([type=file], [type=hidden], .hidden), select, textarea")
    .filter((i, element) => $(element).closest('.hidden').length == 0)
    .each((i, field) => {
        let value, label;
        if (field.type == 'checkbox') {
            value = field.checked ? "Sí" : "No"
        } else if (field.type == 'select-one') {
            value = $('option:selected', $(field)).text();
        } else {
            value = field.value;
        }
        
        label = getFieldLabel(field);
        $(parentEl).append(`<div>${label}: ${value ? value : '-'}</div>`)
    });
}

const getFieldLabel = (field) => 
    {
        const label =  field.type == 'checkbox' ?
                    $(field).parent() :
                    $(field).closest('.form-group').find('label').get(0);
        return $(label).clone().children().remove().end().text().trim()
    }


const initWizard = () => {
    // Initialize form wizard
    wizardObj = new KTWizard(wizardEl, {
        startStep: 1, // initial active step number
        clickableSteps: false  // allow step clicking
    });

    // Validation before going to next page
    wizardObj.on('change', function (wizard) {
        if (wizard.getStep() > wizard.getNewStep()) {
            return; // Skip if stepped back
        } else {
            btnWaitDisable(nextBtn, "spinner spinner-right spinner-white pr-15", "Espere");
        }

        // Validate form before change wizard step
        var validator = validators[wizard.getStep() - 1]; // get validator for currnt step
        if (validator) {
            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    pageChangedPost(wizard.getStep())
                    .then((resp) => {
                        if (resp.valid) {
                            if (wizard.getNewStep() == 6) {
                                buildSummary();
                            }
                            wizard.goTo(wizard.getNewStep());
                            KTUtil.scrollTop();
                            return;
                        } else {
                            Swal.fire({
                                text: "Hay errores en el formulario, por favor corríjalos e intente de nuevo.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Aceptar",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light"
                                }
                            }).then(function () {
                                KTUtil.scrollTop();
                            });

                            resp.errors.forEach((error) => {
                                Object.entries(error).forEach(([key, error]) => {
                                    toastr.options = {
                                        "closeButton": true,
                                        "positionClass": "toast-top-right",
                                        "showDuration": "300",
                                        "hideDuration": "1000",
                                        "timeOut": "5000",
                                        "extendedTimeOut": "1000",
                                        "showEasing": "swing",
                                        "hideEasing": "linear",
                                        "showMethod": "fadeIn",
                                        "hideMethod": "fadeOut"
                                    };
                                    toastr.error(`${key}: ${error.join(', ')}`);
                                })
                            })
                        }
                    })
                    .finally(() => btnReleaseEnable(nextBtn));
                } 
            })
            .finally(() => btnReleaseEnable(nextBtn));
        }
        return false;  // Do not change wizard step, further action will be handled by he validator
    });

    // Change event
    wizardObj.on('changed', function (wizard) {
        $("[name=step]").val(wizard.getStep());
        // requisitosAcademicosLogic($("[name=semestre_cursar]"))
        KTUtil.scrollTop();
    });

    
    // Submit event
    wizardObj.on('submit', function (wizard) {
        btnWaitDisable(submitBtn, "spinner spinner-right spinner-white pr-15", "Espere");
        Swal.fire({
            text: "La información ingresada es correcta. Por favor confirme el envío del formulario.",
            icon: "success",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: "btn font-weight-bold btn-primary",
                cancelButton: "btn font-weight-bold btn-default"
            }
        }).then(function (result) {
            if (result.value) {
                pageChangedPost(getStep(), true)
                .then((resp) => {
                    if (resp.valid) {
                        window.location.replace(resp.url)
                    } else {
                        console.log(resp.errors);
                        return Swal.fire({
                            text: "Ha ocurrido un error en el envío del formulario.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Aceptar",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-primary",
                            }
                        });
                    }
                })
                .catch((e) => {
                        console.log(e);
                        return Swal.fire({
                            text: "Ha ocurrido un error en el envío del formulario.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Aceptar",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-primary",
                            }
                        });
                })
                .finally(() => btnReleaseEnable(submitBtn));
            }
        })
        .finally(() => btnReleaseEnable(submitBtn));
    });
}

const initSelect2Elements = (selector='.select2') => {
    $(selector).each((i, item) => {
        if ($(item).hasClass('empty-form')) {
            $(item).removeClass('empty-form')
        } else {
            $(item).select2({
                selectionCssClass: ':all:',
            });  
        }
    })
}

const initTooltips = (selector='[data-toggle="tooltip"]') => {
    $('[data-toggle="tooltip"]').tooltip();
}

const initDatepickers = (selector='.date-picker') => {
    $(selector).datepicker({
        'language': 'es-ES',
        'format': 'dd/mm/yyyy'
    });
}

const initImgInputs = (selector=".img-input") => {
    $(selector).each((i, input) => {
        const imgInput = new KTImageInput(input.id);
    });
}

const initFileInput = (selector='.custom-file-input') => {
    $(selector).on('change', (event) => {
        const input = event.target;
        if (input.files.length == 0) { return }
        const fileName = sliceBeginEnd(input.files[0].name);
        $(input).next('.custom-file-label').addClass("selected").html(fileName);
    });
}

const initVisibleOnValue = (target, triggerField, triggerValues, validation, fieldEl) => {
    const targetEl = $(target);
    const triggerFieldEl = $(triggerField);
    
    triggerFieldEl.change((event) => {
        const value = parseIntOrString(event.target.value);
        const toggle = triggerValues.includes(value) ? 'show' : 'hide';
        toggleVisibility(targetEl, toggle);
    });

    if (validation) {
        triggerFieldEl.change((event) => {
            const value = parseIntOrString(event.target.value);
            const toggle = triggerValues.includes(value);
            toggleValidation(fieldEl, toggle);
        })
    }

    triggerFieldEl.trigger('change');
}

const initHideOnValue = (target, triggerField, triggerValues, validation, fieldEl) => {
    const targetEl = $(target);
    const triggerFieldEl = $(triggerField);
    
    triggerFieldEl.change((event) => {
        const value = parseIntOrString(event.target.value);
        const toggle = triggerValues.includes(value) ? 'hide' : 'show';
        toggleVisibility(targetEl, toggle);
    });

    if (validation) {
        triggerFieldEl.change((event) => {
            const value = parseIntOrString(event.target.value);
            const toggle = triggerValues.includes(value);
            toggleValidation(fieldEl, !toggle);
        })
    }

    triggerFieldEl.trigger('change');
}

const initOtherField = (targetFieldSelector, triggerFieldSelector, triggerValues, toggleValidation=false) => {
    const fieldEl = $(targetFieldSelector);
    const fieldCol = fieldEl.closest("div:not(.form-group)");
    const triggerFieldEl = $(triggerFieldSelector);
    
    triggerFieldEl.change((event) => {
        const row = fieldEl.closest("div.row");
        const siblingCols = $(row).children();
        const siblingCount = siblingCols.length;
        
        const value = parseIntOrString(event.target.value);
        const nSiblings = triggerValues.includes(value) ? siblingCount : (siblingCount - 1);
        const newClass = "col-xl-" + 12/(nSiblings);
        
        $(siblingCols).each((i, col) => {
            $(col).removeClass();
            if ($(col) != fieldCol) {
                $(col).addClass(newClass);
            }
        });
    });
    
    initVisibleOnValue(fieldCol, triggerFieldSelector, triggerValues, toggleValidation, fieldEl);
}

const initHideField = (targetFieldSelector, triggerFieldSelector, triggerValues, toggleValidation=false) => {
    const fieldEl = $(targetFieldSelector);
    const fieldCol = fieldEl.closest("div:not(.form-group)");
    const triggerFieldEl = $(triggerFieldSelector);
    
    triggerFieldEl.change((event) => {
        const row = fieldEl.closest("div.row");
        const siblingCols = $(row).children().filter((i, el) => (!($(el).hasClass("hidden"))));
        let siblingCount = siblingCols.length;

        // if (!siblingCols.toArray().includes(fieldCol.get(0))) {
        //     siblingCount++;
        // }
        
        const value = parseIntOrString(event.target.value);
        const nSiblings = triggerValues.includes(value) ? (siblingCount - 1): (siblingCount);
        const newClass = "col-xl-" + 12/(nSiblings);
        
        $(siblingCols).each((i, col) => {
            $(col).removeClass();
            if ($(col) != fieldCol) {
                $(col).addClass(newClass);
            }
        });
    });
    
    initHideOnValue(fieldCol, triggerFieldSelector, triggerValues, toggleValidation, fieldEl);
}

const initConyugueValidators = () => {
    const estadoCivilField = $("[name=estado_civil]")
    estadoCivilField.change((event) => {
        if (event.target.value == 0 || event.target.value == 1) {
            return $("#conyugue_form :required").each((i, input) => validators[1].disableValidator(input.name))
        }
        $("#conyugue_form input:required, #conyugue_form select:required").each((i, input) => validators[1].enableValidator(input.name))
    });
    estadoCivilField.trigger('change');
}

const initHijoFormset = () => {
    totalHijos = parseInt($("[name=n_hijos]").val());

    for (let index = 0; index < totalHijos; index++) {
        initForm(`#hijo_form_card-${index}`, index, "hijos", 2, [{
            targetFieldName: "otro_genero_hijo",
            triggerFieldName: "genero_hijo",
            triggerValues: [3],
        }]);
    }

    $("[name=n_hijos]").change((event) => {
        const newValue = parseInt(event.target.value);
        if (newValue > totalHijos) {
            $("[name=hijos-TOTAL_FORMS]").val(newValue);
            for (let index = totalHijos; index < newValue; index++) {
                const formEl = addForm("hijo_empty_form", "hijo_forms", "hijos", index);
                initForm(formEl, index, "hijos", 2, [{
                    targetFieldName: "otro_genero_hijo",
                    triggerFieldName: "genero_hijo",
                    triggerValues: [3],
                }]);
            }
            return totalHijos = newValue
        }

        if (newValue < totalHijos) {
            for (let nHijo = totalHijos; nHijo > newValue; nHijo--) {
                removeForm(`hijo_form_card-${nHijo - 1}`, "hijos", nHijo - 1);
            }
        }
        totalHijos = newValue;
    })
}

const verificarSemestreNota = (input,valorSemestre ) => {
    const semestre_cursar = $('[name=semestre_cursar]').val()
    const val = parseInt(semestre_cursar)
    const semestre = parseInt(valorSemestre)
    console.log('val', val)
    console.log('semestre', semestre)
    if(esNuevo){
        if(semestre >= val || semestre < 1){
            Swal.fire({
                title: 'Error',
                text: 'El semestre debe ser menor al semestre actual y mayor a 1',
                icon: 'warning'
            }).then(()=>{
                console.log('input', input)
                input.val(null).change()
            })
        }
    } else {
        if(semestre != val-1){
            Swal.fire({
                title: 'Error',
                text: `El semestre debe ser el semestre ${val-1}`,
                icon: 'warning'
            }).then(()=>{
                input.val(null).change()
            })
        }
    }
}

const initNotaFormset = () => {
    totalFormsEl = $('[name=notas-TOTAL_FORMS]');
    totalFormsEl.val(parseInt(totalFormsEl.val()));
    $("#eliminar_nota").hide();
    $("#eliminar_nota").prop('disabled', true)
    if (remainingContactos <= 0) {
        addForm("nota_semestre_empty_form", "nota_semestre_forms", "notas", remainingContactos);
        if(remainingContactos == 0){
            remainingContactos++;
        }
        $('[name=notas-TOTAL_FORMS]').val(remainingContactos);
        $(`[name=notas-0-semestre]`).blur(function(e){
            console.log('e.target.value', e.target.value)
            verificarSemestreNota($(this),e.target.value)
        })
    }
    for (let index = 0; index < remainingContactos; index++) {
        initForm(`#nota_semestre_form_card-${index}`, index, "notas", 4);
        if (index > 0){
            $(`[name=notas-${index}-semestre]`).blur(function(e){
                console.log('e.target.value', e.target.value)
                verificarSemestreNota($(this),e.target.value)
            })
        }
    }

    if (remainingContactos > 1) {
        $("#eliminar_nota").show();
        $("#eliminar_nota").prop('disabled', false);
    }

    $("#añadir_nota").click((event) => {
        try {
            totalFormsEl = $('[name=notas-TOTAL_FORMS]');
            totalFormsEl.val(parseInt(totalFormsEl.val()) + 1);
            const formEl = addForm("nota_semestre_empty_form", "nota_semestre_forms", "notas", remainingContactos);
            initForm(formEl, remainingContactos, "notas", 4);
            $(`[name=notas-${remainingContactos}-semestre]`).blur(function(e){
                console.log('e.target.value', e.target.value)
                console.log('remainingContactos', remainingContactos)
                verificarSemestreNota($(this),e.target.value)
            })
            remainingContactos++;
            $("#eliminar_nota").show();
            $("#eliminar_nota").prop('disabled', false);
            
        } catch (error) {
            console.log('error', error)
        }
    });

    $("#eliminar_nota").click((event) => {
        totalFormsEl = $('[name=notas-TOTAL_FORMS]');
        totalFormsEl.val(parseInt(totalFormsEl.val()) - 1);
        remainingContactos--;
        removeForm(`nota_semestre_form_card-${remainingContactos}`, "notas", remainingContactos);

        if (remainingContactos == 1) {
            $("#eliminar_nota").hide();
            $("#eliminar_nota").prop('disabled', true)
        }
    });
}

const initEstudiosFormset = async() => {
    const fetchProgramas = async () => {
        const institucion = parseIntOrString($(`[name=institucion]`).val());
        // const nivelEstudio = parseIntOrString($(`[name=estudios-${index}-nivel_estudio]`).val());

        let programas;
        const url = programasEndpoint + '?' + new URLSearchParams({
            'codigoinstitucion': institucion,
            // 'codigonivelformacion': nivelEstudio
        });
    
        if (institucion) {
            try {
                const response = await fetch(url);
                programas = await response.json();
            } catch (error) {
                console.log("Error: " + error);
                programas = [];
            }
        } else {
            programas = [];
        }
    
        const programasArray = formatProgramas(programas);
        setOptions(`[name=carrera]`, programasArray);
    }
    const institucionVal = $("[name=institucion]").val();
    const programaVal = $("[name=carrera]").val();
    if(institucionVal){
        await fetchProgramas()
        $('[name=carrera]').val(programaVal).change()
    }
    $("[name='institucion']").change(()=>{
        fetchProgramas()
    })
    // initForm(`#university_forms`, 1, "estudios", 4,
    //     [{
    //         targetFieldName: 'institucion',
    //         triggerFieldName: 'nivel_estudio',
    //         triggerValues: [7],
    //         toggleValidation: true,
    //     }],
    //     [
    //         {
    //             targetFieldName: 'institucion_es',
    //             triggerFieldName: 'nivel_estudio',
    //             triggerValues: [7],
    //             toggleValidation: true,
    //         },
    //         {
    //             targetFieldName: 'programa',
    //             triggerFieldName: 'nivel_estudio',
    //             triggerValues: [7],
    //             toggleValidation: true,
    //         },
    //     ], null,
    //     [{
    //         "name": `estudios-institucion_es`,
    //         "event": 'change',
    //         "callback": (event) => fetchProgramas()
    //     },
    //     {
    //         "name": `institucion`,
    //         "event": 'change',
    //         "callback": (event) => fetchProgramas()
    //     }]
    // );
}

const requisitosAcademicosLogic = (value) =>{
    const semestre = Number(value)
    if(!esNuevo){
        toggleVisibility('#nota_datos_colegio', 'hide')
    }
    if( semestre === 1 && esNuevo){
        toggleVisibility('#nota_datos_colegio', 'show')
        toggleVisibility('#nota_dato_universidad_update', 'hide')
    } else if(semestre > 1 && esNuevo) {
        toggleVisibility('#nota_datos_colegio', 'hide')
        toggleVisibility('#nota_dato_universidad_update', 'show')
    }
}

const initRequisitosAcademicos = () => {
    const semestre_cursar = $('[name=semestre_cursar]');
    if(Number(semestre_cursar.val()) > 1){
        toggleVisibility('#nota_datos_colegio', 'hide')
        toggleVisibility('#nota_dato_universidad_update', 'show')    
    } else {
        toggleVisibility('#nota_datos_colegio', 'show')
        toggleVisibility('#nota_dato_universidad_update', 'hide')
    }
    semestre_cursar.change((e)=>requisitosAcademicosLogic(e.target.value))
}

const initInformacionFinanciera = () => {
    const names = ['egreso_arriendo','egreso_educacion',
    'egreso_servicios','egreso_transporte',
    'egreso_alimentacion',
    'otros_egresos']

    const val = getTotalValue(names)
    $('#total_egreso').text(`Total: ${new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(val)}`)
    names.forEach((name, index)=>{
        $(`[name=${name}]`).change((e)=>{ 
            updateTotalInputEgreso(e.target.value,names)
         })
    })
}
const getTotalValue = (arr) => {
    let total = 0
    arr.forEach((a)=>{
        const fieldValue = $(`[name=${a}]`).val();
        total += Number(fieldValue)
    })
    return total
}
const updateTotalInputEgreso = (valueInput,arr) => {
    const totalInput = $('#total_egreso')
    const total = getTotalValue(arr)
    totalInput.text(`Total: ${new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(total)}`)
}


const toggleVisibility = (el, toggle) => {
    if (toggle == 'hide') {
        return $(el).addClass('hidden');
    } 
    if (toggle == 'show') {
        return $(el).removeClass('hidden');
    }
}

const toggleValidation = (el, toggle) => {
    const name = $(el).get(0).name;
    for (validator of validators) {
        if (Object.keys(validator.getFields()).includes(name)) {
            if (toggle) {
                return validator.enableValidator(name);
            } 
            return validator.disableValidator(name);
        }
    }
}

const parseIntOrString = (value) => isNaN(parseInt(value)) ? value : parseInt(value);

const sliceBeginEnd = (string) => (
    string.length > 30 ?
    string.slice(0, 14) + "..." + string.slice(-15) :
    string
)

const formatProgramas = (programas) => {
    const newProgramas = [];
    for (programa of programas) {
        const { id, codigoinstitucion, nombretituloobtenido } = programa;
        newProgramas.push({
            'id': id,
            'text': nombretituloobtenido
        });
    }
    return newProgramas;
}

const formatCities = (cities) => {
    const newCities = [];
    for (city of cities) {
        const { nombre_ciudad, departamento, ...newCity } = city;
        newCities.push({
            ...newCity,
            'text': nombre_ciudad + " - " + departamento
        });
    }
    return newCities;
}

const setOptions = (selectSelector, options) => {
    const select = $(selectSelector);
    select.html("");
    for (option of options) {
        const newOption = new Option(option.text, option.id, false, false);
        select.append(newOption).trigger('change');
    }
}

$("#pais_select").change(async (event) => {
    const paisVal = event.target.value;
    let ciudades;
    const url = ciudadEndpoint + '?' + new URLSearchParams({
        'pais': paisVal
    });

    if (paisVal) {
        try {
            const response = await fetch(url);
            ciudades = await response.json();
        } catch (error) {
            console.log("Error: " + error);
            ciudades = [];
        }
    } else {
        ciudades = [];
    }

    const citiesArray = formatCities(ciudades);
    setOptions("#ciudad_select", citiesArray);
})

const initAplicacionBecaForm = ()=>{

    const beneficiarioVal = $("[name='tipo_beneficiario']").val()
    const hijoVal = $("[name='cod_beneficiario']").val() 
    if(beneficiarioVal == '1'){
        toggleVisibility('#beneficiario_empleado', 'show');
        toggleVisibility('#hijo_select', 'hide');
        toggleVisibility('#beneficiario_hijo', 'hide')
    } else {
        toggleVisibility('#beneficiario_empleado', 'hide');
        toggleVisibility('#hijo_select', 'show');
        if(!beneficiarioVal){
            toggleVisibility('#hijo_select', 'hide');
        }
        if(hijoVal){
            toggleVisibility('#beneficiario_hijo', 'show');
        } else {
            toggleVisibility('#beneficiario_hijo', 'hide');
        }
    }

    $("[name='tipo_beneficiario']").change((event)=>{
        const beneficiarioVal = event.target.value;
        if(beneficiarioVal == '1'){
            toggleVisibility('#beneficiario_empleado', 'show');
            toggleVisibility('#hijo_select', 'hide');
            toggleVisibility('#beneficiario_hijo', 'hide')
        } else {
            toggleVisibility('#beneficiario_empleado', 'hide');
            toggleVisibility('#hijo_select', 'show');
            toggleVisibility('#beneficiario_hijo', 'show')
        }
    })
    
    $("[name='cod_beneficiario']").change( (e)=>{
        const empleadoHijoVal = e.target.value;
        if(empleadoHijoVal){
            toggleVisibility('#beneficiario_hijo', 'show');
            // console.log('hijos', hijos)
            // hijos.map((h,i)=>{
            //     console.log(`hijo ${i+1}: `,h)
            // })
        } else {
            toggleVisibility('#beneficiario_hijo', 'hide');
        }
    } )
    const checkedOption = $("[name='option_check']")
    // console.log('checkedOption', checkedOption)
    if(checkedOption.is(":checked")){
        toggleVisibility('#otra_universidad', 'show');
        toggleVisibility('#select_universidad', 'hide');
    } else {
        toggleVisibility('#otra_universidad', 'hide');
        toggleVisibility('#select_universidad', 'show');
    }
    
    $("[name='option_check']").change((e)=>{
        const showOtra = e.target.checked ? 'show' : 'hide';
        const showUni = e.target.checked ? 'hide' : 'show';
        toggleVisibility('#select_universidad', showUni);
        toggleVisibility('#otra_universidad', showOtra);
        
        $("[name='otra_institucion']").val('');
        $("[name='otra_carrera").val('');
        $("[name='institucion']").val(null).change()
        $("[name='programa']").val(null).change()
    })
}

const addForm = (emptyFormId, containerId, formsetName, index) => {

    const element = $("#" + emptyFormId).clone(true).html()
    .replace(/__prefix__/g, index).replace(/__prefix_display__/, index + 1);
    
    const formId = $(element).attr('id');
    const form = $("#" + formId);
    if (form.length > 0) {
        form.show();
        $(`[name="${formsetName}-${index}-DELETE"]`).prop("checked", false);
        return form;
    }

    $("#" + containerId).append(element);
    return $("#" + formId);
}

const getAllValidatorFields = () => {
    let allValidatorFields = {};

    for (validator of validators) {
        const validatorFields = validator.getFields();
        allValidatorFields = {...allValidatorFields, ...validatorFields};
    }

    return allValidatorFields;
}

const addFormValidation = (index, fields, formsetName, validator) => {
    const allValidatorFields = getAllValidatorFields()
    for (field of fields) {
        const name = `${formsetName}-${index}-${field}`;
        const validatorCopy = JSON.parse(JSON.stringify({...(allValidatorFields[field])}));
        validator.addField(name, validatorCopy);
        validator.enableValidator(name);
    }
}

const initForm = (formEl, index, formsetName, step=1, otherFields=[], hideFields=[], formFields=null, customCallbacks=[]) => {
    formEl = $(formEl);

    if (formEl.find('.select2').length > 0) {
        initSelect2Elements(`#${formEl.attr('id')} .select2`);
    }

    if (formEl.find('.date-picker').length > 0) {
        const selector = `#${formEl.attr('id')} .date-picker`;
        initDatepickers(selector);
    }

    if (formEl.find('.img-input').length > 0) {
        const selector = `#${formEl.attr('id')} .img-input`;
        initImgInputs(selector);
    }

    if (formEl.find('.custom-file-input').length > 0) {        
        const selector = `#${formEl.attr('id')} .custom-file-input`;
        initFileInput(selector);
    }

    if (formEl.find('[data-toggle="tooltip"]').length > 0) {        
        const selector = `#${formEl.attr('id')} [data-toggle="tooltip"]`;
        initTooltips(selector);
    }


    for (customCallback of customCallbacks) {
        $(`[name=${customCallback.name}]`).on(customCallback.event, (event) => {
            customCallback.callback(event)
        });
    }

    if (!formFields) {
        formFields = []; 
        formEl.find("input:not([type=checkbox]), select").each((i, field) => formFields.push((field.name).split('-').at(-1)))
    }
    addFormValidation(index, formFields, formsetName, validators[step - 1]);
    for (otherField of otherFields) {
        const { targetFieldName, triggerFieldName, triggerValues, toggleValidation=false } = otherField;

        initOtherField(
            `[name=${formsetName}-${index}-${targetFieldName}]`,
            `[name=${formsetName}-${index}-${triggerFieldName}]`,
            triggerValues, toggleValidation
        );
    }

    for (hideField of hideFields) {
        const { targetFieldName, triggerFieldName, triggerValues, toggleValidation=false } = hideField;

        initHideField(
            `[name=${formsetName}-${index}-${targetFieldName}]`,
            `[name=${formsetName}-${index}-${triggerFieldName}]`,
            triggerValues, toggleValidation
        );
    }

}

const removeForm = (cardId, formsetName, index) => {
    const formCard = $("#" + cardId);
    $(formCard).hide();
    $(`[name="${formsetName}-${index}-DELETE"]`).prop("checked", true);
    removeFormValidation(cardId, index);
}

const removeFormValidation = (cardId) => {
    $("#" + cardId).find("input:not([type=checkbox]), select").each(function (i, field) {
        validators[getStep() - 1].disableValidator(field.name);
    });
}

const getStep = () => parseInt($("[name=step]").val())

const initElements = () => {
    initWizard();
    initSelect2Elements();
    initDatepickers();
    initImgInputs();
    initFileInput();
    initTooltips();
    initRequisitosAcademicos();
    initOtherField("[name=otro_genero]", "[name=genero]", [3]);
    initOtherField("[name=otro_genero_conyugue]", "[name=genero_conyugue]", [3]);
    initOtherField("[name=cedula_familiar]", "[name=familiar_empresa]", ["True"], false);
    initVisibleOnValue("#conyugue_form", "[name=estado_civil]", [2, 3],)
    initConyugueValidators();
    initHijoFormset();
    initNotaFormset();
    initInformacionFinanciera();
    initAplicacionBecaForm();
    initEstudiosFormset();
}

$(document).on('change',"select",function(){
    const i = $(this)[0].selectedIndex;
    $(this).children().each(function(index){
        $(this).attr('selected',index == i);
    });
});

let validators, formEl, wizardEl;
let totalHijos;
let remainingContactos = parseInt($('[name=notas-TOTAL_FORMS]').val());
let remainingEstudios = parseInt($('[name=estudios-TOTAL_FORMS]').val());
const submitBtn = KTUtil.getById("submit_btn");
const nextBtn = KTUtil.getById("next_btn");
$(document).ready(() => {
    wizardEl = KTUtil.getById('preregistro_wizard');
    formEl = KTUtil.getById('preregistro_form');
    validators = initValidation();
    initElements();
    $('select[name="tipo_beneficiario"]').trigger("change");
})

    // $(this).val() will work here id_cod_beneficiario cod_beneficiario

 $('select[name="tipo_beneficiario"]').on('change', function(){
    var optVal= $("#id_tipo_beneficiario option:selected").val();
    if (optVal==1){
        console.log("Empleado");
        validators[2].disableValidator("cod_beneficiario");
        
    }else{
        console.log("Hijo");
        validators[2].enableValidator("cod_beneficiario");
    }
 });

