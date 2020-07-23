const request = require('request-promise')
const express = require('express')
const app = express()



app.get('/getTimeNews', (req, res) => {
    async function time() {
        try {
            var options = {
                uri: 'https://time.com/',
                transform: function (html) {
                    return html
                }
            }

            const $ = await request(options)
                .then(($) => {
                    return $
                })

            var items = $.match(/<\s*ol[^>]*>(.*)<\s*\/\s*ol>/s)

            var li_items = items[0].match(/(<h2[^>]*>(.*)<\/h2>)/g)


            var a = []

            for (var h2 of li_items) {
                a.push(h2.match(/(<a[^>]*>(.*)<\/a>)/g))
            }

            news = []

            for (let b of a) {

                let final = {
                    'title': (/(<a[^>]*>(.*?)<\/a>)/.exec(b[0]))[2],
                    'link': 'https://time.com' + (((b[0].split('>'))[0]).split('=')[1])
                }

                news.push(final)

            }

            console.log('news', news)

        }
        catch (err) {
            console.log(err)
        }

        res.json(news)

    }

    time();

})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})



