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
			 ContentPane,
			 template) {
	

	return declare('CM5JavaScriptUtils.formGenerator', [_WidgetBase, _TemplatedMixin], {
		constructor: function (arguments) {
			console.log('FormGenerator!!');
			console.log('arguments: ', arguments);

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
				console.log('formDataItem: ', formDataItem);

				var FormItemType = formGenerator.checkFormFieldType(formDataItem.type);
				// console.log('FormItemType: ', FormItemType);

				switch (formDataItem.type) {
					case 'radio':
						formGenerator.generateRadioButtons(FormItemType, formGeneratorTable, formDataItem);
						break;
					case 'checkbox':
						formGenerator.generateCheckboxes(FormItemType, formGeneratorTable, formDataItem);
						break;
					default:
						formGenerator.generateDefaultText(FormItemType, formGeneratorTable, formDataItem);
				}
				
			});
			formGeneratorTable.startup();
		},

		checkFormFieldType: function(formFieldType) {
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
				default:
					fieldType = TextBox;
			}
			return fieldType;
		},

		generateRadioButtons: function(RadioItemType, formGeneratorTable, formDataItem) {
			var radioButtonWrapper = new ContentPane({
				title: formDataItem.label,
			});
			// console.log('radioButtonWrapper: ', radioButtonWrapper);
			arrayUtil.forEach(formDataItem.config, function (radioButtonItem) {
				var radioButtonLabelWrapper = new ContentPane();
	
				var radioButton = new RadioItemType({
					title: radioButtonItem.label,
					name: formDataItem.dojoAttachPoint,
				});
	
				if(radioButtonItem.dojoAttachPoint) {
					domAttr.set(radioButton, 'data-dojo-attach-point', radioButtonItem.dojoAttachPoint);
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
			var radioButtonWrapper = new ContentPane({
				title: formDataItem.label,
			});
	
			arrayUtil.forEach(formDataItem.config, function (radioButtonItem) {
				var radioButtonLabelWrapper = new ContentPane();
	
				var radioButton = new CheckboxItemType({
					title: radioButtonItem.label,
					name: formDataItem.dojoAttachPoint,
				});
	
				if(radioButtonItem.dojoAttachPoint) {
					domAttr.set(radioButton, 'data-dojo-attach-point', radioButtonItem.dojoAttachPoint);
				}
	
				if(radioButtonItem.label !== undefined) {
					var radioLabel = domConstruct.create('label', {
						for: radioButton.id,
						innerHTML: radioButtonItem.label
					}, radioButtonLabelWrapper.domNode);
	
					domStyle.set(radioLabel, {
						float: 'left',
						marginRight: '.5em'
					});
				}
	
				domStyle.set(radioButton.domNode, {
					float: 'left'
				});
				domStyle.set(radioButtonLabelWrapper.domNode, {
					display: 'block',
					clear: 'both'
				});
	
				radioButtonLabelWrapper.addChild(radioButton);
				radioButtonWrapper.addChild(radioButtonLabelWrapper);
			});
			formGeneratorTable.addChild(radioButtonWrapper);
		},
		
		generateDefaultText: function(FormItemType, formGeneratorTable, formDataItem) {
			var formItem = new FormItemType({
				label: formDataItem.label,
				type: formDataItem.type,
				name: formDataItem.dojoAttachPoint
			});
			// console.log('formItem: ', formItem);
			if(formDataItem.dojoAttachPoint) {
				domAttr.set(formItem, 'data-dojo-attach-point', formDataItem.dojoAttachPoint);
			}
			formGeneratorTable.addChild(formItem);
		}
		
		
	});
});
