import { NoOptionsError } from "../utils/errors"
import { createOptions, createInput, SelectOption } from "./options"

interface SelectArguments {
    select: HTMLSelectElement
    placeholder?: string
    multiple?: boolean
}

export class Select {
    private select: HTMLSelectElement
    private placeholder: string
    private multiple: boolean
    private container: HTMLDivElement
    private inputContainer: HTMLLabelElement
    private optionsContainer: HTMLDivElement
    private input: HTMLInputElement | null
    private options: Array<HTMLDivElement> // available options
    private selectedContainer: HTMLDivElement
    private selectedValues: Array<SelectOption> = [] // currently selected options

    constructor(args: SelectArguments) {
        this.select = args.select
        this.placeholder = args?.placeholder ?? ""
        this.multiple = args?.multiple ?? false

        this.container = document.createElement("div")
        this.container.classList.add("select-main")

        this.select.insertAdjacentElement("afterend", this.container)
        this.select.style.display = "none"

        const { inputContainer } = createInput()

        this.inputContainer = inputContainer

        this.container.append(this.inputContainer)

        this.selectedContainer = document.createElement("div")
        this.selectedContainer.classList.add("selected-main")
        this.inputContainer.append(this.selectedContainer)

        this.input = document.querySelector("#select")

        this.optionsContainer = document.createElement("div")
        this.optionsContainer.classList.add("options")
        this.container.append(this.optionsContainer)

        this.options = this._options()
        this._createPlaceholder()
        this._optionsListeners()
    }

    get getSelectId() {
        return this.select
    }

    get values(): SelectOption[] {
        return this.selectedValues
    }

    set values(values: SelectOption[]) {
        this.selectedValues = values
        this._updateSelectedOptions()
    }

    private _updateSelectedOptions() {
        const options = this.container.querySelectorAll<HTMLDivElement>("[id]")

        options.forEach((option) => {
            const selected = this.selectedValues.some(value => (
                value.value === option.id
            ))

            option.classList.toggle("selected", selected)
        })
    }

    private _options() {
        const options: NodeListOf<HTMLOptionElement> = document.querySelectorAll(`#${this.select.id} option`)
        if (options.length === 0) {
            throw new NoOptionsError(this.select.id)
        }
        const arr: Array<SelectOption> = Array.from(options).map(opt => ({
            value: opt.value,
            text: opt.textContent ?? ""
        }))
        const newOptions: Array<HTMLDivElement> = createOptions(arr)
        
        newOptions.forEach((option) => {
            this.optionsContainer.append(option)
        })

        return newOptions
    }

    private _optionsListeners() {
        this.options.forEach((option) => {
            option.addEventListener("mousedown", (e) => {
                e.preventDefault()
            })

            option.addEventListener("click", () => {
                if (!this.multiple && this.selectedValues.length >= 1) {
                    const div = document.querySelector<HTMLDivElement>(`#${this.selectedValues[0].value}`)
                    if (!div) {
                        throw new Error()
                    }
                    this._removeSelected(div)
                }
                if (!option.classList.contains("selected")) {
                    option.classList.add("selected")
                    const opt: SelectOption = {value: option.id, text: option.textContent}
                    this.selectedValues.push(opt)
                    this.optionsContainer.removeChild(option)
                    this._handleSelect(option)
                }
            })
        })
    }

    private _handleSelect(option: HTMLDivElement) {
        const container = document.createElement("div")
        const button = document.createElement("button")
        container.classList.add("selected-container")
        button.classList.add("selected-button")
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>`

        button.addEventListener("click", () => {
            this._removeSelected(option)
        })
        container.append(option)
        container.append(button)
        this.selectedContainer.append(container)
        this._updatePlaceholder()
    }

    private _removeSelected(option: HTMLDivElement) {
        option.nextElementSibling?.remove()
        option.parentElement?.remove()
        option.classList.remove("selected")
        this.selectedValues = this.selectedValues.filter(
            value => value.value !== option.id
        )
        this.optionsContainer.append(option)
        this._updatePlaceholder()
    }

    private _createPlaceholder() {
        const span = document.createElement("span")
        span.innerText = this.placeholder
        span.classList.add("select-placeholder")
        this.inputContainer.append(span)
    }
    private _updatePlaceholder() {
        const span = document.querySelector<HTMLSpanElement>(".select-placeholder")
        if (this.selectedValues.length >= 1 && span) {
            span.style.display = "none"
        }
        else if (this.selectedValues.length === 0 && span) {
            span.style.display = ""
        }
    }

    resetValues() {
        this.selectedValues.forEach((value) => {
            const div = document.querySelector<HTMLDivElement>(`#${value.value}`)
            if (!div) {
                throw new Error(`Could not find the correct container for the selected value (${value.value})`)
            }
            this._removeSelected(div)
        })
    }
}