/*
    A Dojo module is wrapped with a "define" function call
*/

define(

/*
    First argument is an array of required modules
*/

[
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/on",
    "dijit/form/Textarea",
    "dijit/form/TextBox",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetBase",
    "dojo/text!./templates/BasicWidget.html"
],

/*
    Second argument is a function that maps it's args to the required items above
*/

function(
    declare, lang, attr, on, Textarea, TextBox, TemplatedMixin, WidgetBase, template
){

    /*
        Function Body - Build your widget using dojo/_base/declare.  You can have code before the declare,
        but only one thing can be returned.  In this case we are directly returning the declare.

        declare arguments:
            - (String) namespace.widgetname : This can be ommitted, but is useful when trying to find a widget in the
                dijit registry
            - (Array) List of inherited modules
            - (Object) The widget definition
    */

    return declare("tutorial.BasicWidget", [WidgetBase, TemplatedMixin], {

        // baseClass : CSS class name that will be applied to the domNode of the widget
        baseClass : "basicWidget",

        // templateString : ./templates/BasicWidget.html, the html template used for rendering the widget
        templateString: template,

        /*
            postCreate : The step in the widget lifecycle after constructor and buildRendering are called,
            and after properties provided via constructor args are mixed into the object
        */
        postCreate : function(){
            /*
                Try not to have an abundance of logic in postCreate, just use it to set properties or call methods
            */
            this._buildControls();
            this._attachEventHandlers();

            // Since we inherited WidgetBase and TemplatedMixin, this will chain the postCreate call down to the base modules
            this.inherited(arguments);
        },

        _buildControls : function(){

            // Create some widgets and insert them into BasicWidget's dom

            this.textBoxOne = new TextBox({
                placeHolder : "BasicWidget.textBoxOne"
            }, this.textBoxOneNode);

            this.textBoxTwo = new TextBox({
                placeHolder : "BasicWidget.textBoxTwo"
            }, this.textBoxTwoNode);

            this.textarea = new Textarea({
                placeHolder : "Value will be injected here",
                readOnly : true
            }, this.textareaNode);
        },

        _attachEventHandlers : function(){
            /*
                dojo/on is the main connection module for event handling
                - on(target, event, callBack function)

                lang.hitch(context, function) (dojo/_base/lang)
                - hitches a context to a callback function, without the hitch, BasicWidget._actionButtonClickEventHandler
                  would execute in the context which fired the click event, usually the global "window" object/
                  Since we are hitching it to "this", it will execute in this instance of BasicWidget's context

                *Note : Context is of VITAL importance in JavaScript, always be aware of the context in which your logic
                will be executed!!!
            */
            on(this.actionButton, "click", lang.hitch(this, this._actionButtonClickEventHandler));
        },

        _actionButtonClickEventHandler : function(evt){
            // Get the value of this instance of BasicWidget and place it in the textarea
            var value = this.get("value");
            this.textarea.set("value", value);
        },

        /*
            Getter and Setters

            Uses naming convention _setYouPropertyNameAttr / _getYourPropertyNameAttr. _WidgetBase knows how to
            interpret/route the requests when:
            -BasicWidget.get("yourPropertyName")
            -BasicWidget.set("yourPropertyName", value)
            are called
        */

        _setCustomSetterValueAttr : function(customSetterValue){
            /*
                This type of setter sets the widget instance's prop value and injects a value into
                the innerHTML attribute of a specified node
            */
            this.customSetterValue = customSetterValue;

            // using dojo/dom-attr, but is equivalent to this.customSetterNode.innerHTML = this.customSetterValue
            attr.set(this.customSetterNode, "innerHTML", this.customSetterValue);
        },

        _getCustomSetterValueAttr : function(){
            // Basic getter, not really necessary unless you want to "do" something before returning the value
            return this.customSetterValue;
        },

        // Mapped setter, _WidgetBase knows what to do with it
        _setMappedSetterValueAttr : {
            node : "mappedSetterNode",
            type : "innerHTML"
        },

        _getMappedSetterValueAttr : function(){
            return this.mappedSetterValue;
        },

        /*
            Value Getter:
            In this example I am grabbing the value of our two text boxes, concatenating them with a pipe, and returning
            the new string
        */
        _getValueAttr : function(){
            return  this.textBoxOne.get("value") + " | " + this.textBoxTwo.get("value");
        }

    });

});