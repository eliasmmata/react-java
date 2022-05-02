import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './../Page.css';
import Customer from './Customer';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = (props:any) => {

    const { name } = useParams<{ name: string; }>();

    const [clientes, setClientes] = useState<Customer[]>([]);

    const history = useHistory();


    useEffect(() => {
        search();
    }, [history.location.pathname]);

    const search = async () => {
        let result = await searchCustomers()
        setClientes(result);
    }

    const remove = async (id:string) => {
        await removeCustomer(id);
        search();
        alert("Cliente eliminado satisfactoriamente");
    }

    const pruebaLocalStorage = () => {
        const ejemplo = {
            id: '1',
            first_name: 'Elías',
            last_name: 'Moreno',
            phone: '674547596',
            email: 'eliasmmata@hotmail.com',
            address: 'Calle Falsa 123',
        }
        saveCustomer(ejemplo);
    }

    const addCustomer = () => {
        history.push('/page/customer/new');
    }

    const editCustomer = (id:string) => {
        history.push('/page/customer/' + id);
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
                    <IonTitle>Gestión de Clientes</IonTitle>
                    <IonItem>
                        <IonButton color="primary" fill="solid" slot="end" size="default"  onClick={addCustomer}>
                            <IonIcon icon={add}></IonIcon>
                            Agregar Cliente
                        </IonButton>
                    </IonItem>
                    <IonGrid className='table'>
                        <IonRow>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Email</IonCol>
                            <IonCol>Teléfono</IonCol>
                            <IonCol>Direcciones</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>
                        {clientes.map((cliente: Customer) =>
                            <IonRow key={cliente.id}>
                                <IonCol>{cliente.first_name} {cliente.last_name}</IonCol>
                                <IonCol>{cliente.email}</IonCol>
                                <IonCol>{cliente.phone}</IonCol>
                                <IonCol>{cliente.address}</IonCol>
                                <IonCol>
                                    <IonButton color="primary" fill="clear" onClick={() => editCustomer(String(cliente.id)) }>
                                        <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                                    </IonButton>
                                    <IonButton color="danger" fill="clear" onClick={() => remove(String(cliente.id)) }>
                                        <IonIcon icon={close} slot="icon-only"></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        )}
                    </IonGrid>
                </IonCard>
                <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
                    Agregar Cliente Local Storage
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CustomerList;
