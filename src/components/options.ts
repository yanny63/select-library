export interface SelectOption {
    value: string
    text: string
}

export function createOptions(options: Array<SelectOption>) {
    const newOptions: Array<HTMLDivElement> = []
    options.forEach((option) => {
        const opt = document.createElement("div")
        opt.setAttribute("id", option.value)
        opt.textContent = option.text

        newOptions.push(opt)
    })

    return newOptions
}