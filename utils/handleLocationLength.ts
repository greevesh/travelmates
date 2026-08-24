export const appendEllipsis = (location: string) => {
    if (location.endsWith(', ')) return location.slice(0, -2) + '...'

    if (location.endsWith(',') || location.endsWith(' ')) return location.slice(0, -1) + '...'
    
    return location + '...'
}

export default function handleLocationLength(location: string, sliceEnd: number) {
    if (!location) return ''

    let needsTrimming = sliceEnd < location.length
    let trimmedLocation = location.slice(0, sliceEnd)

    if (needsTrimming) return appendEllipsis(trimmedLocation)
    
    return location
} 