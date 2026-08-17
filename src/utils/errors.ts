export class NoOptionsError extends Error {
    constructor(select: string) {
        super(`No options were found in ${select}`)
    }
}