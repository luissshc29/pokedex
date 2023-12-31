import React from 'react'

export default function GlobalStyles() {
  return (
    <style>
        {`

            html {
                max-width: 100vw;
                width:100%;
            }

            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
            }

            ::-webkit-scrollbar {
                background-color: transparent;
                width: 2px;
            }

            ::-webkit-scrollbar:horizontal {
                background-color: transparent;
                height: 2px;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #00002e;
                width: 2px;
                border-radius: 24px;
            }
            
            ::-webkit-scrollbar-thumb:horizontal {
                background-color: #00002e;
                height: 2px;
                border-radius: 24px;
            }

        `}
    </style>
  )
}
