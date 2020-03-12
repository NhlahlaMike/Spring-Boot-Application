package com.PicknPaySpringApp.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.PicknPaySpringApp.models.entity.Product;
@Repository
public interface IProductDao extends CrudRepository<Product, Long>{
	@Query("SELECT CASE WHEN COUNT(u) > 0 THEN 'true' ELSE 'false' END FROM User u WHERE u.username = ?1")
	public Boolean existsByBarcode(String barcode);
}
