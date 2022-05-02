package dev.elias.springboot.services;

import java.util.List;

import dev.elias.springboot.entities.Employee;

public interface IEmployeeService {

    List<Employee> getAll();
    Employee getById(Long id);

    void remove(Long id);
    void save(Employee employee);
}
