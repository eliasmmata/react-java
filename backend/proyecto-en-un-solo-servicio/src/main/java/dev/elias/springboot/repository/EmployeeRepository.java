package dev.elias.springboot.repository;

import dev.elias.springboot.entities.Employee;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}