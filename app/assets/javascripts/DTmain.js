
var TableBDE = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                var id_row = nRow.id.substr(2);
                var span_value = aData[5].split("<span>");
                if (span_value[1])
                {
                    var image = span_value[1].split("</span>")[0];
                }
                else
                {
                    var image = ""
                }
                jqTds[0].style.width = "10%";
                jqTds[1].style.width = "10%";
                jqTds[2].style.width = "10%";
                jqTds[3].style.width = "10%";
                jqTds[5].style.width = "25%";
                jqTds[6].style.width = "10%";
                jqTds[7].style.width = "10%";
                jqTds[0].innerHTML = '<input type="text" id="name" name="name" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" id="firstname" name="firstname" class=" small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="email" id="email" name="email" class=" small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<select id="role" name="role" class=" small" style="display:none;">'+
                                        '<option value="Membre" ' + (aData[3] == "Membre" ? "selected" : "") + '>Membre</option>'+
                                        '<option value="Editeur" ' + (aData[3] == "Editeur" ? "selected" : "") + '>Editeur</option>'+
                                        '<option value="Administrateur" ' + (aData[3] == "Administrateur" ? "selected" : "") +  '>Administrateur</option>'+
                                    '</select>';
                jqTds[4].innerHTML = '<input type="text" id="job" name="job" class=" small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = "<div class='file-field input-field'>"+
                                            "<div class='btn'>"+
                                                "<span>File</span>"+
                                                "<input type='file' name='photo' id='photo'>"+  
                                            "</div>"+
                                            "<div class='file-path-wrapper'>"+
                                                "<input class='file-path validate' type='text' value='" + image + "'>"+
                                            "</div>"+
                                        "</div>";
                jqTds[6].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[7].innerHTML = '<a class="cancel" href="">Annuler</a>';
                $('select').material_select();
                $('select').css('display', 'none');
                $("textarea.materialize-textarea").trigger("autoresize");
            }

            function saveRow(oTable, nRow, res) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate('<img src="' + res['image'] + '" style="vertical-align:middle;margin-right:5px;"><span>' + jqInputs[5].value + '</span>', nRow, 5, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 6, false);
                oTable.fnUpdate('<a class="delete" href="">Supprimer</a>', nRow, 7, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 5, false);
                oTable.fnDraw();
            }

            var oTable = $('#editable-sample-bde').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row'<'col s6'l><'col s6'f>r>t<'row'<'col s6'i><'col s6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Précédent",
                        "sNext": "Suivant"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [6,7]
                    }
                ]
            });

            jQuery('#editable-sample-bde_wrapper .dataTables_filter input').addClass(" medium"); // modify table All input
            jQuery('#editable-sample-bde_wrapper .dataTables_length select').addClass(" xsmall"); // modify table per page dropdown

            var nEditing = null;

            $('#editable-sample-bde_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Editer</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            $('body').on('click', '#editable-sample-bde a.delete', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var id_member = nRow.id.substring(2);
                $.ajax({
                    method: 'GET',
                    url: '/members/delete/' + id_member
                })
                .done(function() {
                    oTable.fnDeleteRow(nRow);
                    swal('Membre supprimé !', 'Le membre a bien été supprimé !', 'success');
                })
                .fail(function() {
                    swal('Erreur !', 'Une erreur est survenue lors de la suppression !', 'error');
                });
            });

            $('body').on('click', '#editable-sample-bde a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });
            $('body').on('click', 'label[for=searchEntry]', function(e){

              $(this).next().focus()


            })

            $('body').on('click', '#editable-sample-bde a.edit', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Sauvegarder") {
                    /* Editing this row and want to save it */
                    var id_membre = nRow.id.substring(2);
                    var form = document.getElementById('form_member');
                    var input_id = document.createElement('input');
                    input_id.type = "hidden";
                    input_id.name = "id";
                    input_id.value = id_membre;
                    form.appendChild(input_id);
                    form.submit();
                    form.removeChild(input_id);

                    setTimeout(function() {
                        var frame = document.getElementById('myFrame');
                        var result = frame.contentDocument.body.textContent;
                        var res = JSON.parse(result);
                        if (!res['errors'])
                        {
                            saveRow(oTable, nEditing, res);
                            nEditing = null;
                            swal('Membre mis à jour !', 'Le membre a bien été mis à jour !', 'success');
                        }
                        else
                        {
                            swal('Erreur !', res['errors'][0], 'error');
                        }
                    }, 1000);
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();


var TableClub = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                var id_row = nRow.id.substr(5);
                var span_value = aData[3].split("<span>");
                if (span_value[1])
                {
                    var image = span_value[1].split("</span>")[0];
                }
                else
                {
                    var image = ""
                }
                jqTds[0].innerHTML = '<input type="text" id="name" name="name_' + id_row + '" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<textarea class="required materialize-textarea" id="description" name="description_' + id_row + '">' + aData[1] + '</textarea>';
                jqTds[2].innerHTML = '<input type="text" id="president" name="president_' + id_row + '" class=" small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = "  <div class='file-field input-field'>"+
                                            "<div class='btn'>"+
                                                "<span>File</span>"+
                                                "<input type='file' name='image_club_" + id_row + "' id='image_club'>"+  
                                            "</div>"+
                                            "<div class='file-path-wrapper'>"+
                                                "<input class='file-path validate' type='text' value='" + image + "'>"+
                                            "</div>"+
                                        "</div>";
                jqTds[4].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[5].innerHTML = '<a class="cancel" href="">Annuler</a>';
                $("textarea.materialize-textarea").trigger("autoresize");
            }

            function saveRow(oTable, nRow, res) {
                var jqInputs = $('input', nRow);
                var textarea = $('textarea', nRow);
                nRow.id = 'club_' + res['id'];
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(textarea[0].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
                oTable.fnUpdate('<img src="' + res['image'] + '" style="vertical-align:middle;margin-right:5px;"><span>' + jqInputs[3].value + '</span>', nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 4, false);
                oTable.fnUpdate('<a class="delete" href="">Supprimer</a>', nRow, 5, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 3, false);
                oTable.fnDraw();
            }

            var oTable = $('#editable-sample-club').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row'<'col s6'l><'col s6'f>r>t<'row'<'col s6'i><'col s6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Précédent",
                        "sNext": "Suivant"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [4,5]
                    }
                ]
            });

            jQuery('#editable-sample-club_wrapper .dataTables_filter input').addClass(" medium"); // modify table All input
            jQuery('#editable-sample-club_wrapper .dataTables_length select').addClass(" xsmall"); // modify table per page dropdown

            var nEditing = null;

            $('#editable-sample-club_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Editer</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            $('body').on('click', '#editable-sample-club a.delete', function (e) {
                e.preventDefault();

                if (confirm("Voulez vous vraiment supprimer ce club ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var id_club = nRow.id.substring(5);
                $.ajax({
                    method: 'GET',
                    url: '/clubs/delete/' + id_club
                })
                .done(function() {
                    oTable.fnDeleteRow(nRow);
                    swal('Club supprimé !', 'Le club a bien été supprimé !', 'success');
                })
                .fail(function() {
                    swal('Erreur !', 'Une erreur est survenue lors de la suppression !', 'error');
                });
            });

            $('body').on('click', '#editable-sample-club a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            $('body').on('click', '#editable-sample-club a.edit', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Sauvegarder") {
                    /* Editing this row and want to save it */
                    var id_club = nRow.id.substring(5);
                    var form = document.getElementById('form_club');
                    var input_id = document.createElement('input');
                    input_id.type = "hidden";
                    input_id.name = "id";
                    input_id.value = id_club;
                    form.appendChild(input_id);
                    form.submit();
                    form.removeChild(input_id);

                    setTimeout(function() {
                        var frame = document.getElementById('myFrame');
                        var result = frame.contentDocument.body.textContent;
                        var res = JSON.parse(result);
                        if (!res['errors'])
                        {
                            saveRow(oTable, nEditing, res);
                            nEditing = null;
                            swal('Club mis à jour !', 'Le club a bien été mis à jour !', 'success');
                        }
                        else
                        {
                            swal('Erreur !', res['errors'][0], 'error');
                        }
                    }, 2000);
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();

var TablePartner = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                var id_row = nRow.id.substr(5);
                var span_value = aData[4].split("<span>");
                if (span_value[1])
                {
                    var image = span_value[1].split("</span>")[0];
                }
                else
                {
                    var image = ""
                }
                jqTds[1].style.width = "10%";
                jqTds[4].style.width = "30%";
                jqTds[0].innerHTML = '<input type="text" id="nom" name="nom" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<select id="typePartenaire" name="typePartenaire" class=" small" style="display:none;">'+
                                            '<option value="Parrain" ' + (aData[1] == "Parrain" ? "selected" : "") + '>Parrain</option>'+
                                            '<option value="Partenaire" ' + (aData[1] == "Partenaire" ? "selected" : "") + '>Partenaire</option>'+
                                            '<option value="Avantage" ' + (aData[1] == "Avantage" ? "selected" : "") +  '>Avantage</option>'+
                                        '</select>';
                jqTds[2].innerHTML = '<input type="text" id="adresse" name="adresse" class=" small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<textarea id="description" name="description" class=" small materialize-textarea">' + aData[3] + '</textarea>';
                jqTds[4].innerHTML = " <div class='file-field input-field'>"+
                                            "<div class='btn'>"+
                                                "<span>File</span>"+
                                                "<input type='file' name='logo' id='logo'>"+  
                                            "</div>"+
                                            "<div class='file-path-wrapper'>"+
                                                "<input class='file-path validate' type='text' value='" + image + "'>"+
                                            "</div>"+
                                        "</div>";
                jqTds[5].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[6].innerHTML = '<a class="cancel" href="">Annuler</a>';
                $('select').material_select();
                $('select').css('display', 'none');
                $("textarea.materialize-textarea").trigger("autoresize");
            }

            function saveRow(oTable, nRow, res) {
                var jqInputs = $('input', nRow);
                var textarea = $('textarea', nRow);
                nRow.id = 'p_' + res['id'];
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(textarea[0].value, nRow, 3, false);
                oTable.fnUpdate('<img src="' + res['image'] + '" style="vertical-align:middle;margin-right:5px;"><span>' + jqInputs[4].value + '</span>', nRow, 4, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 5, false);
                oTable.fnUpdate('<a class="delete" href="">Supprimer</a>', nRow, 6, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            var oTable = $('#editable-sample-partner').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row'<'col s6'l><'col s6'f>r>t<'row'<'col s6'i><'col s6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Précédent",
                        "sNext": "Suivant"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [5,6]
                    }
                ]
            });

            jQuery('#editable-sample-partner_wrapper .dataTables_filter input').addClass(" medium"); // modify table All input
            jQuery('#editable-sample-partner_wrapper .dataTables_length select').addClass(" xsmall"); // modify table per page dropdown

            var nEditing = null;

            $('#editable-sample-partner_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '', '',
                        '<a class="edit" href="">Editer</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            $('body').on('click', '#editable-sample-partner a.delete', function (e) {
                e.preventDefault();
                if (confirm("Voulez vous vraiment supprimer ce partenaire ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var idP = nRow.id.substring(2);
                $.ajax({
                    method: 'GET',
                    url: '/partenaires/delete/' + idP
                })
                .done(function() {
                    oTable.fnDeleteRow(nRow);
                    swal('Partenaire supprimé !', 'Le partenaire a bien été supprimé !', 'success');
                })
                .fail(function() {
                    swal('Erreur !', 'Une erreur est survenue lors de la suppression !', 'error');
                });
            });

            $('body').on('click', '#editable-sample-partner a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            $('body').on('click', '#editable-sample-partner a.edit', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Sauvegarder") {
                    /* Editing this row and want to save it */
                    var idP = nRow.id.substring(2);
                    var form = document.getElementById('form_partenaire');
                    var input_id = document.createElement('input');
                    input_id.type = "hidden";
                    input_id.name = "id";
                    input_id.value = idP;
                    form.appendChild(input_id);
                    form.submit();
                    form.removeChild(input_id);

                    setTimeout(function() {
                        var frame = document.getElementById('myFrame');
                        var result = frame.contentDocument.body.textContent;
                        var res = JSON.parse(result);
                        if (!res['errors'])
                        {
                            saveRow(oTable, nEditing, res);
                            nEditing = null;
                            swal('Partenaire mis à jour !', 'Le partenaire a bien été mis à jour !', 'success');
                        }
                        else
                        {
                            swal('Erreur !', res['errors'][0], 'error');
                        }
                    }, 1000);
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();

var TableNews = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="required small" value="' + aData[0] + '" id="title">';
                jqTds[1].innerHTML = '<textarea class="required materialize-textarea" id="text">' + aData[1] + '</textarea>';
                jqTds[3].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[4].innerHTML = '<a class="cancel" href="">Annuler</a>';
                $("textarea.materialize-textarea").trigger("autoresize");
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                var textarea = $('textarea', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(textarea[0].value, nRow, 1, false);

                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 3, false);
                oTable.fnUpdate('<a class="delete" href="">Supprimer</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            var oTable = $('#editable-sample-news').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 3,
                "sDom": "<'row'<'col s5'l><'col s5'f>r>t<'row'<'col s5'i><'col s5'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Précédent",
                        "sNext": "Suivant"
                    }
                },
                "aaSorting": [[2, 'desc']],
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [3,4]
                    }
                ]
            });

            jQuery('#editable-sample-news_wrapper .dataTables_filter input').addClass(" medium"); // modify table All input
            jQuery('#editable-sample-news_wrapper .dataTables_length select').addClass(" xsmall"); // modify table per page dropdown

            var nEditing = null;

            $('#editable-sample-news_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Editer</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });

            $('body').on('click', '#editable-sample-news a.delete', function (e) {
                e.preventDefault();

                if (confirm("Voulez-vous vraiment supprimer cette actualité ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var id_news = nRow.id.substring(5);
                $.ajax({
                    method: 'GET',
                    url: '/news/delete/' + id_news
                })
                .done(function() {
                    oTable.fnDeleteRow(nRow);
                    swal('Actualité supprimée !', 'L\'actualité a bien été supprimée !', 'success');
                })
                .fail(function() {
                    swal('Erreur !', 'Une erreur est survenue lors de la suppression !', 'error');
                });
            });

            $('body').on('click', '#editable-sample-news a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                }
                else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            $('body').on('click', '#editable-sample-news a.edit', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
                else if (nEditing == nRow && this.innerHTML == "Sauvegarder") {
                    /* Editing this row and want to save it */
                    var id_news = nRow.id.substring(5);

                    $.ajax({
                        method: 'GET',
                        url: '/news/update/' + id_news,
                        data: {
                                title: nRow.querySelector("#title").value,
                                text: nRow.querySelector("#text").value
                                }
                    })
                    .done(function(result) {
                        var res = parseInt(result);
                        if (res)
                        {
                            saveRow(oTable, nEditing);
                            nEditing = null;
                            swal('Actualité mise à jour !', 'L\'actualité a bien été mise à jour !', 'success');
                        }
                        else
                        {
                           swal('Erreur !', 'Tous les champs doivent être remplis !', 'error');
                        }
                    })
                    .fail(function() {
                        swal('Erreur !', 'Une erreur est survenue lors de la mise à jour de l\'actualité !', 'error');
                    });
                }
                else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();
