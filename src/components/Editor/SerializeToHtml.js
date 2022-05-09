import escapeHtml from 'escape-html'
import { Text } from 'slate'

export const  Serialize = node => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        if (node.underline) {
            string = `<u>${string}</u>`
        }
        return string
    }
    const children = node.children.map(n => Serialize(n)).join('')
    switch (node.type) {
        case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        default:
            return children
    }
}

export const convertNodesToHtml =  nodes => {
    let html = ''
    nodes.forEach(n => {
        html += Serialize(n)
    })
    return html
}
