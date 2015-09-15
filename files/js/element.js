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
			 * Editor is read-only when viewed on a published site.
			 * 
			 * NOTE: It is important to use `view.$el` when doing DOM manipulation
			 * on your platform element so that other elements do not get
			 * unintentionally modified.
			 * 
			 * @type {Object}
			 */
			view.editor = CodeMirror.fromTextArea(this.$el.find('.code-block')[0], {
				lineNumbers: false,
				readOnly: true
			});

			/**
			 * Set editor's content
			 */
			view.editor.setValue(view.settings.get('code'));

			/**
			 * Set max-height on the editor container
			 */
			view.$el.find('.CodeMirror-scroll').css('max-height', view.settings.get('height') + 'px');
		}
	});

	return CodeEditor;
})();