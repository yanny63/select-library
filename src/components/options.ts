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
        opt.classList.add("option")
        newOptions.push(opt)
    })

    return newOptions
}

export function createInput() {
    const main = document.createElement("label")
    main.classList.add("select-input-container")
    main.setAttribute("for", "select")

    main.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>`
    
    const input = document.createElement("input")
    input.setAttribute("id", "select")
    input.classList.add("select-input")

    main.append(input)

    return { inputContainer: main }
}