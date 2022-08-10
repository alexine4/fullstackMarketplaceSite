import { ElementRef } from '@angular/core'

declare var M: { toast: (arg0: { html: string }) => void; TapTarget: { init: (arg0: any) => IMaterialInstance }; FloatingActionButton: { init: (arg0: any) => void }; updateTextFields: () => void; Modal: { init: (arg0: any) => IMaterialInstance }; Datepicker: { init: (arg0: any, arg1: { showClearBtn: boolean; format: string; onClose: (() => void) | undefined }) => IMaterialDatepicker }; Tooltip: { init: (arg0: any) => IMaterialInstance } }

export interface IMaterialInstance {
	open?(): void
	destroy?(): void
	close?(): void
}

export interface IMaterialDatepicker extends IMaterialInstance {
	toString?(): string
	setDate?(value: Date): Date
	date?: Date
}

export class MaterialService {
	static toast(message: string) {
		M.toast({ html: message })
	}

	static tapTarget(ref: ElementRef): IMaterialInstance {
		return M.TapTarget.init(ref.nativeElement)
	}

	static initializeFloatingButton(ref: ElementRef) {
		M.FloatingActionButton.init(ref.nativeElement)
	}

	static updateTextInput() {
		M.updateTextFields()
	}

	static initModal(ref: ElementRef): IMaterialInstance {
		return M.Modal.init(ref.nativeElement)
	}

	static initDatepicker(ref: ElementRef, onClose?: () => void): IMaterialDatepicker {
		return M.Datepicker.init(ref.nativeElement, {
			showClearBtn: true,
			format: 'dd.mm.yyyy',
			onClose
		})
	}

	static initTooltip(ref: ElementRef): IMaterialInstance {
		return M.Tooltip.init(ref.nativeElement)
	}
}