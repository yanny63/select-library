import { Select } from "./components/main";


const selectElement = document.querySelector<HTMLSelectElement>("#building-what")

if (!selectElement) {
    throw new Error()
}

const select = new Select({
    select: selectElement,
    placeholder: "My Custom Placeholder"
})