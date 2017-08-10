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
    
    var formFieldConfig = [
            {
                type: 'text',
                label: 'Solution',
                dojoAttachPoint: 'folderSolution',
                value: 'Google',
                dojoProps: {
                    disabled: true,
                    trim: true,
                    maxLength: 10
                }
            },
            {
                type: 'text',
                label: 'Folder configuratie ID',
                dojoAttachPoint: 'folderConfigID',
                dojoProps: {
                    disabled: true
                }
            },
            {
                type: 'radio',
                label: 'Is parent aanmaken',
                name: 'folderIsCreateParent',
                dojoAttachPoint: 'folderIsCreateParent',
                config: [
                    {
                        label: 'Ja',
                        dojoAttachPoint: 'folderIsCreateParentJa',
                        value: '1',
                        checked: true
                    },
                    {
                        label: 'Nee',
                        dojoAttachPoint: 'folderIsCreateParentNee',
                        value: '0'
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
                        dojoAttachPoint: 'folderIsNameFaseAliasJa',
                        value: '1',
                        checked: true
                    },
                    {
                        label: 'Nee',
                        dojoAttachPoint: 'folderIsNameFaseAliasNee',
                        value: '0'
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
                        value: '1',
                        checked: true,
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
                        value: '1',
                        checked: true,
                    },{
                        label: 'Optie 2',
                        value: '2'
                    },{
                        label: 'Optie 3',
                        value: '3',
                        checked: true,
                    },{
                        label: 'Optie 4',
                        value: '4'
                    },
                ]
            },
            {
                type: 'select',
                label: 'Selectbox',
                name: 'folderSelection',
                dojoAttachPoint: 'folderSelection',
                config: [
                    {
                        label: 'Select 1',
                        value: '1'
                    },{
                        label: 'Select 2',
                        value: '2',
                        selected: true
                    },{
                        label: 'Select 3',
                        value: '3'
                    },{
                        label: 'Select 4',
                        value: '4'
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
                value: 'RayRay',
                dojoProps: {
                    disabled: true
                }
            },
            {
                type: 'date',
                label: 'Aangepast door',
                dojoAttachPoint: 'folderLastModifiedBy',
                dojoProps: {
                    disabled: true
                }
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