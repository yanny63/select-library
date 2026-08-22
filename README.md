# @yanny63/select

A lightweight and customizable `<select>` replacement for Vanilla JavaScript and TypeScript.

## Features

* Custom select UI
* Single and multiple selection
* Custom placeholder
* Reset selected values
* TypeScript support
* Uses the native `<select>` as the source of available options

## Installation

```bash
npm install @yanny63/select
```

Import the library and its styles:

```ts
import { Select } from "@yanny63/select"
import "@yanny63/select/styles.css"
```

## Usage

Start with a regular HTML `<select>`:

```html
<select id="country">
    <option value="pl">Poland</option>
    <option value="de">Germany</option>
    <option value="es">Spain</option>
</select>
```

Then initialize the custom select:

```ts
import { Select } from "@yanny63/select"

const selectElement = document.querySelector<HTMLSelectElement>("#country")!

const select = new Select({
    select: selectElement,
    placeholder: "Select a country"
})
```

The original `<select>` is hidden and replaced with a custom select interface.

## Options

### `select`

**Type:** `HTMLSelectElement`
**Required**

The native `<select>` element that will be replaced by the custom interface.

```ts
const select = new Select({
    select: document.querySelector("#country")!
})
```

### `placeholder`

**Type:** `string`
**Default:** `""`

Text displayed when no option is selected.

```ts
const select = new Select({
    select: selectElement,
    placeholder: "Choose a country..."
})
```

### `multiple`

**Type:** `boolean`
**Default:** `false`

Allows selecting multiple options.

```ts
const select = new Select({
    select: selectElement,
    multiple: true
})
```

## API

### `values`

Gets or sets the currently selected values.

```ts
select.values
```

Returns an array of:

```ts
{
    value: string
    text: string
}
```

Example:

```ts
console.log(select.values)
```

You can also set the selected values:

```ts
select.values = [
    {
        value: "pl",
        text: "Poland"
    }
]
```

### `resetValues()`

Removes all currently selected values.

```ts
select.resetValues()
```

## Example

```html
<select id="languages">
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
    <option value="cpp">C++</option>
    <option value="py">Python</option>
</select>
```

```ts
import { Select } from "@yanny63/select"
import "@yanny63/select/styles.css"

const element = document.querySelector<HTMLSelectElement>("#languages")!

const select = new Select({
    select: element,
    placeholder: "Select languages",
    multiple: true
})

console.log(select.values)

select.resetValues()
```

## License

This project is licensed under the MIT License.
