import { NoOptionsError } from "../utils/errors"
import { createOptions, SelectOption } from "./options"

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
    private classTag = "select-main"

    constructor(args: SelectArguments) {
        this.select = args.select
        this.placeholder = args?.placeholder ?? ""
        this.multiple = args?.multiple ?? false

        this.container = document.createElement("div")
        this.container.classList.add(this.classTag)

        this.select.insertAdjacentElement("afterend", this.container)
        this.select.style.display = "none"

    }

    get getSelectId() {
        return this.select
    }

    options() {
        const options: NodeListOf<HTMLOptionElement>= document.querySelectorAll(`#${this.select.id} option`)
        if (options.length === 0) {
            throw new NoOptionsError(this.select.id)
        }
        const arr: Array<SelectOption> = Array.from(options).map(opt => ({
            value: opt.value,
            text: opt.textContent ?? ""
        }))
        const newOptions: Array<HTMLDivElement> = createOptions(arr)

        newOptions.forEach((option) => {
            this.container.append(option)
        })
    }
}