import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {CssVarsProvider, extendTheme} from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                neutral: {
                    outlinedColor: "hsl(213, 96%, 18%)",
                    solidBg:"#174a8b",
                    solidActiveBg: "#174a8b",
                    solidHoverBg: "#174a8b",
                },
                text: {
                    primary: "hsl(213, 96%, 18%)",
                    secondary: "hsl(354, 84%, 57%)"
                },
                primary: {
                    50: "hsl(213, 96%, 18%)",
                    200: "hsl(228, 100%, 84%)",
                    500: "hsl(243, 100%, 62%)",
                    900: "hsl(206, 94%, 87%)",
                    solidBg: "#174a8b",
                    plainColor: "hsl(231, 11%, 63%)",
                    plainHoverBg: "transparent",
                    plainHoverColor:"hsl(213, 96%, 18%)"
                },
                danger: {
                    500: "hsl(354, 84%, 57%)",

                },
            },
        },
    },
    fontFamily: {
        display: 'Ubuntu',
        body: 'Ubuntu',
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CssVarsProvider theme={theme}>
            <App/>
        </CssVarsProvider>
    </React.StrictMode>
);

