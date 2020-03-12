package com.PicknPaySpringApp.models.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.PicknPaySpringApp.models.entity.ProductCategory;

@Repository
public interface IProductCategoryDao extends CrudRepository<ProductCategory, Long> {
	Optional<ProductCategory> findByName(String name);
}
