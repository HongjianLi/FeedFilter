export default {
    fetchFilter: async () => {
        const response = await fetch('http://rss.mydrivers.com/rss.aspx?Tid=1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
                'Accept-Language': 'en,en-US;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6',
            },
        })
        const lines = (await response.text()).split('\r\n')
        if (lines.length < 18) return null;
        console.assert(lines[17] === '\t\t<item>')
        const items = []
        for (let itemLines = [], category, i = 17; i < lines.length - 2; ++i) {
            const line = lines[i]
            itemLines.push(line)
            if (line.startsWith('\t\t\t<category><![CDATA[')) {
                category = line.substring(22, line.length - 14);
            } else if (line === '\t\t</item>') {
                if (![ '传统汽车', '电动汽车', '新能源汽车', '无人驾驶汽车', '汽车厂商', '服装鞋帽' ].includes(category)) {
                    items.push(...itemLines)
                }
                itemLines.length = 0
            }
        }
        return [...lines.slice(0, 17), ...items, ...lines.slice(-2), ''].join('\n')
    },
};
