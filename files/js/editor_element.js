/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
	var CodeBlock = PlatformElement.extend({
		/**
		 * PlatformElement initialization. Code to setup the 
		 * element should go here.
		 */
		initialize: function() {
			this.theme = this.settings.get('style') == 'light' ? 'tomorrow' : 'tomorrow_night_eighties';

			/**
			 * The script are not defined in the manifest 
			 * so that 6mb of scripts are not laoded. This 
			 * allows us to load only scripts needed for 
			 * each language and theme.
			 */
			$.when(
				$.getScript(this.assets_path + 'mode-' + this.settings.get('syntax') + '.js'),
				$.getScript(this.assets_path + 'theme-' + this.theme + '.js')
			).done(function() {
				/**
				 * After the scripts are loaded, we can
				 * then make the call to setup the editor.
				 */
				this.setUpEditor();
			}.bind(this));
		},

		/**
		 * Function to setup the editor
		 */
		setUpEditor: function() {
			this.editor = ace.edit(this.$el.find('.editor')[0]);
			this.editor.setValue(this.settings.get('code'), -1);

			this.editor.setTheme('ace/theme/' + this.theme);
			this.editor.getSession().setMode('ace/mode/' + this.settings.get('syntax'));

			this.editor.container.style.lineHeight = '26px';
			this.editor.container.style.fontSize = '14px';
			this.editor.renderer.setScrollMargin(20, 20);

			this.editor.setOptions({
				'highlightActiveLine': this.settings.get('highlight_active_line'),
				'readOnly': false
			});

			this.editor.renderer.setOptions({
				'showGutter': this.settings.get('show_gutter'),
				'maxLines': this.settings.get('max_lines'),
				'minLines': this.settings.get('min_lines'),
				'displayIndentGuides': this.settings.get('display_indent_guides')
			});

			this.editor.session.setOptions({
				'wrap': this.settings.get('line_wrap'),
				'useSoftTabs': this.settings.get('use_soft_tabs')
			});

			/**
			 * Save code on editor change event.
			 */
			this.editor.on('change', function(e) {
				var value = this.editor.getValue();
				this.settings.set('code', value);
				this.settings.save();
			}.bind(this));
		}
	});

	return CodeBlock;
})();