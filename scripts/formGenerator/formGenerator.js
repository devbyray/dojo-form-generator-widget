define([
	'dojo/dom',
	'dojo/_base/array',
	'dojo/_base/declare',
	'dojo/_base/fx',
	'dojo/_base/lang',
	'dojo/dom-style',
	'dojo/dom-construct',
	'dojo/mouse',
	'dojo/on',
	'dojo/dom-attr',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojox/layout/TableContainer',
	'dijit/form/TextBox',
	'dijit/form/DateTextBox',
	'dijit/form/RadioButton',
	'dijit/form/CheckBox',
	'dijit/form/Select',
	'dijit/layout/ContentPane',
	'dojo/text!./templates/formGenerator.html'
], function (dom,
			 arrayUtil,
			 declare,
			 baseFx,
			 lang,
			 domStyle,
			 domConstruct,
			 mouse,
			 on,
			 domAttr,
			 _WidgetBase,
			 _TemplatedMixin,
			 TableContainer,
			 TextBox,
			 DateTextBox,
			 RadioButton,
			 CheckBox,
			 Select,
			 ContentPane,
			 template) {
	

	return declare('CM5JavaScriptUtils.formGenerator', [_WidgetBase, _TemplatedMixin], {
		constructor: function (arguments) {
			this.formGeneratorArguments = arguments;
		},

		// baseClass : CSS class name that will be applied to the domNode of the widget
		baseClass : 'form-generator__table-wrapper',
		widgetsInTemplate: true,

		// templateString : ./templates/BasicWidget.html, the html template used for rendering the widget
		templateString: template,

		postCreate: function(){
			console.log('postCreate!!');
			// Get a DOM node reference for the root of our widget
			var domNode = this.domNode;
			var formGenerator = this;

			// Run any parent postCreate processes - can be done at any point
			this.inherited(arguments);

			var formGeneratorTable = new TableContainer({
				cols: 1,
				customClass:'form-generator',
				labelWidth: '150'
			}, this.formGenerator);


			arrayUtil.forEach(this.formGeneratorArguments.formFields, function (formDataItem) {

				var FormItemType = formGenerator.getFormFieldTypeInstance(formDataItem.type);

				switch (formDataItem.type) {
					case 'radio':
						formGenerator.generateRadioButtons(FormItemType, formGeneratorTable, formDataItem);
						break;
					case 'checkbox':
						formGenerator.generateCheckboxes(FormItemType, formGeneratorTable, formDataItem);
						break;
					case 'select':
						formGenerator.generateSelectBox(FormItemType, formGeneratorTable, formDataItem);
						break;
					default:
						formGenerator.generateDefaultText(FormItemType, formGeneratorTable, formDataItem);
				}

			});
			formGeneratorTable.startup();
		},

		getFormFieldTypeInstance: function(formFieldType) {
			var fieldType = null;
			switch (formFieldType) {
				case 'date':
					fieldType = DateTextBox;
					break;
				case 'radio':
					fieldType = RadioButton;
					break;
				case 'checkbox':
					fieldType = CheckBox;
					break;
				case 'select':
					fieldType = Select;
					break;
				default:
					fieldType = TextBox;
			}
			return fieldType;
		},

		setDojoProps: function (formFieldItem, dojoPropsObject) {
			Object.keys(dojoPropsObject).forEach(function(dojoPropValue){
				formFieldItem.set(dojoPropValue, dojoPropsObject[dojoPropValue]);
			});
		},

		generateRadioButtons: function(RadioItemType, formGeneratorTable, formDataItem) {
			var formGenerator = this;

			var radioButtonWrapper = new ContentPane({
				title: formDataItem.label
			});

			arrayUtil.forEach(formDataItem.config, function (radioButtonItem) {
				var radioButtonLabelWrapper = new ContentPane();
	
				var radioButton = new RadioItemType({
					title: radioButtonItem.label,
					name: formDataItem.dojoAttachPoint,
					value: radioButtonItem.value,
					checked: radioButtonItem.checked || false
				});
	
				if(radioButtonItem.dojoAttachPoint) {
					domAttr.set(radioButton, 'data-dojo-attach-point', radioButtonItem.dojoAttachPoint);
				}

				if(radioButtonItem.dojoProps) {
					formGenerator.setDojoProps(radioButton, radioButtonItem.dojoProps);
				}
	
				var radioLabel = domConstruct.create('label', { for: radioButton.id, innerHTML: radioButtonItem.label}, radioButtonLabelWrapper.domNode);
	
				domStyle.set(radioButton.domNode, {
					float: 'left'
				});

				domStyle.set(radioLabel, {
					float: 'left',
					marginRight: '.5em'
				});
	
				radioButtonLabelWrapper.addChild(radioButton);
				radioButtonWrapper.addChild(radioButtonLabelWrapper);
			});

			formGeneratorTable.addChild(radioButtonWrapper);
		},
		
		generateCheckboxes: function(CheckboxItemType, formGeneratorTable, formDataItem) {
			var formGenerator = this;

			var checkBoxWrapper = new ContentPane({
				title: formDataItem.label,
			});

			arrayUtil.forEach(formDataItem.config, function (checkBoxItem) {
				var checkBoxLabelWrapper = new ContentPane();
	
				var checkBox = new CheckboxItemType({
					title: checkBoxItem.label,
					name: formDataItem.dojoAttachPoint,
					value: checkBoxItem.value,
					checked: checkBoxItem.checked || false
				});
	
				if(checkBoxItem.dojoAttachPoint) {
					domAttr.set(checkBox, 'data-dojo-attach-point', checkBoxItem.dojoAttachPoint);
				}

				if(checkBoxItem.dojoProps) {
					formGenerator.setDojoProps(checkBox, checkBoxItem.dojoProps);
				}
	
				if(checkBoxItem.label !== undefined) {
					var radioLabel = domConstruct.create('label', {
						for: checkBox.id,
						innerHTML: checkBoxItem.label
					}, checkBoxLabelWrapper.domNode);
	
					domStyle.set(radioLabel, {
						float: 'left',
						marginRight: '.5em'
					});
				}
	
				domStyle.set(checkBox.domNode, {
					float: 'left'
				});
				domStyle.set(checkBoxLabelWrapper.domNode, {
					display: 'block',
					clear: 'both'
				});
	
				checkBoxLabelWrapper.addChild(checkBox);
				checkBoxWrapper.addChild(checkBoxLabelWrapper);
			});

			formGeneratorTable.addChild(checkBoxWrapper);
		},
		
		generateDefaultText: function(FormItemType, formGeneratorTable, formDataItem) {
			var formItem = new FormItemType({
				label: formDataItem.label,
				type: formDataItem.type,
				name: formDataItem.dojoAttachPoint,
				value: formDataItem.value || null
			});

			if(formDataItem.dojoAttachPoint) {
				domAttr.set(formItem, 'data-dojo-attach-point', formDataItem.dojoAttachPoint);
			}

			if(formDataItem.dojoProps) {
				this.setDojoProps(formItem, formDataItem.dojoProps);
			}

			formGeneratorTable.addChild(formItem);
		},
		
		generateSelectBox: function(SelectItemType, formGeneratorTable, formDataItem) {
			var formItem = new SelectItemType({
				label: formDataItem.label,
				type: formDataItem.type,
				name: formDataItem.dojoAttachPoint,
				options: formDataItem.config,
			});

			if(formDataItem.dojoAttachPoint) {
				domAttr.set(formItem, 'data-dojo-attach-point', formDataItem.dojoAttachPoint);
			}

			if(formDataItem.dojoProps) {
				this.setDojoProps(formItem, formDataItem.dojoProps);
			}

			formGeneratorTable.addChild(formItem);
		}
		
		
	});
});
