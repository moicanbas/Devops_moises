const initValidation = () => ([
    // Datos personales
    FormValidation.formValidation(formEl, {
        "fields": {
            ...(notEmptyFields('primer_nombre', 'primer_apellido', 'genero',
                'fecha_nacimiento', 'pais', 'ciudad', 'barrio', 'tipo_identificacion',
                'dir_residencia', 'talla_camisa', 'talla_pantalon', 'talla_zapatos')),
                
            'estrato': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    },
                    "lessThan": {
                        "message": 'Ingrese un número de estrato válido',
                        'max': 6
                    },
                    'greaterThan': {
                        'message': 'Ingrese un número de estrato válido',
                        'min': 1
                    },
                    "notEmpty": {
                        "message": 'Este campo es requerido'
                    }
                }
            },
            'tiempo_residencia': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    },
                    'greaterThan': {
                        'message': 'Ingrese una cantidad de meses válida',
                        'min': 1
                    },
                    "notEmpty": {
                        "message": 'Este campo es requerido'
                    }
                }
            },
            'tel_fijo': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    }
                }
            },
            'celular': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    }
                }
            },
            'identificacion': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número de identificación válido'
                    },
                    "notEmpty": {
                        "message": "Este campo es requerido"
                    }
                }
            },
            'foto_carnet': {
                "validators": {
                    "file": {
                        "extension": "png,jpeg,jpg",
                        "type": 'image/jpeg,image/png',
                        "message": "La imagen debe estar en formato .jpg o .png y con tamaño no mayor a 2 MB",
                        "maxSize": 2097152
                    },
                }
            },
            'doc_identificacion': {
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

    // Datos familiares
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('estado_civil'),
            ...notEmptyFields('familiar_empresa'),
            ...notEmptyConditionalFields(['cedula_familiar', 'celular_familiar', 'correo_familiar', 'empresa_familiar', 'titulo_familiar',], 'familiar_empresa', ['True'] ),
            ...notEmptyDisabledFields('nombre_conyugue', 'genero_conyugue', 'ocupacion_conyugue',
                'nombre_hijo', 'genero_hijo', 'fecha_nacimiento_hijo', 'ocupacion_hijo'),
            'documento_rc_ti_hijo': {
                "validators": {
                    "file": {
                        'enabled': false,
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

    // Contactos de emergencia
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('nombre_contacto', 'parentesco_contacto'),
            'tel_fijo_contacto': {
                "validators": {
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    }
                }
            },
            'celular_contacto': {
                "validators": {
                    "notEmpty": {
                        "message": 'Este campo es requerido'
                    },
                    "numeric": {
                        "message": 'Ingrese un número válido'
                    }
                }
            },
            'email_contacto': {
                "validators": {
                    "emailAddress": {
                        "message": 'Ingrese un email válido'
                    }
                }
            }
        },
        "plugins": {
            "trigger": new FormValidation.plugins.Trigger(),
            "bootstrap": new FormValidation.plugins.Bootstrap(),
        },
    }),

    // Estudios
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('nivel_estudio', 'fecha_fin'),
            ...notEmptyDisabledFields('institucion', 'institucion_es', 'programa'),
            'constancia': {
                "validators": {
                    "file": {
                        'enabled': false,
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

    // Antecedentes médicos
    FormValidation.formValidation(formEl, {
        "fields": {
            ...notEmptyFields('tipo_sangre',),
            ...notEmptyFields('arl',),
            ...notEmptyFields('eps',),
            ...notEmptyFields('fondo_pensiones',),
            //...notEmptyConditionalFields(['certificado_arl'], 'arl', ['True'] ),
            //...notEmptyConditionalFields(['certificado_eps'], 'eps', ['True'] ),
            //...notEmptyConditionalFields(['certificado_fondo_pensiones'], 'fondo_pensiones', ['True'] ),
            
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
                        const value = parseIntOrString($('[name='+triggerField+']').val());

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
            stepDiv.children("input:not([type=file], [type=hidden], .hidden), select, textarea, div.row, .form-group"),
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
                            console.log(resp);
                            wizard.goTo(wizard.getNewStep());
                            KTUtil.scrollTop();
                            return;
                        } else {
                            console.log(resp.errors);
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

const initContactoFormset = () => {
    $("#eliminar_contacto").hide();
    $("#eliminar_contacto").prop('disabled', true)

    if (remainingContactos == 0) {
        addForm("contacto_emergencia_empty_form", "contacto_emergencia_forms", "contactos_emergencia", remainingContactos);
        remainingContactos++;
        $('[name=contactos_emergencia-TOTAL_FORMS]').val(remainingContactos);
    }
    for (let index = 0; index < remainingContactos; index++) {
        initForm(`#contacto_emergencia_form_card-${index}`, index, "contactos_emergencia", 3);
    }

    if (remainingContactos > 1) {
        $("#eliminar_contacto").show();
        $("#eliminar_contacto").prop('disabled', false);
    }

    $("#añadir_contacto").click((event) => {
        totalFormsEl = $('[name=contactos_emergencia-TOTAL_FORMS]');
        totalFormsEl.val(parseInt(totalFormsEl.val()) + 1);
        const formEl = addForm("contacto_emergencia_empty_form", "contacto_emergencia_forms", "contactos_emergencia", remainingContactos);
        initForm(formEl, remainingContactos, "contactos_emergencia", 3);
        remainingContactos++;

        $("#eliminar_contacto").show();
        $("#eliminar_contacto").prop('disabled', false);
    });

    $("#eliminar_contacto").click((event) => {
        remainingContactos--;
        removeForm(`contacto_emergencia_form_card-${remainingContactos}`, "contactos_emergencia", remainingContactos);

        if (remainingContactos == 1) {
            $("#eliminar_contacto").hide();
            $("#eliminar_contacto").prop('disabled', true)
        }
    });
}

const initEstudiosFormset = () => {
    const fetchProgramas = async (index) => {
        const institucion = parseIntOrString($(`[name=estudios-${index}-institucion_es]`).val());
        const nivelEstudio = parseIntOrString($(`[name=estudios-${index}-nivel_estudio]`).val());

        let programas;
        const url = programasEndpoint + '?' + new URLSearchParams({
            'codigoinstitucion': institucion,
            'codigonivelformacion': nivelEstudio
        });
    
        if (institucion && nivelEstudio) {
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
    
        console.log(programas);
        const programasArray = formatProgramas(programas);
        setOptions(`[name=estudios-${index}-programa]`, programasArray);
    }

    $("#eliminar_estudio").hide();
    $("#eliminar_estudio").prop('disabled', true)

    if (remainingEstudios == 0) {
        addForm("estudio_empty_form", "estudio_forms", "estudios", remainingEstudios);
        remainingEstudios++;
        $('[name=estudios-TOTAL_FORMS]').val(remainingEstudios);
    }
    for (let index = 0; index < remainingEstudios; index++) {
        initForm(`#estudio_form_card-${index}`, index, "estudios", 4,
            [{
                targetFieldName: 'institucion',
                triggerFieldName: 'nivel_estudio',
                triggerValues: [7],
                toggleValidation: true,
            }],
            [
                {
                    targetFieldName: 'institucion_es',
                    triggerFieldName: 'nivel_estudio',
                    triggerValues: [7],
                    toggleValidation: true,
                },
                {
                    targetFieldName: 'programa',
                    triggerFieldName: 'nivel_estudio',
                    triggerValues: [7],
                    toggleValidation: true,
                },
            ], null,
            [{
                "name": `estudios-${index}-institucion_es`,
                "event": 'change',
                "callback": (event) => fetchProgramas(index)
            },
            {
                "name": `estudios-${index}-nivel_estudio`,
                "event": 'change',
                "callback": (event) => fetchProgramas(index)
            }]
        );
    }

    if (remainingEstudios > 1) {
        $("#eliminar_estudio").show();
        $("#eliminar_estudio").prop('disabled', false);
    }

    $("#añadir_estudio").click((event) => {
        totalFormsEl = $('[name=estudios-TOTAL_FORMS]');
        totalFormsEl.val(parseInt(totalFormsEl.val()) + 1);
        const formEl = addForm("estudio_empty_form", "estudio_forms", "estudios", remainingEstudios);
        initForm(formEl, remainingEstudios, "estudios", 4,
            [{
                targetFieldName: 'institucion',
                triggerFieldName: 'nivel_estudio',
                triggerValues: [7],
                toggleValidation: true,
            }],
            [
                {
                    targetFieldName: 'institucion_es',
                    triggerFieldName: 'nivel_estudio',
                    triggerValues: [7],
                    toggleValidation: true,
                },
                {
                    targetFieldName: 'programa',
                    triggerFieldName: 'nivel_estudio',
                    triggerValues: [7],
                    toggleValidation: true,
                },
            ], null,
            [{
                "name": `estudios-${remainingEstudios}-institucion_es`,
                "event": 'change',
                "callback": (event) => fetchProgramas(remainingEstudios - 1)
            },
            {
                "name": `estudios-${remainingEstudios}-nivel_estudio`,
                "event": 'change',
                "callback": (event) => fetchProgramas(remainingEstudios - 1)
            }]
        );
        remainingEstudios++;

        $("#eliminar_estudio").show();
        $("#eliminar_estudio").prop('disabled', false);
    });

    $("#eliminar_estudio").click((event) => {
        remainingEstudios--;
        removeForm(`estudio_form_card-${remainingEstudios}`, "estudios", remainingEstudios);

        if (remainingEstudios == 1) {
            $("#eliminar_estudio").hide();
            $("#eliminar_estudio").prop('disabled', true)
        }
    });
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

    console.log(ciudades);
    const citiesArray = formatCities(ciudades);
    setOptions("#ciudad_select", citiesArray);
})

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
            console.log("cambio");
            console.log("customCallback");
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
    initOtherField("[name=otro_genero]", "[name=genero]", [3]);
    initOtherField("[name=otro_genero_conyugue]", "[name=genero_conyugue]", [3]);
    //initOtherField("[name=cedula_familiar]", "[name=celular_familiar]", "[name=correo_familiar]", "[name=empresa_familiar]", "[name=titulo_familiar]", "[name=familiar_empresa]", ["True"], ["True"], ["True"], ["True"], ["True"], false);
    initVisibleOnValue("#conyugue_form", "[name=estado_civil]", [2, 3],)
    initConyugueValidators();
    initHijoFormset();
    initContactoFormset();
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
let remainingContactos = parseInt($('[name=contactos_emergencia-TOTAL_FORMS]').val());
let remainingEstudios = parseInt($('[name=estudios-TOTAL_FORMS]').val());
const submitBtn = KTUtil.getById("submit_btn");
const nextBtn = KTUtil.getById("next_btn");
$(document).ready(() => {
    wizardEl = KTUtil.getById('preregistro_wizard');
    formEl = KTUtil.getById('preregistro_form');
    validators = initValidation();

    console.log(validators);
    initElements();
})

// function onInputFinish($input, fnCallbck) {
//     var typingTimr, doneTypingIntv = 400 //time in ms
//     var fnInputFinish = function($elem) {
//         clearTimeout(typingTimr)
//         typingTimr = setTimeout(function() { fnCallbck($elem) }, doneTypingIntv)
//     }
//     $input.each(function() {
//         $(this).on("input", function() { fnInputFinish($(this)) })
//     })
//     return fnInputFinish
// }


// onInputFinish(
    
// );

$('#id_familiar_empresa').change(function() {
    const res = $(this).val() 
    if( res == "True" )
    {
        $('#conten_familiar_laborando').show();
    }else{
        $('#conten_familiar_laborando').hide();
    }
})
$('#id_familiar_empresa').trigger('change');

$('#id_arl').change(function() {
    const res = $(this).val() 
    if( res == "True" )
    {
        $('#conten_arl').show();
    }else{
        $('#conten_arl').hide();
        $('#id_certificado_arl').removeClass("is-invalid");
        $('#id_certificado_arl').removeClass("is-valid");
        $("#id_certificado_arl").val(null);
        $('#certificado_arl_file_text').html('Cargar archivo');
    }
})
$('#id_arl').trigger('change');

$('#id_eps').change(function() {
    const res = $(this).val() 
    if( res == "True" )
    {
        $('#conten_eps').show();
    }else{
        $('#conten_eps').hide();
        $('#id_certificado_eps').removeClass("is-invalid");
        $('#id_certificado_eps').removeClass("is-valid");
        $("#id_certificado_eps").val(null);
        $('#certificado_eps_file_text').html('Cargar archivo');
    }
})
$('#id_eps').trigger('change');

$('#id_fondo_pensiones').change(function() {
    const res = $(this).val() 
    if( res == "True" )
    {
        $('#conten_fondo_pensiones').show();
    }else{
        $('#conten_fondo_pensiones').hide();
        $('#id_certificado_fondo_pensiones').removeClass("is-invalid");
        $('#id_certificado_fondo_pensiones').removeClass("is-valid");
        $("#id_certificado_fondo_pensiones").val(null);
        $('#certificado_fondo_pensiones_file_text').html('Cargar archivo');
    }
})
$('#id_fondo_pensiones').trigger('change');



