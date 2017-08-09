require([
    "tutorial/BasicWidget",
    "formGenerator/formGenerator",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/on",
    "dijit/Dialog",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
], function(
    BasicWidget,
    FormGenerator,
    dom,
    domConstruct,
    on,
    Dialog,
    ContentPane,
    ready){
    var basicWidget, dialog, editForm;

    basicWidget = new BasicWidget({
        customSetterValue : "custom setter value",
        mappedSetterValue : "mapped setter value",
        buildTimeSetterValue : "build time setter value"
    });

    var dijitType = {
        dialog: 'dijit/Dialog',
        text: 'dijit/form/TextBox',
        radio: 'dijit/form/RadioButton',
        date: 'dijit/form/DateTextBox',
        button: 'dijit/form/Button',
    };

    var formFieldConfig = [
            {
                type: 'text',
                label: 'Solution',
                dojoAttachPoint: 'folderSolution',
                dojoProps: [
                    'disabled:false', 'trim:true', 'maxLength:10',
                ]
            },
            {
                type: 'text',
                label: 'Folder configuratie ID',
                dojoAttachPoint: 'folderConfigID'
            },
            {
                type: 'radio',
                label: 'Is parent aanmaken',
                name: 'folderIsCreateParent',
                dojoAttachPoint: 'folderIsCreateParent',
                config: [
                    {
                        label: 'Ja',
                        dojoAttachPoint: 'folderIsCreateParentJa'
                    },
                    {
                        label: 'Nee',
                        dojoAttachPoint: 'folderIsCreateParentNee'
                    }
                ]
            },
            {
                type: 'radio',
                label: 'Is naam fase alias',
                name: 'folderIsNameFaseAlias',
                dojoAttachPoint: 'folderIsNameFaseAlias',
                config: [
                    {
                        label: 'Ja',
                        dojoAttachPoint: 'folderIsNameFaseAliasJa'
                    },
                    {
                        label: 'Nee',
                        dojoAttachPoint: 'folderIsNameFaseAliasNee'
                    }
                ]
            },
            {
                type: 'checkbox',
                label: 'Is actief',
                name: 'folderIsActive',
                dojoAttachPoint: 'folderIsActive',
                config: [
                    {
                        // label: 'Ja',
                        dojoAttachPoint: 'folderIsActiveCheckbox'
                    }
                ]
            },
            {
                type: 'checkbox',
                label: 'Opties',
                name: 'folderOptions',
                dojoAttachPoint: 'folderOptions',
                config: [
                    {
                        label: 'Optie 1',
                        dojoAttachPoint: 'folderOption1'
                    },{
                        label: 'Optie 2',
                        dojoAttachPoint: 'folderOption2'
                    },{
                        label: 'Optie 3',
                        dojoAttachPoint: 'folderOption3'
                    },{
                        label: 'Optie 4',
                        dojoAttachPoint: 'folderOption4'
                    },
                ]
            },
            {
                type: 'text',
                label: 'Parent folder klasse',
                dojoAttachPoint: 'folderParentFolderClass'
            },
            {
                type: 'text',
                label: 'Standaard subfolder klasse',
                dojoAttachPoint: 'folderParentFolderClass'
            },
            {
                type: 'text',
                label: 'Aangepast op',
                dojoAttachPoint: 'folderLastModifiedDate',
                dojoProps: [
                    'disabled:true'
                ]
            },
            {
                type: 'date',
                label: 'Aangepast door',
                dojoAttachPoint: 'folderLastModifiedBy',
                dojoProps: [
                    'disabled:true'
                ]
            }
    ];

    editForm = new FormGenerator({
        formFields: formFieldConfig
    });

    var formPane = new ContentPane({
        content: editForm
    });

    domConstruct.place(formPane.domNode, this.newForm);

    formPane.addChild(editForm);
});