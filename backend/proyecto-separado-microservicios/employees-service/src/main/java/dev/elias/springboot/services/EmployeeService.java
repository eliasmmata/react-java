package dev.elias.springboot.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.elias.springboot.entities.Employee;
import dev.elias.springboot.repository.EmployeeRepository;



@Service
public class EmployeeService implements IEmployeeService  {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public List<Employee> getAll() {
        return (List<Employee>) repository.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return (Employee) repository.findById(id).get();
    }

    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void save(Employee employee) {
        repository.save(employee);

    }

}
