package com.PicknPaySpringApp.models.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.PicknPaySpringApp.models.entity.Product;
@Repository
public interface IProductDao extends CrudRepository<Product, Long>{

}
