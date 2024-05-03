import { getDatabase, ref, set, push, get, update } from 'firebase/database';
import { getStorage, ref as sRef ,uploadBytes, getDownloadURL } from 'firebase/storage';


const GuardarComercio = () => {
    const db = getDatabase();
    const storage = getStorage();
  const guardarComercio = async (userId, nombreComercio, nombre, identificador, ubicacion, telefono, logo, banner, conocenos, caracteristicas, diasLaborales) => {
    try {
      let comercioRef;
      let nuevoComercioRef;
      let comercioId = "";



      if (nombreComercio === "nuevo") {
        comercioRef = ref(db, `usuarios/${userId}/comercios/`);
        nuevoComercioRef = push(comercioRef);
        comercioId = nuevoComercioRef.key;
    } else {
        comercioRef = ref(db, `usuarios/${userId}/comercios/${nombreComercio}`);
        comercioId = nombreComercio;
      }

      let bannerURL = '';
      let logoURL = '';

      console.log("Banner: " + banner);
      // Subir el banner si existe
      if (banner !== '' && banner !== "existente") {
        const storageRef = sRef(storage, `usuarios/${userId}/comercios/${comercioId}/banner`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, banner);
        bannerURL = await getDownloadURL(uploadTaskSnapshot.ref);
      }
      else{
        bannerURL = undefined;
      }

      console.log("Logo: " + logo);
      // Subir el logo si existe
      if (logo !== '' &&  logo !== "existente") {
        const storageRef = sRef(storage, `usuarios/${userId}/comercios/${comercioId}/logo`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, logo);
        logoURL = await getDownloadURL(uploadTaskSnapshot.ref);
      }
      else{
        logoURL = undefined
      }

      // Obtener el comercio
      const snapshot = await get(comercioRef);

      if (snapshot.exists() &&  nombreComercio !== "nuevo") {
        
        if(banner === "existente" && logo === "existente"){
          await update(comercioRef, {
            nombre: nombre,
            identificador: identificador.toLowerCase(),
            ubicacion: ubicacion,
            telefono: telefono,
            conocenos: conocenos,
            caracteristicas: caracteristicas,
            diasLaborales: diasLaborales
          });
        }
        else  if(banner !== "existente" && logo === "existente"){
          await update(comercioRef, {
            nombre: nombre,
            identificador: identificador.toLowerCase(),
            ubicacion: ubicacion,
            telefono: telefono,
            banner: bannerURL,
            conocenos: conocenos,
            caracteristicas: caracteristicas,
            diasLaborales: diasLaborales
          });
        }
        else  if(banner === "existente" && logo !== "existente"){
          await update(comercioRef, {
            nombre: nombre,
            identificador: identificador.toLowerCase(),
            ubicacion: ubicacion,
            telefono: telefono,
            logo: logoURL,
            conocenos: conocenos,
            caracteristicas: caracteristicas,
            diasLaborales: diasLaborales
          });
        }
        else{
          await update(comercioRef, {
            nombre: nombre,
            identificador: identificador.toLowerCase(),
            ubicacion: ubicacion,
            telefono: telefono,
            logo: logoURL,
            banner: bannerURL,
            conocenos: conocenos,
            caracteristicas: caracteristicas,
            diasLaborales: diasLaborales
          });
        }
        
        
        console.log('Comercio actualizado exitosamente en Firebase Realtime Database');
        return true;
      } else {
        // Guardar un nuevo comercio
        await set(nuevoComercioRef, {
          id: nuevoComercioRef.key,
          nombre: nombre,
          identificador: identificador.toLowerCase(),
          ubicacion: ubicacion,
          telefono: telefono,
          logo: logoURL,
          banner: bannerURL,
          conocenos: conocenos,
          caracteristicas: caracteristicas,
          diasLaborales: diasLaborales
        });

        console.log('Comercio guardado exitosamente en Firebase Realtime Database');
        return true;
      }
    } catch (error) {
      console.error('Error al guardar o actualizar el comercio en Firebase Realtime Database:', error);
      return false;
    }
  };

  return guardarComercio;
};

export default GuardarComercio;