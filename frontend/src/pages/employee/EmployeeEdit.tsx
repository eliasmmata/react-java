import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './../Page.css';
import Employee from './Employee';
import { saveEmployee, searchEmployeeById } from './EmployeeApi';

const EmployeeEdit: React.FC = () => {

    const { name } = useParams<{ name: string}>();

    const [employee, setEmployee] = useState<Employee>({});
    const history = useHistory();

    const routeMatch:any = useRouteMatch('/page/employee/:id');
    let id = routeMatch?.params?.id;

    useEffect(() => {
        search();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname]);

    const search = async () => {
        if (id === 'new') {
            setEmployee({});
        }
        else {
            let result = await searchEmployeeById(id);
            setEmployee(result);
        }
    }

    const save = async () => {
        await saveEmployee(employee);
        history.push('/page/employees');
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
                    <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Nombre</IonLabel>
                                <IonInput onIonChange={e => employee.first_name = String(e.detail.value)} value={employee.first_name}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Apellidos</IonLabel>
                                <IonInput onIonChange={e => employee.last_name = String(e.detail.value)} value={employee.last_name}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput onIonChange={e => employee.email = String(e.detail.value)} value={employee.email}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Teléfono</IonLabel>
                                <IonInput onIonChange={e => employee.phone = String(e.detail.value)} value={employee.phone}> </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Dirección</IonLabel>
                                <IonInput onIonChange={e => employee.address = String(e.detail.value)} value={employee.address}> </IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Salario</IonLabel>
                                <IonInput onIonChange={e => employee.salary = Number(e.detail.value)} value={employee.salary}> </IonInput>
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

export default EmployeeEdit;