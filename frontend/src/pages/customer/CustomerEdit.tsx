import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Customer from './Customer';
import { saveCustomer, searchCustomerById } from './CustomerApi';

const CustomerEdit: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    const [customer, setCustomer] = useState<Customer>({});
    const history = useHistory();

    const routeMatch:any = useRouteMatch('/page/customer/:id');
    let id = routeMatch?.params?.id;


    useEffect(() => {
        search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]);

    const search = async () => {
        if (id === 'new') {
            setCustomer({})
        }
        else {
            let result = await searchCustomerById(id);
            setCustomer(result);
        }
    }

    const save = async () => {
        await saveCustomer(customer);
        history.push('/page/customers');
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
                    <IonTitle>{id === 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Nombre</IonLabel>
                                <IonInput onIonChange={e => customer.first_name = String(e.detail.value)} value={customer.first_name}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Apellidos</IonLabel>
                                <IonInput onIonChange={e => customer.last_name = String(e.detail.value)} value={customer.last_name}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput onIonChange={e => customer.email = String(e.detail.value)} value={customer.email}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Teléfono</IonLabel>
                                <IonInput onIonChange={e => customer.phone = String(e.detail.value)} value={customer.phone}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Dirección</IonLabel>
                                <IonInput onIonChange={e => customer.address = String(e.detail.value)} value={customer.address}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>



                    <IonItem>
                        <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                            <IonIcon icon={checkmark} style={{marginRight:`5px`}}></IonIcon>
                            <span  style={{marginRight:`5px`}}>Guardar</span>
                        </IonButton>
                    </IonItem>

                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default CustomerEdit;