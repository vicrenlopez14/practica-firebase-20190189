import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {authentication} from "../config/firebase";
import {ActivityIndicator, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";

const RegisterScreen = ({navigation}: {navigation:any}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loggedInUser, setLoggedInUser } = useAuth();

    // If already logged in, redirect to Home
    useEffect(() => {
        if (loggedInUser) {
            navigation.navigate('Home');
        }
    }, [loggedInUser])

    useEffect(() => {
        if (loggedInUser) {
            navigation.navigate('Home');
        }
    }, [])

    const handleRegister = () => {
        setIsLoading(true)

        createUserWithEmailAndPassword(authentication, email, password)
            .then((res) => {
                console.log("successful");
                navigation.navigate('Home');
                setLoggedInUser(res.user);
            })

            .catch((err) => {
                console.log(err);
                setError("Correo o contraseña incorrectos");
            })

            .finally(() => setIsLoading(false));

    }

    return <>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignContent: "center",
            paddingHorizontal: 28,
            marginTop: "30%",
            gap: 20
        }}>
            <View>
                <Text style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    Pŕactica Firebase
                </Text>
                <Text style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'gray'
                }}>
                    Registrarse
                </Text>
            </View>

            <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>

            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />

            <Button
                mode="contained"
                onPress={() => {
                    handleRegister()
                }}
            >
                Registrarse
                {isLoading && (
                    <ActivityIndicator
                        size="small"
                        color="white"
                        style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            paddingLeft: 10,
                        }}
                    />
                )}
            </Button>

            <Button
                mode="text"
                onPress={() => navigation.navigate('Login')}
            >
                ¿Ya tienes una cuenta? Inicia sesión.
            </Button>


        </View>
    </>
}

export default RegisterScreen