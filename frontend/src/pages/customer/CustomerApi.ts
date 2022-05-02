import Customer from "./Customer";

export async function searchCustomers() {
    let url = process.env.REACT_APP_API + 'customers';
    let response = await fetch( url, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
/*
    if(!localStorage['customers']) {
        localStorage['customers'] = '[]';
    }
    let customers = localStorage['customers'];
    customers = JSON.parse(customers);
    return customers; */
}

export async function removeCustomer(id: string) {
    let url = process.env.REACT_APP_API + 'customers/' + id;
    await fetch( url, {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json',
        }
    })
    /* let customers = await searchCustomers();
    let index = customers.findIndex((customer:Customer) => customer.id == id)
    customers.splice(index, 1);
    localStorage['customers'] = JSON.stringify(customers); */
}

export async function saveCustomer(customer:Customer) {
    let url = process.env.REACT_APP_API + 'customers';
    await fetch( url, {
        'method': 'POST',
        'body': JSON.stringify(customer),
        'headers': {
            'Content-Type': 'application/json',
        }
    })
    /* let customers = await searchCustomers();
    if (customer.id) {
        // editar
        let index = customers.findIndex((c:Customer) => c.id == customer.id);
        customers[index] = customer;
    } else {
        customer.id = String(Math.round(Math.random() * 100000));
        customers.push(customer);
    }
    localStorage['customers'] = JSON.stringify(customers); */
}

export async function searchCustomerById(id:string) {
    let url = process.env.REACT_APP_API + 'customers/' + id;
    let response = await fetch( url, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();

    /* let customers = await searchCustomers();
    return customers.find((customer:Customer) => customer.id == id); */
}