import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from "../screens/home";
import Add from "../screens/add";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        // @ts-ignore
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
                <Stack.Screen name="Add" component={Add}
                              options={{presentation: 'modal', title: 'Agregar productos'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;