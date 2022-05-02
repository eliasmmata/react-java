package dev.elias.springboot.services;

import java.util.List;

import dev.elias.springboot.entities.Customer;

public interface ICustomerService {

    List<Customer> getAll();
    Customer getById(Long id);

    void remove(Long id);
    void save(Customer customer);
}
