const { parse } = require('csv-parse')
const fs = require('fs')
const express = require('express')
const app = express()
const pug = require('pug')
const port = 3000

const html = `tr
    td(style={ "padding": "10px"})
        div(style={"background-color": color, "width": "35px", "height": "35px", "border": "1px black solid;"})
    td(style={"padding-right": "10px"})
        b #{name}
        br
        i #{number}`;

const template = pug.compile(html)

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('<table style="border-collapse: collapse">')
    fs.createReadStream("./Mettler_Poly_Sheen.tch")
        .pipe(parse({ delimiter: "," }))
        .on("data", (row) => {
            res.write(template({ name: row[2], number: row[0], color: `rgb(${row[4]}, ${row[5]}, ${row[6]})`}))
        })
        .on("end", () => res.end());

})

app.listen(port, () => {
    console.log(port)
})
