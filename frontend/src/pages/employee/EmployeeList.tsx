import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './../Page.css';
import Employee from './Employee';
import { removeEmployee, saveEmployee, searchEmployees } from './EmployeeApi';

const EmployeeList: React.FC = (props:any) => {

    const { name } = useParams<{ name: string; }>();

    const [employees, setEmployees] = useState<Employee[]>([]);

    const history = useHistory();


    useEffect(() => {
        search();
    }, [history.location.pathname]);

    const search = async () => {
        let result = await searchEmployees()
        setEmployees(result);
    }

    const remove = async (id:string) => {
        await removeEmployee(id);
        search();
        alert("Empleado eliminado satisfactoriamente");
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
        saveEmployee(ejemplo);
    }

    const addEmployee = () => {
        history.push('/page/employee/new');
    }

    const editEmployee = (id:string) => {
        history.push('/page/employee/' + id);
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
                    <IonTitle>Gestión de Empleados</IonTitle>
                    <IonItem>
                        <IonButton color="primary" fill="solid" slot="end" size="default"  onClick={addEmployee}>
                            <IonIcon icon={add}></IonIcon>
                            Agregar Empleado
                        </IonButton>
                    </IonItem>
                    <IonGrid className='table'>
                        <IonRow>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Email</IonCol>
                            <IonCol>Teléfono</IonCol>
                            <IonCol>Direcciones</IonCol>
                            <IonCol>Salario</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>
                        {employees.map((employee: Employee) =>
                            <IonRow key={employee.id}>
                                <IonCol>{employee.first_name} {employee.last_name}</IonCol>
                                <IonCol>{employee.email}</IonCol>
                                <IonCol>{employee.phone}</IonCol>
                                <IonCol>{employee.address}</IonCol>
                                <IonCol>{employee.salary}</IonCol>
                                <IonCol>
                                    <IonButton color="primary" fill="clear" onClick={() => editEmployee(String(employee.id)) }>
                                        <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                                    </IonButton>
                                    <IonButton color="danger" fill="clear" onClick={() => remove(String(employee.id)) }>
                                        <IonIcon icon={close} slot="icon-only"></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        )}
                    </IonGrid>
                </IonCard>
                <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
                    Agregar Empleado Local Storage
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default EmployeeList;
