
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
                jqTds[0].innerHTML = '<input type="text" id="name" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" id="description" class=" small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" id="description" class=" small" value="' + aData[1] + '">';
                jqTds[3].innerHTML = '<input type="text" id="president" class=" small" value="' + aData[2] + '">';
                jqTds[4].innerHTML = '<input type="text" id="photo" class=" small" value="' + aData[3] + '">';
                jqTds[5].innerHTML = '<input type="text" class=" small" value="' + aData[4] + '">';
                jqTds[6].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[7].innerHTML = '<a class="cancel" href="">Annuler</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 4, false);
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
                oTable.fnUpdate(jqInputs[4].value, nRow, 3, false);
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
                        'aTargets': [5,6]
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
                var id_member = nRow.id.substring(5);
                $.ajax({
                    method: 'GET',
                    url: '/news/delete/' + id_nember
                })
                .done(function() {
                    oTable.fnDeleteRow(nRow);
                    swal('Actualité supprimée !', 'L\'actualité a bien été supprimée !', 'success');
                })
                .fail(function() {
                    swal('Erreur !', 'Une erreur est survenue lors de la suppression !', 'error');
                });
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
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
                    saveRow(oTable, nEditing);
                    nEditing = null;

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
                jqTds[0].innerHTML = '<input type="text" id="name" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<textarea class="required materialize-textarea" id="description">' + aData[1] + '</textarea>';
                jqTds[2].innerHTML = '<input type="text" id="president" class=" small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = "  <div class='file-field input-field'>"+
                                            "<div class='btn'>"+
                                                "<span>File</span>"+
                                                "<input type='file' name='image_club' id='image_club' value='"+ aData[3] + "'>"+
                                            "</div>"+
                                            "<div class='file-path-wrapper'>"+
                                                "<input class='file-path validate' type='text'>"+
                                            "</div>"+
                                        "</div>";
                jqTds[4].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[5].innerHTML = '<a class="cancel" href="">Annuler</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                var textarea = $('textarea', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(textarea[0].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Editer</a>', nRow, 4, false);
                oTable.fnUpdate('<a class="delete" href="">Supprimer</a>', nRow, 5, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
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
                    swal('Actualité supprimée !', 'L\'actualité a bien été supprimée !', 'success');
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
                    $.ajax({
                        method: 'GET',
                        url: '/clubs/update/' + id_club,
                        data: {
                                name: nRow.querySelector("#name").value,
                                description: nRow.querySelector("#description").value,
                                president: nRow.querySelector("#president").value,
                                photo: nRow.querySelector("#image_club").value
                                }
                    })
                    .done(function(result) {
                        var res = parseInt(result);
                        if (res)
                        {
                            saveRow(oTable, nEditing);
                            nEditing = null;
                            swal('Actualité mise à jour !', 'Le club a bien été mise à jour !', 'success');
                        }
                        else
                        {
                           swal('Erreur !', 'Tous les champs doivent être remplis !', 'error');
                        }
                    })
                    .fail(function() {
                        swal('Erreur !', 'Une erreur est survenue lors de la mise à jour de l\'actualité !', 'error');
                    });
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
                jqTds[0].innerHTML = '<input type="text" id="nom" class=" small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" id="typePartenaire" class=" small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" id="adresse" class=" small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" id="description" class=" small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<input type="text" id="photo" class=" small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<a class="edit" href="">Sauvegarder</a>';
                jqTds[6].innerHTML = '<a class="cancel" href="">Annuler</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
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
                        'aTargets': [0]
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
                var id_partenaire = nRow.id.substring(2);
                $.ajax({
                    method: 'GET',
                    url: '/partenaires/delete/' + id_partenaire
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
                    if(idP.length==0)
                    {
                      $.ajax({
                          method: 'GET',
                          url: '/partenaires/create/',
                          data: {
                                  nom: nRow.querySelector("#nom").value,
                                  description: nRow.querySelector("#description").value,
                                  typePartenaire: nRow.querySelector("#typePartenaire").value,
                                  adresse: nRow.querySelector("#adresse").value
                                  }
                      })
                      .done(function(result) {
                          var res = parseInt(result);
                          if (res)
                          {
                              saveRow(oTable, nEditing);
                              nEditing = null;
                              swal('Partenaire créé !', 'Le partenaire a bien été créé !', 'success');
                          }
                          else
                          {
                             swal('Erreur !', 'Tous les champs doivent être remplis !', 'error');
                          }
                      })
                      .fail(function() {
                          swal('Erreur !', 'Une erreur est survenue lors de la création du partenaire !', 'error');
                      });
                    }
                    else {
                      $.ajax({
                          method: 'GET',
                          url: '/partenaires/update/' + idP,
                          data: {
                                  nom: nRow.querySelector("#nom").value,
                                  description: nRow.querySelector("#description").value,
                                  typePartenaire: nRow.querySelector("#typePartenaire").value,
                                  adresse: nRow.querySelector("#adresse").value
                                  }
                      })
                      .done(function(result) {
                          var res = parseInt(result);
                          if (res)
                          {
                              saveRow(oTable, nEditing);
                              nEditing = null;
                              swal('Partenaire mise à jour !', 'Le partenaire a bien été mit à jour !', 'success');
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
