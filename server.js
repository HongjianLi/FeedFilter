import Fastify from 'fastify'
const fastify = Fastify()
fastify.get('/mydrivers', async (request, reply) => {
    const response = await fetch('http://rss.mydrivers.com/rss.aspx?Tid=1')
    const lines = (await response.text()).split('\r\n')
    console.assert(lines[17] === '\t\t<item>')
    const items = []
    for (let itemLines = [], category, i = 17; i < lines.length - 2; ++i) {
        const line = lines[i]
        itemLines.push(line)
        if (line.startsWith('\t\t\t<category><![CDATA[')) {
            category = line.substring(22, lines[22].length - 14);
        } else if (line === '\t\t</item>') {
            if (![ '传统汽车', '电动汽车', '新能源汽车', '汽车厂商', '服装鞋帽' ].includes(category)) {
                items.push(...itemLines)
            }
            itemLines.length = 0
        }
    }
    return [...lines.slice(0, 17), ...items, ...lines.slice(-2)].join('\n')
})
await fastify.listen({ port: 7010 })
