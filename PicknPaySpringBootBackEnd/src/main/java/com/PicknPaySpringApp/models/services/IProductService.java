package com.PicknPaySpringApp.models.services;

import java.util.List;

import com.PicknPaySpringApp.models.entity.Product;

public interface IProductService {
	public List<Product> findAll();
	public Product findById(Long id);
	public Product save(Product product);
	public void delete(Long id);
	
}
