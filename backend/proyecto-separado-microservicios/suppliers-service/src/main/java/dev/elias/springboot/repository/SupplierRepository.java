package dev.elias.springboot.repository;

import dev.elias.springboot.entities.Supplier;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends CrudRepository<Supplier, Long> {

}