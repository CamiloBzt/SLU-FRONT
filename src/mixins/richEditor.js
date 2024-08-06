//ACCIONES SOBRE EL TEXTO
export const textActions = {
	data() {
    return {
    	bold: false,
      italic: false,
      underline: false,
      alignRight: false,
      alignLeft: false,
      alignJusty: false,
      alignCenter: false
    }
  },
	methods: {
		activeEditor(typeEvent) {
      switch (typeEvent) {
        case 'bold':
          this.bold = !this.bold
          this.editor.chain().focus().toggleBold().run()
          break

        case 'italic':
          this.italic = !this.italic
          this.editor.chain().focus().toggleItalic().run()
          break

        case 'underline':
          this.underline = !this.underline
          this.editor.chain().focus().toggleUnderline().run()
          break

        case 'alignCenter':
          this.alignCenter = !this.alignCenter
          this.alignJusty = false
          this.alignRight = false
          this.alignLeft = false
          this.editor.chain().focus().setTextAlign('center').run()
          break

        case 'alignJusty':
          this.alignJusty = !this.alignJusty
          this.alignRight = false
          this.alignLeft = false
          this.alignCenter = false
          this.editor.chain().focus().setTextAlign('justify').run()
          break

        case 'alignRight':
          this.alignRight = !this.alignRight
          this.alignLeft = false
          this.alignJusty = false
          this.alignCenter = false
          this.editor.chain().focus().setTextAlign('right').run()
          break

        case 'alignLeft':
          this.alignLeft = !this.alignLeft
          this.alignRight = false
          this.alignJusty = false
          this.alignCenter = false
          this.editor.chain().focus().setTextAlign('left').run()
          break
      }
    },
  }
}