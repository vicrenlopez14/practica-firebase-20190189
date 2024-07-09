// Importación de bibliotecas y componentes necesarios
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {authentication, database} from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CartProductos from "../components/cart-productos";
import CardProductos from "../components/cart-productos";
import {useAuth} from "../context/AuthContext";
import {Button} from "react-native-paper";
import {signOut} from 'firebase/auth'


// Definición del componente principal Home
const Home = ({navigation}) => {
    // Definición del estado local para almacenar los productos
    const [loading, setLoading] = useState(false); // Estado de carga inicial [true
    const [productos, setProductos] = useState([]);
    const {loggedInUser, setLoggedInUser } = useAuth()

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Define una consulta a la colección 'productos' en Firestore, ordenada por el campo 'creado' en orden descendente
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));

        // Escucha cambios en la consulta de Firestore en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // Empuja cada documento con su ID a la lista de docs
                docs.push({id: doc.id, ...doc.data()});
            });
            // Actualiza el estado de productos con los datos recibidos
            setProductos(docs);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    // Función para navegar a la pantalla 'Add'
    const goToAdd = () => {
        navigation.navigate('Add');
    }

    // Función que renderiza cada item de la lista
    const renderItem = ({item}) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    const handleLogout = () => {
        setLoading(true)
        // Cerrar sesión
        signOut(authentication).then(() => {
            console.log("Sesión cerrada");
            setLoggedInUser(null)
        }).then(() => {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            });
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false)
        })
    }

    // Renderiza la interfaz del componente Home
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
                color: '#ff9800'
            }}>Bienvenido {loggedInUser?.email}</Text>
            <Button onPress={() => {
                handleLogout()
            }} mode={"contained"}>Cerrar sesión
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color="white"
                        style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            paddingLeft: 10,
                        }}
                    />
                )}</Button>
            <View style={{
                height: "10%",
            }}></View>

            <Text style={styles.title}>Productos Disponibles</Text>

            {/* Muestra la lista de productos si hay elementos, de lo contrario muestra un mensaje */}
            {
                productos.length !== 0 ?
                    <FlatList
                        data={productos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                    :
                    <Text style={styles.Subtitle}>No hay productos disponibles</Text>
            }

            {/* Botón para navegar a la pantalla de agregar productos */}
            <TouchableOpacity
                style={styles.Button}
                onPress={goToAdd}>
                <Text style={styles.ButtonText}>Agregar Producto</Text>
            </TouchableOpacity>
        </View>
    );
};


// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ff9800'
    },
    Button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});