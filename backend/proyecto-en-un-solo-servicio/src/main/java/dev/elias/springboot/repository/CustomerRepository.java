package dev.elias.springboot.repository;

import dev.elias.springboot.entities.Customer;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

}