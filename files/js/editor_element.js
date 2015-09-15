/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
	var CodeEditor = PlatformElement.extend({
		/**
		 * PlatformElement initialization. Code to setup the 
		 * element should go here.
		 */
		initialize: function() {
			/**
			 * Call to setup code editor
			 */
			this.setUpEditor();
		},

		/**
		 * Function to setup the editor
		 */
		setUpEditor: function() {
			var view = this;

			/**
			 * Finds `#code-block` within the element's DOM ($el) and replaces
			 * it with a CodeMirror code editor.
			 *
			 * NOTE: It is important to use `view.$el` when doing DOM manipulation
			 * on your platform element so that other elements do not get
			 * unintentionally modified.
			 * 
			 * @type {Object}
			 */
			view.editor = CodeMirror.fromTextArea(view.$el.find('.code-block')[0], {
				lineNumbers: false
			});

			/**
			 * Add extra key bindings to the editor
			 */
			view.editor.setOption("extraKeys", {
				/*
				 * When Ctrl-S is pressed, the settings model is updated
				 * with the contents of the editor and the model is then
				 * saved to the server.
				 */
				'Ctrl-S': function() {
					view.settings.set('code', view.editor.getValue());
					view.settings.save();
				}
			});

			/**
			 * Set editor's content
			 */
			view.editor.setValue(view.settings.get('code'));

			/**
			 * On editor change, update settings.
			 * @param {Event}
			 * @param {Callback}
			 */
			view.editor.on('change', function(obj) {
				view.settings.set('code', view.editor.getValue());
			});
			
			/**
			 * On editor blur, save settings changes.
			 * @param {Event}
			 * @param {Callback}
			 */
			view.editor.on('blur', function() {
				view.settings.save();
			});

			/**
			 * Set max-height on the editor container
			 */
			view.$el.find('.CodeMirror-scroll').css('max-height', view.settings.get('height') + 'px');
		}
	});

	return CodeEditor;
})();