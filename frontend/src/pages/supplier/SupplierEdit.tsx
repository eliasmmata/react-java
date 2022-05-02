import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Supplier from './Supplier';
import { saveSupplier, searchSupplierById } from './SupplierApi';

const SupplierEdit: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    const [supplier, setSupplier] = useState<Supplier>({});
    const history = useHistory();

    const routeMatch:any = useRouteMatch('/page/supplier/:id');
    let id = routeMatch?.params?.id;

    useEffect(() => {
        search();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]);

    const search = async () => {
        if (id === 'new') {
            setSupplier({});
        }
        else {
            let result = await searchSupplierById(id);
            setSupplier(result);
        }
    }

    const save = async () => {
        await saveSupplier(supplier);
        history.push('/page/suppliers');
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
                    <IonTitle>{id === 'new' ? 'Agregar Proveedor' : 'Editar Proveedor'}</IonTitle>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Nombre</IonLabel>
                                <IonInput onIonChange={e => supplier.name = String(e.detail.value)} value={supplier.name}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput onIonChange={e => supplier.email = String(e.detail.value)} value={supplier.email}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Teléfono</IonLabel>
                                <IonInput onIonChange={e => supplier.phone = String(e.detail.value)} value={supplier.phone}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Contacto</IonLabel>
                                <IonInput onIonChange={e => supplier.contact = String(e.detail.value)} value={supplier.contact}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Dirección</IonLabel>
                                <IonInput onIonChange={e => supplier.address = String(e.detail.value)} value={supplier.address}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Web</IonLabel>
                                <IonInput onIonChange={e => supplier.web = String(e.detail.value)} value={supplier.web}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonItem>
                        <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                            <IonIcon icon={checkmark} style={{ marginRight: `5px` }}></IonIcon>
                            <span style={{ marginRight: `5px` }}>Guardar</span>
                        </IonButton>
                    </IonItem>

                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default SupplierEdit;