export default function debounce<T extends (...args: string[]) => void>(func: T, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
        timeoutId !== null && clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, wait)
    }
}