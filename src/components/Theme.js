import React from 'react'
import {ThemeProvider} from 'styled-components'

const theme={
    colors:{
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        main:"rgb(252,100,71)"

    }
}

const Theme = ({children})=>(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme;