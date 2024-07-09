import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from "../screens/home";
import Add from "../screens/add";
import Register from "../screens/register";
import Login from "../screens/login";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        // @ts-ignore
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
                <Stack.Screen name="Add" component={Add}
                              options={{presentation: 'modal', title: 'Agregar productos'}}/>
                <Stack.Screen name={"Register"} component={Register} options={{title: 'Registro'}}/>
                <Stack.Screen name={"Login"} component={Login} options={{title: 'Iniciar sesión'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;