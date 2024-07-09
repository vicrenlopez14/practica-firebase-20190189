import Navigation from "./src/navigation/navigation";
import {DefaultTheme, PaperProvider} from "react-native-paper";
import {AuthProvider} from "./src/context/AuthContext";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </PaperProvider>
    );
}