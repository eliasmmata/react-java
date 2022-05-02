import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './../Page.css';
import Supplier from './Supplier';
import { removeSupplier, saveSupplier, searchSuppliers } from './SupplierApi';

const SupplierList: React.FC = (props:any) => {

    const { name } = useParams<{ name: string; }>();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const history = useHistory();


    useEffect(() => {
        search();
    }, [history.location.pathname]);

    const search = async () => {
        let result = await searchSuppliers()
        setSuppliers(result);
    }

    const remove = async(id:string) => {
        await removeSupplier(id);
        search();
        alert("Proveedor eliminado satisfactoriamente");
    }

    const pruebaLocalStorage = () => {
        const ejemplo = {
            id: '1',
            name: 'Elías',
            email: 'eliasmmata@hotmail.com',
            phone: '674547596',
            address: 'Calle Falsa 123',
            web: 'www.web.com',
            contact: 'Manager',
        }
        saveSupplier(ejemplo);
    }

    const addSupplier = () => {
        history.push('/page/supplier/new');
    }

    const editEmployee = (id:string) => {
        history.push('/page/supplier/' + id);
        console.log(id)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonTitle>Gestión de Proveedores</IonTitle>
                    <IonItem>
                        <IonButton color="primary" fill="solid" slot="end" size="default"  onClick={addSupplier}>
                            <IonIcon icon={add}></IonIcon>
                            Agregar Proveedor
                        </IonButton>
                    </IonItem>
                    <IonGrid className='table'>
                        <IonRow>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Email</IonCol>
                            <IonCol>Teléfono</IonCol>
                            <IonCol>Web</IonCol>
                            <IonCol>Contacto</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>
                        {suppliers.map((supplier: Supplier) =>
                            <IonRow key={supplier.id}>
                                <IonCol>{supplier.name}</IonCol>
                                <IonCol>{supplier.email}</IonCol>
                                <IonCol>{supplier.phone}</IonCol>
                                <IonCol>{supplier.address}</IonCol>
                                <IonCol>{supplier.web}</IonCol>
                                <IonCol>{supplier.contact}</IonCol>
                                <IonCol>
                                    <IonButton color="primary" fill="clear" onClick={() => editEmployee(String(supplier.id)) }>
                                        <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                                    </IonButton>
                                    <IonButton color="danger" fill="clear" onClick={() => remove(String(supplier.id)) }>
                                        <IonIcon icon={close} slot="icon-only"></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        )}
                    </IonGrid>
                </IonCard>
                <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
                    Agregar Proveedor Local Storage
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SupplierList;
