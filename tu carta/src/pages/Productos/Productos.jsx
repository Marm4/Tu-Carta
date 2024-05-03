import React, { useEffect, useState } from 'react'
import './Productos.css'
import { useParams, useNavigate } from 'react-router';
import { useUserContext, useComerciosContext } from '../../context/UserContext';
import FileSelect from '../../Utilities/FileSelect/FileSelect';
import { getDatabase, ref, set, push, get, update } from 'firebase/database';
import { getStorage, ref as sRef ,uploadBytes, getDownloadURL } from 'firebase/storage';
import CardProducto from './CardProducto/CardProducto.jsx'


const Productos = () => {
    const { nombreComercio } = useParams();
    const [ comercio, setComercio] = useState('');
    const [ nombre, setNombre ] = useState(''); 
    const [ nombreError, setNombreError ] = useState(false);
    const [ descripcion, setDescripcion ] = useState('');
    const [ precio, setPrecio ] = useState(''); 
    const [ imagen, setImagen ] = useState(''); 
    const [ seccion, setSeccion ] = useState('entrada')
    const [ caracteristicas, setCaracteristicas ] = useState([]); 
    const [ caracteristicasShow, setCaracteristicasShow ] = useState([]);
    const [ productos, setProductos ] = useState([]);
    const [ currentProducto, setCurrentProducto ] = useState(undefined);
    const [ newImage, setNewImage ] = useState(false);
    
    const db = getDatabase();
    const storage = getStorage();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { comercios } = useComerciosContext();

    
    useEffect(() =>{
        const fetchProductos = async () => {
            const productosRef = ref(db, `usuarios/${user.uid}/productos`);
            const snapshot = await get(productosRef);

            const productosData = [];
            snapshot.forEach((childSnapshot) =>{
                const producto = childSnapshot.val();
                productosData.push(producto);
                console.log("Producto recuperado - Nombre:", producto.nombre);
            });

            setProductos(productosData);
        }
        
        
        seccionChange('entrada');
        const comercioEncontrado = comercios.find(busqueda => busqueda.nombre === nombreComercio);
        if(comercioEncontrado !== undefined){
            setComercio(comercioEncontrado);
        }

        fetchProductos();
    },[nombreComercio, comercios]);

    const handleChage = (setState) => (event) =>{
        const value = event.target.value;
        setState(value);
        
        if(setState === setNombre){
            const regex = /^[a-zA-Z0-9\- ]+$/;
            setNombreError(false);
            if(value.length === 0){
              return;
            }
            
            if(!regex.test(value)){
              setNombreError(true);
            }
            return;
          }
    }

    const caracteristicasToShow = (value) => {
        let nuevasCaracteristicas = [];
        if(value === "entrada"){
            nuevasCaracteristicas = ["Vegano", "Vegetariano", "Tacc Free"];
        }
        else if(value === "plato"){
            nuevasCaracteristicas = ["Vegano", "Vegetariano", "Tacc Free", "Carne", "Pescado", "Pasta"];
        }
        else if(value === "postre"){
            nuevasCaracteristicas = ["Dulce", "Salado", "Tacc Free", "Sugar Free"];
        }
        else if(value === "bebida"){
            nuevasCaracteristicas = ["Bebida sin alcohol", "Trago", "Vino tinto", "Vino blanco", "Cerveza", "Champagne & whiskie "];
        }
    
        setCaracteristicasShow(nuevasCaracteristicas);
    }

    const seccionChange = (value) => {
        setSeccion(value);
        caracteristicasToShow(value);
        return;
    }

    const goBack = () => {
        navigate(`/opciones-comercio/${nombreComercio}`);
    };

    const imagenChange = (image) => {
        setImagen(image);
        setNewImage(true);
    }

    const agregarCaracteristica = (caracteristica) => {
        if (caracteristicas.includes(caracteristica)) {
         
          setCaracteristicas(caracteristicas.filter(item => item !== caracteristica));
        } else {
        
          setCaracteristicas([...caracteristicas, caracteristica]);
        }
    };


    const guardarProducto = async() => {
        try{
            if(nombre === ""){
                setNombreError(true);
                console.log("El campo nombre no puede ser vacio");
                return;
            }
            console.log("Guardando producto");
            const productoRef = ref(db, `usuarios/${user.uid}/productos`);

            const nuevoProductoRef = push(productoRef);
            const nuevoProductoId  = nuevoProductoRef.key;
            
            let urlImagen = ('');
            if(imagen !== ''){
                const storageRef = sRef(storage, `usuarios/${user.uid}/productos/${nuevoProductoId}`);
                const uploadTaskSnapshot = await uploadBytes(storageRef, imagen);
                urlImagen = await getDownloadURL(uploadTaskSnapshot.ref);
            }
            
            await set(nuevoProductoRef, {
                productoId: nuevoProductoId,
                comercioId: nombreComercio,
                seccion: seccion,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                caracterisicas: caracteristicas,
                imagen: urlImagen
            });
            
            console.log("Produto guardado exitosamente");

        }
        catch(e){
            console.error("Se ha producido un error a la hora de guardar el producto", e);
        }
    }

    const modificarProducto = async() => {
        try{
            let urlImagen = (currentProducto.imagen);
            if(newImage){
                if(imagen !== ''){
                const storageRef = sRef(storage, `usuarios/${user.uid}/productos/${nuevoProductoId}`);
                const uploadTaskSnapshot = await uploadBytes(storageRef, imagen);
                urlImagen = await getDownloadURL(uploadTaskSnapshot.ref);
            }
            }
            setShowPopup(false);
            console.log("Modificando producto");
            const productoRef = ref(db, `usuarios/${user.uid}/productos/${currentProducto.productoId}`);

            await set(productoRef,{
                seccion: seccion,
                nombre: nombre,
                imagen: imagen,
                descripcion: descripcion,
                precio: precio,
                caracterisicas: caracteristicas
            });

            setCurrentProducto(undefined);


            console.log("Produto actualizado exitosamente");
        }
        catch (e){

        }
    }

    function capitalizeFirstLetter(texto) {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    const mostrarProducto = (producto) =>{
        setNombre(producto.nombre);
        setSeccion(producto.seccion);
        seccionChange(producto.seccion);
        if(producto.descripcion !== undefined){
            setDescripcion(producto.descripcion);
        }
        if(producto.precio !== undefined){
            setPrecio(producto.precio);
        }
        if(producto.caracterisicas !== undefined){
            setCaracteristicas(producto.caracterisicas);
        }
        setCurrentProducto(producto);
        
    }

    const seccionSelected = (comparar) => {
        return seccion === comparar;
    } 

    return(
        <div >
           
            <div className='productos'>
                <div className='productos-container general-container'>

                    <div className='seccion-productos'>
                            <button className={seccionSelected("entrada") ? 'button-selected' : ''} onClick={() => seccionChange("entrada")}>Entrada</button>
                            <button className={seccionSelected("plato") ? 'button-selected' : ''} onClick={() => seccionChange("plato")}>Plato</button>
                            <button className={seccionSelected("postre") ? 'button-selected' : ''} onClick={() => seccionChange("postre")}>Postre</button>
                            <button className={seccionSelected("bebida") ? 'button-selected' : ''} onClick={() => seccionChange("bebida")}>Bebida</button>
                    </div>
                    

                    <div className='nuevo-producto '>
                        <div className='left-container'>
                            <h2 >Nombre</h2>
                            <input value={nombre} type="text" placeholder="Nombre" className={nombreError ? 'input-error' : ''} onChange={handleChage(setNombre)}/>

                            <h2 >Descripción</h2>
                            <input className="producto-descripcion" value={descripcion} type="text" placeholder="Descripcion" onChange={handleChage(setDescripcion)} />

                            <h2 >Precio</h2>
                            <input value={precio} type="text" placeholder="Precio" onChange={handleChage(setPrecio)} />
                        </div>

                        <div className='right-container'>

                        <h2 className='atributos'>Atributos</h2>

                        <div className='checkbox-container'>
                            {caracteristicasShow.map((caracteristica, index) => (
                                <div key={index} className='containerCheckBox2'>
                                    <input 
                                        type="checkbox"
                                        id={caracteristica}
                                        name={caracteristica}
                                        className="miCheckBox"
                                        checked={caracteristicas.includes(caracteristica)}
                                        onChange={() => agregarCaracteristica(caracteristica)}
                                        />
                                    <label htmlFor={caracteristica}>{capitalizeFirstLetter(caracteristica)}</label>
                                </div>
                            ))}

                        </div>

                        </div>

                        <div>
                        <div >
                            <h2>Imagen</h2>
                            <FileSelect onSelectedImage={imagenChange} size={false} />
                        </div>
                        </div>

                    </div>

                    
                    
                    {currentProducto !== undefined ? (
                        <button className='producto-guardar-btn' onClick={() => modificarProducto()}>Modificar</button>
                    ) : (
                        <button className='producto-guardar-btn' onClick={() => guardarProducto()}>Guardar</button>
                    )}
                    
                        
                    
                    
                </div>
                
                <div className='general-container productos-guardados'>
                    <h2 >Buscar</h2>
                    <input type="text" placeholder="Buscar" />
                    
                    <div>
                        {productos.map((producto, index) =>(
                            <div  onClick={() => mostrarProducto(producto)}>
                                <CardProducto producto={producto}/>
                            </div>
                        ))}

                    </div>

                </div>


            </div>
            
            
        </div>
    );

}

export default Productos;